"use client";
import React, { useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";
import { userRole } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, User } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import CreditCard from "./card";
import { CardModal } from "./card-modal";

type Props = { cards: Card[] | null };

const CardsClientIner = ({ cards }: Props) => {
  const [open, setOpen] = useState(false);
  // const user = await currentUser(); //
  const user = useCurrentUser();
  //console.log("user form  CardsClientIner: ", user);
  //console.log("cards form  CardsClientIner: ", cards);

  return (
    <div
      className="p-0 pt-1 flex flex-col gap-2 items-center justify-center 
    w-full h-fit bg-white  rounded-xl relative"
    >
      <CardModal isOpen={open} onClose={() => setOpen(false)} />
      <h3 className="font-semibold w-full px-4 text-sm pt-[5px]">
        Payment Method
      </h3>
      {/* <hr /> */}
      <Separator className="py-0" />
      <div className="w-full px-4 pb-3 pt-1 flex flex-row flex-wrap gap-4">
        {cards &&
          cards.length > 0 &&
          cards.map((card, i) => <CreditCard key={i} card={card} />)}
        <div
          className=" cursor-pointer h-[198px] w-[198px] bg-blue-bg hover:bg-blue-200 rounded-lg flex items-center justify-center"
          onClick={() => setOpen(true)}
        >
          <div className=" flex flex-col items-center justify-center gap-2">
            <div>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35Z"
                  stroke="#B2CEF8"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />
                <path
                  d="M13.75 20H26.25"
                  stroke="#B2CEF8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 13.75V26.25"
                  stroke="#B2CEF8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p>Add new card</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsClientIner;

/* border-2 border-white
ring-2 ring-offset-[-1] ring-white  */
