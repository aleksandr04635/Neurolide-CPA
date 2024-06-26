"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { MediaChannelSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

import { revalidatePath } from "next/cache";

type MediaChannelFormValues = z.infer<typeof MediaChannelSchema> & {
  userId: string;
  id: number;
};

export const editMediaChannel = async (data: MediaChannelFormValues) => {
  console.log("data from editMediaChannel: ", data);
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
    console.log("MediaChannel from editMediaChannel: ", MediaChannel);

    //const IdNum = Number(data.id);
    //console.log("IdNum from editMediaChannel: ", IdNum);
    if (!data.id && isNaN(data.id)) {
      return { error: "Id is not a number" };
    }
    //console.log("isNaN(IdNum) from MediaChannelPage: ", isNaN(IdNum));

    const mediaChannelDB = await db.mediaChannel.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!mediaChannelDB) {
      return { error: "Media channel with this Id doesn't exist" };
    }
    console.log("mediaChannelDB from editMediaChannel: ", mediaChannelDB);

    if (
      // data.userId != user.id &&
      mediaChannelDB.userId != user.id &&
      user.role != "MANAGER"
    ) {
      return { error: "Ви не можете редагувати цей медіа канал" };
    }
    if (
      // data.userId != user.id &&
      ((data.isVIP == true && mediaChannelDB.isVIP == false) ||
        (data.isVerified == true && mediaChannelDB.isVerified == false)) &&
      dbUser.role != "MANAGER"
    ) {
      return { error: "Ви не можете підвищити привілегію цього медіа канала" };
    }

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
    console.log("domain from editMediaChannel: ", domain);
    if (!domain || domain == data.link) {
      return { error: "Некоректне посилання" };
    }

    const mediaChannelCr = await db.mediaChannel.update({
      where: {
        id: data.id,
      },
      data: { ...MediaChannel },
    });
    console.log("mediaChannelCr from editMediaChannel: ", mediaChannelCr);

    //return { error: "Test err" };
    revalidatePath("/media-channels");
    revalidatePath("/media-channels/" + data.id!);
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
