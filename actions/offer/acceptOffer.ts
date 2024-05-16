"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { OfferSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

import { revalidatePath } from "next/cache";

type acceptOfferFormValues = {
  offerId: number;
  userId: string;
};
//acceptOffer(data.id, user?.id);

export const acceptOffer = async (data: acceptOfferFormValues) => {
  console.log("data from acceptOffer: ", data);
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    const dbUser = await getUserById(user.id);
    console.log("dbUser from acceptOffer: ", dbUser);

    if (!dbUser || dbUser.role !== "AFFILIATE") {
      return { error: "Unauthorized" };
    }
    if (dbUser.id !== data.userId) {
      return { error: "Unauthorized" };
    }

    //const IdNum = Number(data.id);
    //console.log("IdNum from acceptOffer: ", IdNum);
    if (!data.offerId && isNaN(data.offerId)) {
      return { error: "Id is not a number" };
    }
    //console.log("isNaN(IdNum) from OfferPage: ", isNaN(IdNum));

    const offerDB = await db.offer.findUnique({
      where: {
        id: data.offerId,
      },
      include: { usersWhoAccepted: true },
    });
    if (!offerDB) {
      return { error: "Offer with this Id doesn't exist" };
    }
    console.log("offerDB from acceptOffer: ", offerDB);

    if (offerDB.authorId == dbUser.id) {
      return { error: "You are the creator of the offer and cannot accept it" };
    }

    const offerUp = await db.offer.update({
      where: {
        id: data.offerId,
      },
      data: { usersWhoAccepted: { connect: { id: data.userId } } },
      include: { usersWhoAccepted: true },
    });
    console.log("offerUp from acceptOffer: ", offerUp);

    //return { error: "Test err" };
    revalidatePath("/offers");
    revalidatePath("/created-offers");
    revalidatePath("/offers-in-work");
    //return { success: offerUp.id };
    return { success: "offerUp" };
  } catch (error) {
    //console.log("error", error);
    console.error(error);
    if (error instanceof z.ZodError) {
      return { error: "Invalid request payload" };
    }
    return { error: "Some error" };
  }
};
