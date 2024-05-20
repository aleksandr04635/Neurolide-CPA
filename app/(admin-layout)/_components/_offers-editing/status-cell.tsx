"use client";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";

import { OfferColumns } from "./columns";
import { AlertModal } from "@/components/ui/alert-modal";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import MyButton from "@/components/ui/my-button";
import Tooltip from "@/components/ui/Tooltip";

//import { deleteOffer } from "@/actions/offer/deleteOffer";

interface StatusCellProps {
  data: OfferColumns;
}

export const StatusCell: React.FC<StatusCellProps> = ({ data }) => {
  //console.log("data from offers StatusCell:", data);
  const user = useCurrentUser();
  // console.log("user form  CellAction: ", user);

  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [openE, setOpenE] = useState(false);
  const router = useRouter();
  const params = useParams();

  /* const onConfirm = () => {
    setOpen(false);
    startTransition(() => {
      deleteOffer(data.id)
        .then((data) => {
          if (data.error) {
            toast.error(
              //"err " //
              data.error
              //"Make sure you removed all media channels and offers before removing a user."
            );
          }
          if (data.success) {
            router.refresh();
            toast.success("Media channel was deleted");
          }
        })
        .catch(() => toast.error("Щось пішло не так!"));
    });
  }; */

  return (
    <div className="flex flex-row space-x-4 items-center justify-start">
      {/* {data.isVerified.toString()} */}
      {((data.authorId == user?.id && user?.role == "BRAND") ||
        user?.role == "MANAGER") && (
        <div className="">
          {data.isVerified == true && (
            <Tooltip message="Верифіковано">
              <svg
                width="20"
                height="20"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[26px] h-[26px] pl-[2px] stroke-[#71CBA3]"
              >
                <circle cx="13" cy="13" r="12" strokeWidth="2" />
                <path d="M19 9L11 17" strokeWidth="2" strokeLinecap="square" />
                <path d="M11 17L7 13" strokeWidth="2" strokeLinecap="square" />
              </svg>
            </Tooltip>
          )}
          {data.isVerified == false && (
            <Tooltip message="Не верифіковано">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                /* width="20"
              height="20"
              viewBox="0 0 28 28" */
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                /*   stroke="currentColor" */
                className="w-7 h-7 stroke-[#ddd05f] "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                />
              </svg>
            </Tooltip>
          )}
        </div>
      )}

      <div className="">
        {/*{data.isVIP.toString()}*/}
        {data.isVIP == true && (
          <Tooltip message="VIP статус">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              /*  viewBox="0 0 24 24" */
              width="28"
              height="28"
              viewBox="-5 -5 36 36"
              strokeWidth="1.5"
              className="w-7 h-7 stroke-[#fdea3f] "
            >
              <circle cx="12" cy="12" r="14" strokeWidth="2" />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 18h14M5 14h14l1-9-4 3-4-5-4 5-4-3 1 9Z"
              ></path>
            </svg>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
