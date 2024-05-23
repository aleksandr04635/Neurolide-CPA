import React from "react";

import { db } from "@/lib/db";
import UserInfoClientIner from "./user-info-client-inner";
import { auth } from "@/auth";
type Props = {};

// async
const UserInfo = async (props: Props) => {
  //const user = await currentUser(); //
  //const user = useCurrentUser();
  const session = await auth();
  //console.log("session from @/auth from UserInfo: ", session);
  const user = session?.user;
  //console.log("user form  UserInfoServer: ", user);
  const fullUser = await db.user.findFirst({ where: { id: user?.id } });
  //console.log("fullUser form  UserInfoServer: ", fullUser);

  return <UserInfoClientIner fullUser={fullUser} />;
};

export default UserInfo;
