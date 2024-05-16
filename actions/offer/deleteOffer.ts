"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { OfferSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

import { revalidatePath } from "next/cache";

export const deleteOffer = async (id: number) => {
  console.log("id from deleteOffer: ", id);
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
    //console.log("isNaN(IdNum) from OfferPage: ", isNaN(IdNum));

    const offerDB = await db.offer.findUnique({
      where: {
        id: id,
      },
    });
    if (!offerDB) {
      return { error: "Offer with this Id doesn't exist" };
    }
    console.log("offerDB from deleteOffer: ", offerDB);

    if (offerDB.authorId != user.id && user.role != "MANAGER") {
      return { error: "You are not the creator of the offer" };
    }

    await db.offer.delete({
      where: {
        id: id,
      },
    });

    //return { error: "Test err" };
    revalidatePath("/offers");
    revalidatePath("/created-offers");
    revalidatePath("/offers-in-work");
    //revalidatePath("/media-channels/" + id);
    return { success: "deleted" };
    //return { success: "offerCr" };
  } catch (error) {
    //console.log("error", error);
    console.error(error);

    return { error: "Some error" };
  }
};
