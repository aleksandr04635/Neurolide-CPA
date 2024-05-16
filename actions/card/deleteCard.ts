"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { CardSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

import { revalidatePath } from "next/cache";

export const deleteCard = async (id: number) => {
  console.log("id from deleteCard: ", id);
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
    //console.log("isNaN(IdNum) from CardPage: ", isNaN(IdNum));

    const cardDB = await db.card.findUnique({
      where: {
        id: id,
      },
    });
    if (!cardDB) {
      return { error: "Card with this Id doesn't exist" };
    }
    console.log("cardDB from deleteCard: ", cardDB);

    if (cardDB.userId != user.id) {
      return { error: "You are not the creator of the card" };
    }

    await db.card.delete({
      where: {
        id: id,
      },
    });

    //return { error: "Test err" };
    revalidatePath("/profile");

    return { success: "deleted" };
    //return { success: "cardCr" };
  } catch (error) {
    //console.log("error", error);
    console.error(error);

    return { error: "Some error" };
  }
};
