import React from "react";

import UserInfo from "../_components/user-info-server";
import Cards from "../_components/_cards/cards-server";
import { MediaChannelsListOwn } from "../_components/_media-channels/media-channels-list-own";
import { currentUser } from "@/lib/auth";
import { userRole } from "@/lib/utils";
import DataPanel from "../_components/data-panel-server";

type Props = {};

const page = async (props: Props) => {
  const user = await currentUser();

  return (
    <div className="flex flex-col gap-2 w-full">
      <DataPanel />
      <Cards />
    </div>
  );
};

export default page;
