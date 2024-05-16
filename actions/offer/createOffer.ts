"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { OfferSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

import { revalidatePath } from "next/cache";

type OfferFormValues = z.infer<typeof OfferSchema>;

export const createOffer = async (data: OfferFormValues) => {
  console.log("data from createOffer: ", data);
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
    console.log("Offer from createOffer: ", Offer);
    const offerCr = await db.offer.create({
      data: { ...Offer },
    });
    console.log("offerCr from createOffer: ", offerCr);

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
