import React from "react";

import UserInfo from "../_components/user-info-server";
import Cards from "../_components/cards-server";
import { MediaChannelsListOwn } from "../_components/_media-channels/media-channels-list-own";
import { currentUser } from "@/lib/auth";

type Props = {};

const page = async (props: Props) => {
  const user = await currentUser();
  return (
    <div className="flex flex-col gap-3 w-full">
      <UserInfo />
      {user?.role == "BRAND" ? <Cards /> : <MediaChannelsListOwn />}
    </div>
  );
};

export default page;
