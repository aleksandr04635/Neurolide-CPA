import React from "react";
import { formatter } from "@/lib/utils";
import { db } from "@/lib/db";
import UserInfoClientIner from "./user-info-client-inner";
import { auth } from "@/auth";
import { UserButton } from "./user-button";
type Props = {};

// async
const DataPanel = async (props: Props) => {
  //const user = await currentUser(); //
  //const user = useCurrentUser();
  const session = await auth();
  //console.log("session from @/auth from UserInfo: ", session);
  const user = session?.user;
  //console.log("user form  DataPanel: ", user);
  const fullUser = await db.user.findFirst({ where: { id: user?.id } });
  //console.log("fullUser form  DataPanel: ", fullUser);

  // return <UserInfoClientIner fullUser={fullUser} />;
  //xl:w-fit
  //xl:w-[250px]
  return (
    <div className="w-full flex items-center justify-between gap-2 bg-transparent">
      {!fullUser ? (
        <></>
      ) : (
        <div className=" w-full  flex flex-col md:flex-row items-center justify-between gap-2 bg-transparent">
          {fullUser.role == "AFFILIATE" && (
            <>
              <div className="w-full  h-[70px] bg-white rounded-lg flex flex-col overflow-hidden">
                <div className="h-full flex flex-col justify-center pt-2 pl-2 sm:pl-6 ">
                  <div className="text-gray-text text-sm">Кліки</div>
                  <div className="text-black text-lg font-semibold">
                    {fullUser?.clicks}
                  </div>
                </div>
                <div className="w-full h-[8px] bg-[#FF0000]"></div>
              </div>
              <div className="w-full  h-[70px] bg-white rounded-lg flex flex-col overflow-hidden">
                <div className="h-full flex flex-col justify-center pt-2 pl-2 sm:pl-6 ">
                  <div className="text-gray-text text-sm">Холд</div>
                  <div className="text-black text-lg font-semibold">
                    {fullUser?.hold.toString()}
                  </div>
                </div>
                <div className="w-full h-[8px] bg-[#FFD600]"></div>
              </div>
              <div className="w-full  h-[70px] bg-white rounded-lg flex flex-col overflow-hidden">
                <div className="h-full flex flex-col justify-center pt-2 pl-2 sm:pl-6 ">
                  <div className="text-gray-text text-sm">Нарахування</div>
                  <div className="text-black text-lg font-semibold">
                    {formatter.format(fullUser?.accruals as unknown as number)}
                  </div>
                </div>
                <div className="w-full h-[8px] bg-[#0FB600]"></div>
              </div>
            </>
          )}
          {fullUser.role == "BRAND" && (
            <>
              <div className="w-full  h-[70px] bg-white rounded-lg flex flex-col overflow-hidden">
                <div className="h-full flex flex-col justify-center pt-2 pl-2 sm:pl-6 ">
                  <div className="text-gray-text text-sm">Ліди</div>
                  <div className="text-black text-lg font-semibold">
                    {fullUser?.lids}
                  </div>
                </div>
                <div className="w-full h-[8px] bg-[#FF0000]"></div>
              </div>
              <div className="w-full  h-[70px] bg-white rounded-lg flex flex-col overflow-hidden">
                <div className="h-full flex flex-col justify-center pt-2 pl-2 sm:pl-6 ">
                  <div className="text-gray-text text-sm">Списання</div>
                  <div className="text-black text-lg font-semibold">
                    {formatter.format(fullUser?.writeoffs as unknown as number)}
                  </div>
                </div>
                <div className="w-full h-[8px] bg-[#FFD600]"></div>
              </div>
              <div className="w-full  h-[70px] bg-white rounded-lg flex flex-col overflow-hidden">
                <div className="h-full flex flex-col justify-center pt-2 pl-2 sm:pl-6 ">
                  <div className="text-gray-text text-sm">Баланс</div>
                  <div className="text-black text-lg font-semibold">
                    {formatter.format(fullUser?.balance as unknown as number)}
                  </div>
                </div>
                <div className="w-full h-[8px] bg-[#0FB600]"></div>
              </div>
            </>
          )}
          {fullUser.role == "MANAGER" && (
            <>
              <div className="w-full  h-[70px] bg-white rounded-lg flex flex-col overflow-hidden">
                <div className="h-full flex flex-col justify-center pt-2 pl-2 sm:pl-6 ">
                  <div className="text-gray-text text-sm">Індекс</div>
                  <div className="text-black text-lg font-semibold">
                    {formatter.format(fullUser?.index as unknown as number)}
                  </div>
                </div>
                <div className="w-full h-[8px] bg-[#FF0000]"></div>
              </div>
              <div className="w-full  h-[70px] bg-white rounded-lg flex flex-col overflow-hidden">
                <div className="h-full flex flex-col justify-center pt-2 pl-2 sm:pl-6 ">
                  <div className="text-gray-text text-sm">Виплати</div>
                  <div className="text-black text-lg font-semibold">
                    {formatter.format(fullUser?.payments as unknown as number)}
                  </div>
                </div>
                <div className="w-full h-[8px] bg-[#FFD600]"></div>
              </div>
              <div className="w-full  h-[70px] bg-white rounded-lg flex flex-col overflow-hidden">
                <div className="h-full flex flex-col justify-center pt-2 pl-2 sm:pl-6 ">
                  <div className="text-gray-text text-sm">Бюджет</div>
                  <div className="text-black text-lg font-semibold">
                    {formatter.format(fullUser?.budget as unknown as number)}
                  </div>
                </div>
                <div className="w-full h-[8px] bg-[#0FB600]"></div>
              </div>
            </>
          )}
          <div className="w-full  h-[70px] bg-white rounded-lg flex flex-col overflow-hidden">
            <div className="h-full flex flex-col justify-center pt-2 pl-2 sm:pl-6 ">
              <div className="text-gray-text text-sm">Сповіщення</div>
              <div className="text-black text-lg font-semibold">
                {fullUser?.notifications}
              </div>
            </div>
            <div className="w-full h-[8px] bg-[#9E00FF]"></div>
          </div>
        </div>
      )}

      {/* <div className="lg:hidden flex-0 w-[70px] h-[70px] bg-white rounded-lg">
        <UserButton />
      </div> */}
    </div>
  );
};

export default DataPanel;
