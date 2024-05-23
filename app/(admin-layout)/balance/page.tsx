import React from "react";
import Cards from "../_components/_cards/cards-server";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Cards />
    </div>
  );
};

export default page;
