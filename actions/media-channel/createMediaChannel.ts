"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { MediaChannelSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

import { revalidatePath } from "next/cache";

type MediaChannelFormValues = z.infer<typeof MediaChannelSchema>;

export const createMediaChannel = async (data: MediaChannelFormValues) => {
  console.log("data from createMediaChannel: ", data);
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
      return { error: "Unauthorized" };
    }
    const MediaChannel = MediaChannelSchema.parse(data);
    console.log("MediaChannel from createMediaChannel: ", MediaChannel);

    let domain = "";
    try {
      const matches = data.link.match(
        /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im
      );
      // console.log("MATCHES", matches);
      if (matches && matches.length > 0) {
        domain = matches[1];
      }
    } catch (error) {}
    console.log("domain from createMediaChannel: ", domain);
    if (!domain || domain == data.link) {
      return { error: "Некоректне посилання" };
    }

    if (
      // data.userId != user.id &&
      (data.isVIP == true || data.isVerified == true) &&
      dbUser.role != "MANAGER"
    ) {
      return { error: "Ви не можете підвищити привілегію цього медіа канала" };
    }

    const mediaChannelCr = await db.mediaChannel.create({
      data: { ...MediaChannel },
    });
    console.log("mediaChannelCr from createProduct: ", mediaChannelCr);

    //return { error: "Test err" };
    revalidatePath("/media-channels");
    return { success: mediaChannelCr.id };
    //return { success: "mediaChannelCr" };
  } catch (error) {
    //console.log("error", error);
    console.error(error);
    if (error instanceof z.ZodError) {
      return { error: "Invalid request payload" };
    }
    return { error: "Some error" };
  }
};
