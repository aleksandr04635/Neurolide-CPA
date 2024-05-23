import React from "react";

import { db } from "@/lib/db";
import TotalBalanceClientIner from "./total-balance-client-inner";
import { auth } from "@/auth";
type Props = {};

// async
const TotalBalance = async (props: Props) => {
  //const user = await currentUser(); //
  //const user = useCurrentUser();
  const session = await auth();
  //console.log("session from @/auth from TotalBalance: ", session);
  const user = session?.user;
  //console.log("user form  UserInfoServer: ", user);
  const fullUser = await db.user.findFirst({ where: { id: user?.id } });
  //console.log("fullUser form  UserInfoServer: ", fullUser);

  return <TotalBalanceClientIner fullUser={fullUser} />;
};

export default TotalBalance;
