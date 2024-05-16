import React from "react";

import UserInfo from "../_components/user-info-server";
import Cards from "../_components/cards-server";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <UserInfo />
      <Cards />
    </div>
  );
};

export default page;
