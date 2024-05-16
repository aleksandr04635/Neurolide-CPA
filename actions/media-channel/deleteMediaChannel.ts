"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { MediaChannelSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

import { revalidatePath } from "next/cache";

export const deleteMediaChannel = async (id: number) => {
  console.log("id from deleteMediaChannel: ", id);
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
      return { error: "Unauthorized" };
    }

    if (!id && isNaN(id)) {
      return { error: "Id is not a number" };
    }
    //console.log("isNaN(IdNum) from MediaChannelPage: ", isNaN(IdNum));

    const mediaChannelDB = await db.mediaChannel.findUnique({
      where: {
        id: id,
      },
    });
    if (!mediaChannelDB) {
      return { error: "Media channel with this Id doesn't exist" };
    }
    console.log("mediaChannelDB from deleteMediaChannel: ", mediaChannelDB);

    if (mediaChannelDB.userId != user.id && user.role != "MANAGER") {
      return { error: "You are not the creator of the media channel" };
    }

    await db.mediaChannel.delete({
      where: {
        id: id,
      },
    });

    //return { error: "Test err" };
    revalidatePath("/media-channels");
    revalidatePath("/media-channels/" + id);
    return { success: "deleted" };
    //return { success: "mediaChannelCr" };
  } catch (error) {
    //console.log("error", error);
    console.error(error);

    return { error: "Some error" };
  }
};
