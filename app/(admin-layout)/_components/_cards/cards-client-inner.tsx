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
import SwipeContainer from "../swipe-container";

type Props = { cards: Card[] | null };

const CardsClientIner = ({ cards }: Props) => {
  const [open, setOpen] = useState(false);
  // const user = await currentUser(); //
  const user = useCurrentUser();
  //console.log("user form  CardsClientIner: ", user);
  //console.log("cards form  CardsClientIner: ", cards);

  return (
    <div
      className="p-0 pt-2 pb-2 flex flex-col gap-2 items-center justify-center 
    w-full h-fit bg-white  rounded-xl relative"
    >
      <CardModal isOpen={open} onClose={() => setOpen(false)} />
      <div className=" w-full flex flex-row gap-2 items-center justify-between px-3">
        <h3 className=" w-full  text-sm pt-[5px]">Методи платежів</h3>
        <Button
          size="sm"
          type="button"
          className="md:hidden main-button   !rounded-full  !text-sm !px-5  "
          /*  !py-1 !px-5 */
          onClick={() => setOpen(true)}
        >
          Додати картку
        </Button>
      </div>
      {/* <hr /> */}
      {/* <Separator className="py-0" /> */}

      <div className="md:hidden w-full">
        {cards && (
          <SwipeContainer
            list={cards.map((card, i) => (
              <CreditCard key={i} type="mobileScr" card={card} />
            ))}
          />
        )}
      </div>

      <div className="hidden md:flex w-full px-4 pb-3 pt-1  flex-row flex-wrap gap-4">
        {cards &&
          cards.length > 0 &&
          cards.map((card, i) => (
            <CreditCard type="wideScr" key={i} card={card} />
          ))}
        <div
          className="hidden md:flex cursor-pointer h-[198px] w-[198px] bg-blue-bg hover:bg-blue-200 rounded-lg  items-center justify-center"
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
            <p>Додати нову картку</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsClientIner;

/* border-2 border-white
ring-2 ring-offset-[-1] ring-white  */
