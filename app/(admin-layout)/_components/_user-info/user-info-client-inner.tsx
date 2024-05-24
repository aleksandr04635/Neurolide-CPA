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

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
    //console.log("user changed in UserInfoClientIner: ", user);
  }, [user]);

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

  const InnerContent = () => {
    return (
      <>
        <AlertModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={onDelete}
          loading={isPending}
        />

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

          <div className="  w-1/2 flex flex-col md:flex-row justify-between">
            <div className="  flex flex-col justify-center">
              <div className="p-[2px] bg-white  h-fit rounded-full shrink-0 w-fit">
                <Image
                  src={user?.image!}
                  alt="User image"
                  width={200}
                  height={200}
                  /* fill */
                  className=" object-cover  flex h-[80px] w-[80px] md:h-[230px] md:w-[230px] shrink-0
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
      </>
    );
  };

  //bg-contain bg-[length:200px_100px]
  //`url('/Rectangle 463.png')`
  return (
    <>
      {/* <InnerContent /> */}
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
      />

      <div className="w-full flex flex-row  justify-between pl-2 lg:pl-[5%] ">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start  pb-1 gap-2">
          <div
            className="p-[2px] bg-white   rounded-full w-[104px] h-[104px]  md:h-[234px] md:w-[234px] shrink-0 
             md:hidden flex-col items-center justify-center"
            /*  absolute top-1 right-1 */
          >
            <Image
              src={user?.image!}
              alt="User image"
              width={200}
              height={200}
              /* fill */
              className="object-cover  flex  rounded-full w-[100px] h-[100px]  md:h-[230px] md:w-[230px]  "
            />
          </div>
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
          <p className="text-orange-500 text-center md:text-left">
            Для тестування роль користувача можна змінити тут в настройках
          </p>

          <div className=" flex flex-col justify-end   gap-2">
            <Link
              className=" link-stand text-base text-center "
              href={"/settings"}
            >
              <Button
                size="sm"
                type="button"
                className=" main-button   !text-sm !py-2   !w-full !px-5 sm:!px-10 !rounded-lg       "
              >
                Редагувати особисти дані
              </Button>
            </Link>
            <Button
              size="sm"
              type="button"
              className=" md:hidden danger-button  !text-sm !py-2   !px-10 !rounded-lg      "
              onClick={() => setOpen(true)}
            >
              Видалити профіль
            </Button>
            <Button
              size="sm"
              type="button"
              className=" md:hidden gray-button  !text-sm !py-2   !px-10 !rounded-lg      "
              onClick={() => logout()}
            >
              Вихід
            </Button>
          </div>
        </div>

        {/* h-[80px] w-[80px]  aspect-square w-fit*/}
        <div className="   md:w-1/2 hidden md:flex flex-col xl:flex-row justify-between">
          <div className=" relative md:flex flex-col justify-center">
            <div
              className="p-[2px] bg-white   rounded-full w-[104px] h-[104px]  md:h-[234px] md:w-[234px] shrink-0 
            hidden md:flex flex-col items-center justify-center"
            >
              <Image
                src={user?.image!}
                alt="User image"
                width={200}
                height={200}
                /* fill */
                className="object-cover  flex  rounded-full w-[100px] h-[100px]  md:h-[230px] md:w-[230px]  "
              />
            </div>
          </div>
          <div className=" hidden md:flex flex-col justify-end px-2 pt-2 xl:pt-0 pb-1 gap-2">
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
    </>
  );
};

export default UserInfoClientIner;

/* border-2 border-white
ring-2 ring-offset-[-1] ring-white  */
