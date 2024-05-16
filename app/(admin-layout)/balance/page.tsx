import React from "react";
import Cards from "../_components/cards-server";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Cards />
    </div>
  );
};

export default page;
