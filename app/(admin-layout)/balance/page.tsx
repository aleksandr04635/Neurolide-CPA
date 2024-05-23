import React from "react";
import Cards from "../_components/_cards/cards-server";
import TotalBalance from "../_components/_total-balance/total-balance-server";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Cards />
      <TotalBalance />
    </div>
  );
};

export default page;
