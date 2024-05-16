"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { signOut } from "@/auth";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

import { revalidatePath } from "next/cache";

export const deleteUser = async (id: string) => {
  console.log("id from deleteUser: ", id);
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
      return { error: "Unauthorized" };
    }

    /*  if (!id && isNaN(id)) {
      return { error: "Id is not a number" };
    } */
    //console.log("isNaN(IdNum) from UserPage: ", isNaN(IdNum));

    const userDB = await db.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!userDB) {
      return { error: "User with this Id doesn't exist" };
    }
    console.log("userDB from deleteUser: ", userDB);
    console.log("user from deleteUser: ", user);
    console.log(
      " userDB.id == user.id from deleteUser: ",
      userDB.id == user.id
    );
    console.log(
      " userDB.id == user.id from deleteUser: ",
      userDB.id !== user.id
    );
    console.log(
      ' dbUser.role !== "MANAGER" from deleteUser: ',
      dbUser.role !== "MANAGER"
    );

    if (userDB.id !== user.id && dbUser.role !== "MANAGER") {
      return { error: "Ви не можете видалити цього користувача" };
    }

    if (userDB.id == user.id) {
      await signOut();
      revalidatePath("/profile");
    }
    await db.user.delete({
      where: {
        id: id,
      },
    });

    //return { error: "Test err" };

    revalidatePath("/users");
    return { success: "deleted" };
    //return { success: "userCr" };
  } catch (error) {
    //console.log("error", error);
    console.error(error);

    return { error: "Some error" };
  }
};
