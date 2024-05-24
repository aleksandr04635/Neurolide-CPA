"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";
import { userRole } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { logout } from "@/actions/auth/logout";
import { AlertModal } from "@/components/ui/alert-modal";
import { deleteUser } from "@/actions/auth/delete-user";
import { formatter } from "@/lib/utils";

type Props = { fullUser: User | null };

// async
const TotalBalanceClientIner = ({ fullUser }: Props) => {
  const router = useRouter();
  // const user = await currentUser(); //
  const user = useCurrentUser();
  //console.log("user form  TotalBalanceClientIner: ", user);
  // console.log("fullUser form  TotalBalanceClientIner: ", fullUser);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
    // console.log("user changed in TotalBalanceClientIner: ", user);
  }, [user]);

  /*  const onDelete = () => {
    setOpen(false);
    startTransition(() => {
      deleteUser(user?.id!)
        .then((data) => {
          if (data.error) {
            toast.error(
              
              data.error
              //"Make sure you removed all products using this category first."
            );
          }
          if (data.success) {
            router.refresh();
            toast.success("User deleted.");
          }
        })
        .catch(() => toast.error("Щось пішло не так!"));
    });
  }; */

  //bg-contain bg-[length:200px_100px]
  //`url('/Rectangle 463.png')`
  return (
    <div
      className=" flex flex-col md:flex-row gap-2 items-start md:items-center md:justify-start 
    w-full h-fit    "
    >
      <div className="w-full sm:w-[300px] flex flex-col  gap-2 items-start justify-center p-6 bg-white rounded-xl">
        <div className="text-base">Особистий баланс</div>
        <div className="text-2xl">
          {formatter.format(fullUser?.balance as unknown as number)}
        </div>
      </div>
      <div className="w-full sm:w-fit flex flex-row md:flex-col  gap-2 items-center md:items-start justify-between">
        <Button
          size="sm"
          type="button"
          className=" main-button   !rounded-full !text-sm !px-5 sm:!px-10 w-full sm:w-fit   "
          /*  !py-1 !px-5 */
          /*  onClick={() => setOpen(true)} */
        >
          Вивести баланс
        </Button>
        <Button
          size="sm"
          type="button"
          className=" main-button   !rounded-full !text-sm !px-5 sm:!px-10 w-full  sm:w-fit   "
          /*  !py-1 !px-5 */
          /*   onClick={() => setOpen(true)} */
        >
          Поповнити баланс
        </Button>
      </div>
    </div>
  );
};

export default TotalBalanceClientIner;

/* border-2 border-white
ring-2 ring-offset-[-1] ring-white  */
