import React from "react";

import { db } from "@/lib/db";

import { auth } from "@/auth";
import CardsClientIner from "./cards-client-inner";
type Props = {};

// async
const Cards = async (props: Props) => {
  //const user = await currentUser(); //
  //const user = useCurrentUser();
  const session = await auth();
  //console.log("session from @/auth from UserInfo: ", session);
  const user = session?.user;
  //console.log("user form  UserInfoServer: ", user);
  const cards = await db.card.findMany({
    where: { userId: user?.id },
    /*   include: {
           user: true,
    }, */
    orderBy: {
      createdAt: "desc",
    },
  });
  //console.log("cards from Cards-server:", cards);

  return <CardsClientIner cards={cards} />;
};

export default Cards;
