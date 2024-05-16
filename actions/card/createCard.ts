"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { CardSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

import { revalidatePath } from "next/cache";

type CardFormValues = z.infer<typeof CardSchema>;

export const createCard = async (data: CardFormValues) => {
  console.log("data from createCard: ", data);
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
      return { error: "Unauthorized" };
    }
    const Card = CardSchema.parse(data);
    console.log("Card from createCard: ", Card);
    const cardCr = await db.card.create({
      data: {
        cvc: Card.cvv,
        userId: Card.userId,
        nameOnCard: Card.nameOnCard,
        number: Card.number,
        expirationDate: Card.expirationDate,
      },
    });
    console.log("cardCr from createCard: ", cardCr);

    //return { error: "Test err" };
    revalidatePath("/profile");
    //revalidatePath("/balance");
    return { success: cardCr.id };
    //return { success: "cardCr" };
  } catch (error) {
    //console.log("error", error);
    console.error(error);
    if (error instanceof z.ZodError) {
      return { error: "Invalid request payload" };
    }
    return { error: "Some error" };
  }
};
