"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { UserSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

import { revalidatePath } from "next/cache";

type UserFormValues = z.infer<typeof UserSchema> & {
  id: string;
};

export const editUser = async (data: UserFormValues) => {
  console.log("data from editUser: ", data);
  try {
    const currentUserData = await currentUser();
    console.log("currentUserData from editUser: ", currentUserData);

    if (!currentUserData) {
      return { error: "Не достатній рівень авторизації" };
    }

    const dbUser = await getUserById(currentUserData.id);

    if (!dbUser || dbUser.role !== "MANAGER") {
      return { error: "Не достатній рівень авторизації" };
    }

    const UserDataParsed = UserSchema.parse(data);
    console.log("UserDataParsed from editUser: ", UserDataParsed);

    //const IdNum = Number(data.id);
    //console.log("IdNum from editUser: ", IdNum);
    /*    if (!data.id && isNaN(data.id)) {
      return { error: "Id is not a number" };
    } */
    //console.log("isNaN(IdNum) from UserPage: ", isNaN(IdNum));

    const userDB = await db.user.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!userDB) {
      return { error: "User with this Id doesn't exist" };
    }
    console.log("userDB from editUser: ", userDB);

    /*   if (currentUserData.role != "MANAGER") {
      return { error: "Не достатній рівень авторизації" };
    } */

    const userUp = await db.user.update({
      where: {
        id: data.id,
      },
      data: { ...UserDataParsed },
    });
    console.log("userUp from editUser: ", userUp);

    //return { error: "Test err" };
    revalidatePath("/users");
    revalidatePath("/");

    return { success: userUp.id };
    //return { success: "userUp" };
  } catch (error) {
    //console.log("error", error);
    console.error(error);
    if (error instanceof z.ZodError) {
      return { error: "Invalid request payload" };
    }
    return { error: "Some error" };
  }
};
