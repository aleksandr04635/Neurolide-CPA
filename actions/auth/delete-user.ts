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
    const currentUserData = await currentUser();
    console.log("currentUserData from deleteUser: ", currentUserData);

    if (!currentUserData) {
      return { error: "Не достатній рівень авторизації" };
    }

    const currentUserInDB = await getUserById(currentUserData.id);

    if (!currentUserInDB) {
      return { error: "Не достатній рівень авторизації" };
    }

    /*  if (!id && isNaN(id)) {
      return { error: "Id is not a number" };
    } */
    //console.log("isNaN(IdNum) from UserPage: ", isNaN(IdNum));

    const userToDeleteInDB = await db.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!userToDeleteInDB) {
      return { error: "User with this Id doesn't exist" };
    }
    console.log("userToDeleteInDB from deleteUser: ", userToDeleteInDB);
    console.log("curentUser from deleteUser: ", currentUserData);
    console.log(
      " userToDeleteInDB.id == curentUser.id from deleteUser: ",
      userToDeleteInDB.id == currentUserData.id
    );
    console.log(
      " userToDeleteInDB.id == curentUser.id from deleteUser: ",
      userToDeleteInDB.id !== currentUserData.id
    );
    console.log(
      ' currentUserInDB.role !== "MANAGER" from deleteUser: ',
      currentUserInDB.role !== "MANAGER"
    );

    if (
      userToDeleteInDB.id !== currentUserData.id &&
      currentUserInDB.role !== "MANAGER"
    ) {
      return { error: "Ви не можете видалити цього користувача" };
    }

    if (userToDeleteInDB.id == currentUserData.id) {
      await signOut();
      revalidatePath("/profile");
    }
    /*   REMOVE */ await db.user.delete({
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
