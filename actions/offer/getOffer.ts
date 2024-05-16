"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { OfferSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

import { revalidatePath } from "next/cache";

export const getOffer = async (id: number | undefined) => {
  console.log("id from getOffer: ", id);
  try {
    /*     const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
      return { error: "Unauthorized" };
    } */

    if (!id) {
      return { error: "Id is not a number" };
    }
    if (isNaN(id)) {
      return { error: "Id is not a number" };
    }
    //console.log("isNaN(IdNum) from OfferPage: ", isNaN(IdNum));

    const IdNum = Number(id);
    //console.log("IdNum from OfferPage: ", IdNum);
    //console.log("isNaN(IdNum) from OfferPage: ", isNaN(IdNum));

    const offerDB = !isNaN(IdNum)
      ? await db.offer.findUnique({
          where: {
            id: IdNum,
          },
        })
      : null;

    if (!offerDB) {
      return { error: "Offer with this Id doesn't exist" };
    }
    console.log("offerDB from getOffer: ", offerDB);
    const offerJ = JSON.stringify(offerDB);
    console.log("offerJ from getOffer: ", offerJ);

    //return { error: "Test err" };

    return { success: offerJ };
    //return { success: "offerCr" };
  } catch (error) {
    //console.log("error", error);
    console.error(error);

    return { error: "Some error" };
  }
};
