"use client";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";

import { AlertModal } from "@/components/ui/alert-modal";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import MyButton from "@/components/ui/my-button";
import { deleteOffer } from "@/actions/offer/deleteOffer";
import { acceptOffer } from "@/actions/offer/acceptOffer";
import { declineOffer } from "@/actions/offer/declineOffer";
import { UsersColumn } from "./columns";
import { deleteUser } from "@/actions/auth/delete-user";
import { UserModal } from "./user-modal";
//import { deleteOffers } from "@/actions/offers/deleteOffers";

interface CellActionProps {
  data: UsersColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  //console.log("data from users CellAction:", data);
  const user = useCurrentUser();
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [openE, setOpenE] = useState(false);
  const router = useRouter();
  const params = useParams();

  const onConfirm = () => {
    setOpen(false);
    startTransition(() => {
      deleteUser(data.id)
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
            toast.success("Offer was deleted");
          }
        })
        .catch(() => toast.error("Щось пішло не так!"));
    });
  };

  /*  const acceptOfferCommand = () => {
    setOpen(false);
    startTransition(() => {
      acceptOffer({ offerId: data.id, userId: user?.id || "" })
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
            toast.success("Offer was accepted");
          }
        })
        .catch(() => toast.error("Щось пішло не так!"));
    });
  };

  const declineOfferCommand = () => {
    setOpen(false);
    startTransition(() => {
      declineOffer({ offerId: data.id, userId: user?.id || "" })
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
            toast.success("Offer was declined");
          }
        })
        .catch(() => toast.error("Щось пішло не так!"));
    });
  }; */

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <UserModal
        key={data.id}
        data={data}
        isOpen={openE}
        onClose={() => setOpenE(false)}
      />
      {user && user.role == "MANAGER" ? (
        <div className="flex flex-row gap-4 justify-start items-center">
          {/* sm:flex-row  */}
          {/*  <Link href={`/media-channels/${data.id}`}> */}
          <div onClick={() => setOpenE(true)} className="cursor-pointer ">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.9228 2.61575C11.4933 0.89501 8.98416 0.89501 8.55467 2.61575C8.49055 2.87432 8.36478 3.11446 8.1876 3.31663C8.01042 3.5188 7.78683 3.67729 7.53503 3.7792C7.28323 3.88111 7.01033 3.92356 6.73854 3.90309C6.46676 3.88263 6.20376 3.79983 5.97096 3.66143C4.42028 2.73929 2.64582 4.47106 3.59069 5.98443C4.20102 6.96172 3.65964 8.23683 2.52036 8.50708C0.75607 8.92513 0.75607 11.375 2.52036 11.7919C2.78538 11.8546 3.03148 11.9774 3.23864 12.1505C3.44579 12.3235 3.60814 12.5419 3.71246 12.7878C3.81678 13.0336 3.86013 13.3001 3.83897 13.5654C3.81781 13.8307 3.73274 14.0874 3.59069 14.3146C2.64582 15.8279 4.42028 17.5597 5.97096 16.6376C6.20372 16.4989 6.46674 16.4159 6.7386 16.3953C7.01046 16.3746 7.28347 16.4169 7.53541 16.5187C7.78734 16.6205 8.01108 16.779 8.1884 16.9812C8.36571 17.1833 8.4916 17.4235 8.5558 17.6822C8.98416 19.404 11.4944 19.404 11.9216 17.6822C11.9861 17.4236 12.1121 17.1836 12.2894 16.9816C12.4668 16.7796 12.6905 16.6212 12.9423 16.5194C13.1942 16.4177 13.4671 16.3753 13.7389 16.3958C14.0107 16.4164 14.2737 16.4992 14.5065 16.6376C16.0572 17.5597 17.8316 15.8279 16.8867 14.3146C16.7449 14.0874 16.6601 13.8307 16.6391 13.5655C16.618 13.3002 16.6614 13.0339 16.7657 12.7881C16.87 12.5423 17.0322 12.3239 17.2392 12.1509C17.4463 11.9778 17.6922 11.8548 17.9571 11.7919C19.7214 11.3739 19.7214 8.92403 17.9571 8.50708C17.6921 8.44442 17.446 8.32156 17.2388 8.14851C17.0316 7.97546 16.8693 7.75711 16.765 7.51123C16.6607 7.26536 16.6173 6.99891 16.6385 6.7336C16.6596 6.46828 16.7447 6.21159 16.8867 5.98443C17.8316 4.47106 16.0572 2.73929 14.5065 3.66143C14.2737 3.80006 14.0107 3.88308 13.7388 3.90373C13.467 3.92439 13.194 3.88208 12.942 3.78027C12.6901 3.67846 12.4664 3.52002 12.289 3.31785C12.1117 3.11567 11.9858 2.87549 11.9216 2.61685L11.9228 2.61575Z"
                stroke="#2E65F3"
                strokeWidth="2"
              />
              <path
                d="M12.248 10.1494C12.248 11.2324 11.3484 12.1103 10.2387 12.1103C9.12905 12.1103 8.22948 11.2324 8.22948 10.1494C8.22948 9.06637 9.12905 8.18844 10.2387 8.18844C11.3484 8.18844 12.248 9.06637 12.248 10.1494Z"
                stroke="#2E65F3"
                strokeWidth="2"
              />
            </svg>
          </div>
          {/*  </Link> */}
          <div className="cursor-pointer " onClick={() => setOpen(true)}>
            <svg
              width="17"
              height="19"
              viewBox="0 0 17 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.87741 8.23043V13.7455M10.5541 8.23043V13.7455M1.3623 4.55369H16.0693M15.1501 4.55369L14.3531 15.7144C14.3201 16.1782 14.1126 16.6123 13.7723 16.9292C13.4321 17.2461 12.9843 17.4223 12.5194 17.4223H4.91219C4.44722 17.4223 3.99951 17.2461 3.65924 16.9292C3.31898 16.6123 3.11144 16.1782 3.07842 15.7144L2.28149 4.55369H15.1501ZM11.4733 4.55369V1.79614C11.4733 1.55235 11.3765 1.31856 11.2041 1.14618C11.0317 0.973795 10.7979 0.876953 10.5541 0.876953H6.87741C6.63363 0.876953 6.39983 0.973795 6.22745 1.14618C6.05507 1.31856 5.95823 1.55235 5.95823 1.79614V4.55369H11.4733Z"
                stroke="#F32D2D"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* <MyButton className=" " style="danger" onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </MyButton> */}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
