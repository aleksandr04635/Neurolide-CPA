import React from "react";

import UserInfo from "../_components/user-info-server";
import Cards from "../_components/cards-server";
import { MediaChannelsListOwn } from "../_components/_media-channels/media-channels-list-own";
import { currentUser } from "@/lib/auth";
import { userRole } from "@/lib/utils";

type Props = {};

const page = async (props: Props) => {
  const user = await currentUser();

  return (
    <div className="flex flex-col gap-3 w-full">
      <div
        className=" bg-gradient-to-b from-blue-from via-blue-via to-blue-to
flex flex-row items-center justify-center gap-2 h-fit w-full py-2 px-3"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={" stroke-white pb-[3px] "}
        >
          <g clipPath="url(#clip0_5_7663)">
            <path
              d="M4.16667 10H2.5L10 2.5L17.5 10H15.8333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.16675 10V15.8333C4.16675 16.2754 4.34234 16.6993 4.6549 17.0118C4.96746 17.3244 5.39139 17.5 5.83341 17.5H14.1667C14.6088 17.5 15.0327 17.3244 15.3453 17.0118C15.6578 16.6993 15.8334 16.2754 15.8334 15.8333V10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 17.5V12.5C7.5 12.058 7.6756 11.634 7.98816 11.3215C8.30072 11.0089 8.72464 10.8333 9.16667 10.8333H10.8333C11.2754 10.8333 11.6993 11.0089 12.0118 11.3215C12.3244 11.634 12.5 12.058 12.5 12.5V17.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_5_7663">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <div className="text-white text-sm font-light  ">
          Головна {/* {userRole(user?.role || "")} */}
        </div>
      </div>

      <UserInfo />
      {user?.role == "BRAND" ? <Cards /> : <MediaChannelsListOwn />}
    </div>
  );
};

export default page;
