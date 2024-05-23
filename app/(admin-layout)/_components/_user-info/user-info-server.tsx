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

  return (
    <>
      <div
        className=" md:hidden flex p-2 pt-2  flex-col lg:flex-row gap-3 items-center justify-center 
  w-full h-fit bg-white  rounded-xl relative  "
      >
        <UserInfoClientIner fullUser={fullUser} />
      </div>
      <div
        className=" hidden md:flex p-2 pt-2  flex-col lg:flex-row gap-3 items-center justify-center 
  w-full h-fit bg-white  rounded-xl relative bg-no-repeat bg-right-top "
        style={{
          backgroundImage: `url('/Rectangle 4632.png')`,
          backgroundSize: `55% 100%`,
        }}
      >
        <UserInfoClientIner fullUser={fullUser} />
      </div>
    </>
  );
};

export default UserInfo;
