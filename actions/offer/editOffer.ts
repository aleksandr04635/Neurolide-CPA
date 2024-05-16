"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { OfferSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

import { revalidatePath } from "next/cache";

type OfferFormValues = z.infer<typeof OfferSchema> & {
  authorId: string;
  id: number;
};

export const editOffer = async (data: OfferFormValues) => {
  console.log("data from editOffer: ", data);
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
      return { error: "Unauthorized" };
    }

    const Offer = OfferSchema.parse(data);
    console.log("Offer from editOffer: ", Offer);

    //const IdNum = Number(data.id);
    //console.log("IdNum from editOffer: ", IdNum);
    if (!data.id && isNaN(data.id)) {
      return { error: "Id is not a number" };
    }
    //console.log("isNaN(IdNum) from OfferPage: ", isNaN(IdNum));

    const offerDB = await db.offer.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!offerDB) {
      return { error: "Offer with this Id doesn't exist" };
    }
    console.log("offerDB from editOffer: ", offerDB);

    if (
      data.authorId != user.id &&
      offerDB.authorId != user.id &&
      user.role != "MANAGER"
    ) {
      return { error: "You are not the creator of the offer" };
    }

    const offerCr = await db.offer.update({
      where: {
        id: data.id,
      },
      data: { ...Offer },
    });
    console.log("offerCr from editOffer: ", offerCr);

    //return { error: "Test err" };
    revalidatePath("/offers");
    revalidatePath("/created-offers");
    revalidatePath("/offers-in-work");
    return { success: offerCr.id };
    //return { success: "offerCr" };
  } catch (error) {
    //console.log("error", error);
    console.error(error);
    if (error instanceof z.ZodError) {
      return { error: "Invalid request payload" };
    }
    return { error: "Some error" };
  }
};
