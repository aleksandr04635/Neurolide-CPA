"use client";
import React, { useState, useTransition } from "react";
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

type Props = { fullUser: User | null };

// async
const UserInfoClientIner = ({ fullUser }: Props) => {
  const router = useRouter();
  // const user = await currentUser(); //
  const user = useCurrentUser();
  //console.log("user form  UserInfoClientIner: ", user);
  // console.log("fullUser form  UserInfoClientIner: ", fullUser);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const onDelete = () => {
    setOpen(false);
    startTransition(() => {
      deleteUser(user?.id!)
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
            toast.success("User deleted.");
          }
        })
        .catch(() => toast.error("Щось пішло не так!"));
    });
  };

  //bg-contain bg-[length:200px_100px]
  //`url('/Rectangle 463.png')`
  return (
    <div
      className="p-2 pt-2 flex flex-col lg:flex-row gap-3 items-center justify-center 
    w-full h-fit bg-white  rounded-xl relative bg-no-repeat bg-right-top "
      style={{
        backgroundImage: `url('/Rectangle 4632.png')`,
        backgroundSize: `55% 100%`,
      }}
    >
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
      />
      {/* <div
        className="  w-full h-[70px]  rounded-xl 
      bg-gradient-to-r from-blue-from via-blue-via to-blue-to text-white text-lg font-semibold
      flex flex-row items-center pl-5 "
      >
        Your Profile
      </div> */}

      {/*    <div className="static sm:absolute top-5 right-5 lg:right-50 z-1 flex flex-col gap-4 sm:gap-24 ">
        <div className="p-[2px] bg-white w-fit h-fit rounded-full">
          <Image
            src={user?.image!}
            alt="User image"
            width={200}
            height={200}
           
            className=" object-cover  flex h-[250px] w-[250px] shrink-0
           overflow-hidden rounded-full box-border"
          />
        </div>
      </div> */}

      <div className="w-full flex flex-row justify-start pl-2 lg:pl-[5%] ">
        <div className="w-1/2 flex flex-col items-start pb-1">
          <table className="border-0">
            <tbody>
              <tr>
                <td className="py-2 w-[130px] text-sm text-gray-text-2">
                  Роль:
                </td>
                <td className="">
                  {/* font-semibold text-sm */}
                  {userRole(user?.role || "")}
                </td>
              </tr>
              {/* <tr>
                <td className="py-2 w-[130px] text-sm text-gray-text-2">
                  Admin Id:
                </td>
                <td className=" font-semibold text-sm">{fullUser?.numId}</td>
              </tr> */}
              <tr>
                <td className="py-2 w-[130px] text-sm text-gray-text-2">
                  Ім’я:
                </td>
                <td className=" font-semibold text-sm">{user?.name}</td>
              </tr>
              <tr>
                <td className="py-2 w-[130px] text-sm text-gray-text-2">
                  Email:
                </td>
                <td className=" font-semibold text-sm">{user?.email}</td>
              </tr>
              <tr>
                <td className="py-2 w-[130px] text-sm text-gray-text-2">
                  Номер телефону:
                </td>
                <td className="  text-sm">
                  {fullUser?.phoneNumber && fullUser?.phoneNumber != "null"
                    ? fullUser?.phoneNumber
                    : "Не введено"}
                </td>
              </tr>
              <tr>
                <td className="py-2 w-[130px] text-sm text-gray-text-2">
                  Адреса:
                </td>
                <td className="  text-sm">
                  {fullUser?.address || "Не введено"}
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-orange-500">
            Для тестування роль користувача можна змінити тут в настройках
          </p>
          <Link
            className=" link-stand text-base text-center mt-2 "
            href={"/settings"}
          >
            <Button
              size="sm"
              type="button"
              className=" main-button   !text-sm !py-2   !px-10 !rounded-lg       "
            >
              Редагувати особисти дані
            </Button>
          </Link>
        </div>

        <div className="  w-1/2 flex flex-row justify-between">
          <div className="  flex flex-col justify-center">
            <div className="p-[2px] bg-white  h-fit rounded-full shrink-0 w-fit">
              <Image
                src={user?.image!}
                alt="User image"
                width={200}
                height={200}
                /* fill */
                className=" object-cover  flex h-[230px] w-[230px] shrink-0
           overflow-hidden rounded-full box-border"
              />
            </div>
          </div>
          <div className="  flex flex-col justify-end px-2 pb-1 gap-2">
            <Button
              size="sm"
              type="button"
              className=" danger-button  !text-sm !py-2   !px-10 !rounded-lg      "
              onClick={() => setOpen(true)}
            >
              Видалити профіль
            </Button>
            <Button
              size="sm"
              type="button"
              className=" gray-button  !text-sm !py-2   !px-10 !rounded-lg      "
              onClick={() => logout()}
            >
              Вихід
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoClientIner;

/* border-2 border-white
ring-2 ring-offset-[-1] ring-white  */
