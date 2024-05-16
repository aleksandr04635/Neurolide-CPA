"use client";
import React, { useState, useTransition } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { userRole } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, User } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/ui/alert-modal";
import { deleteCard } from "@/actions/card/deleteCard";
import { toast } from "react-hot-toast";

type Props = { card: Card | null };

const CreditCard = ({ card }: Props) => {
  // const user = await currentUser(); //
  const user = useCurrentUser();
  //console.log("user form  UserInfoClientIner: ", user);
  console.log("card form  CreditCard: ", card);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onDelete = () => {
    setOpen(false);
    startTransition(() => {
      deleteCard(card?.id!)
        .then((data) => {
          if (data.error) {
            toast.error(
              //"err " //
              data.error
              //"Make sure you removed all products using this category first."
            );
          }
          if (data.success) {
            router.refresh();
            toast.success("Card deleted.");
          }
        })
        .catch(() => toast.error("Щось пішло не так!"));
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
      />
      <div
        className="relative group p-0 flex flex-col gap-0 items-center justify-start 
    w-[350px] h-[198px]   rounded-lg text-white bg-gradient-to-br from-[#29205d] via-[#3c418a] to-[#8e80c2]"
      >
        <div className="w-full px-7 pt-7 flex flex-row items-center justify-between">
          <div className="space-x-2">
            <span>{"$95, 400.00"}</span>
            <span className="text-white/50">USD</span>
          </div>
          <div>
            {/*  <Image
              src={"/Vector.png"}
              width={60}
              height={20}
              alt="Visa"
              className=" object-cover  flex h-[20px] w-[60px] shrink-0
   overflow-hidden  box-border"
            /> */}
            <span className="text-white/50">
              <svg
                width="60"
                height="20"
                viewBox="0 0 60 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.0106 19.6666H21.1147L24.1745 0.345246H29.0709L26.0106 19.6666ZM16.996 0.345246L12.3285 13.6346L11.7762 10.7729L11.7767 10.774L10.1293 2.08492C10.1293 2.08492 9.93008 0.345246 7.80684 0.345246H0.0905434L0 0.672403C0 0.672403 2.35966 1.17683 5.12123 2.88084L9.37475 19.6672H14.4759L22.2651 0.345246H16.996ZM55.5045 19.6666H60L56.0805 0.344729H52.1449C50.3275 0.344729 49.8848 1.78463 49.8848 1.78463L42.583 19.6666H47.6866L48.7072 16.7966H54.9311L55.5045 19.6666ZM50.1172 12.832L52.6896 5.60147L54.1368 12.832H50.1172ZM42.9658 4.9916L43.6645 0.842441C43.6645 0.842441 41.5086 0 39.2611 0C36.8315 0 31.0619 1.09104 31.0619 6.39636C31.0619 11.388 37.8335 11.45 37.8335 14.0719C37.8335 16.6938 31.7596 16.224 29.755 14.5706L29.0272 18.909C29.0272 18.909 31.2133 20 34.5533 20C37.8944 20 42.9346 18.2226 42.9346 13.385C42.9346 8.36137 36.1021 7.89364 36.1021 5.70949C36.1026 3.52482 40.8707 3.80546 42.9658 4.9916Z"
                  fill="white"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="w-full px-7 pt-10 flex flex-row items-center justify-between">
          <div className="space-x-2 flex flex-row text-xl items-center">
            <span>{"****"}</span>
            <span>{"****"}</span>
            <span>{"****"}</span>
            <span>{card?.number.substr(15, 4)}</span>
            <span className="text-white/50">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.5">
                  <path
                    d="M13.125 13.124H16.875V3.12402H6.875V6.87402"
                    stroke="white"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.125 6.875H3.125V16.875H13.125V6.875Z"
                    stroke="white"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </span>
          </div>
          <div className="flex flex-col">
            <div className="text-white/50 text-sm">Expires</div>
            <div>{card?.expirationDate.split("/").join(" / ")}</div>
          </div>
        </div>

        <div className="w-full px-7 pt-5 flex flex-row items-center justify-between text-sm">
          <div className="space-x-2">
            <span>{card?.nameOnCard.toUpperCase()}</span>
          </div>
          <div>
            <span className="text-white/50">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 10.5C5.17157 10.5 4.5 11.1716 4.5 12C4.5 12.8284 5.17157 13.5 6 13.5C6.82843 13.5 7.5 12.8284 7.5 12C7.5 11.1716 6.82843 10.5 6 10.5Z"
                  fill="white"
                />
                <path
                  d="M10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12Z"
                  fill="white"
                />
                <path
                  d="M16.5 12C16.5 11.1716 17.1716 10.5 18 10.5C18.8284 10.5 19.5 11.1716 19.5 12C19.5 12.8284 18.8284 13.5 18 13.5C17.1716 13.5 16.5 12.8284 16.5 12Z"
                  fill="white"
                />
              </svg>
            </span>
          </div>
        </div>

        <div
          className="p-2 cursor-pointer absolute right-[25px]  top-[20px] hidden group-hover:block
      text-base font-normal text-white rounded-lg
      bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 "
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </div>
      </div>
    </>
  );
};

export default CreditCard;

/* from-[#0b1d58] via-[#343877] to-[#7c6db0] [rgba(255, 255, 255, 0.5)]
 */
