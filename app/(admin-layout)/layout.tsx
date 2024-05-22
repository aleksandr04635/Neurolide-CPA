import Image from "next/image";
import DataPanel from "./_components/data-panel-server";
import { Sidebar } from "./_components/sidebar";
import { UserButton } from "./_components/user-button";
import Link from "next/link";
import { MenuButton } from "./_components/menu-button";
import Header from "./_components/header";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

//h-fit xl:min-h-[calc(100vh_-_130px)] xl:min-h-fit bg-red-500   gap-x-2
//pb-[40px]
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <>
      <div className="md:hidden w-full flex flex-col min-h-screen">
        <Header />
        <div className=" min-h-[calc(100vh_-_106px)]">{children}</div>
        <div
          className="h-[40px] bg-gradient-to-b from-blue-from via-blue-via to-blue-to
         w-full flex flex-row justify-end items-center px-3"
        >
          <Link href="/tech-support">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 14C10.5523 14 11 14.4448 11 14.9934V15.0066C11 15.5552 10.5523 16 10 16C9.44772 16 9 15.5552 9 15.0066V14.9934C9 14.4448 9.44772 14 10 14Z"
                fill="white"
              />
              <path
                d="M10.1407 12C10.121 11.6519 10.2147 11.3069 10.4078 11.0168C10.6008 10.7267 10.8828 10.5073 11.2111 10.3917C11.6134 10.2375 11.9745 9.99198 12.266 9.6743C12.5575 9.35662 12.7714 8.97549 12.8908 8.56094C13.0103 8.14638 13.0321 7.7097 12.9544 7.28529C12.8768 6.86087 12.7019 6.4603 12.4434 6.11511C12.185 5.76993 11.8501 5.48955 11.4651 5.29605C11.0801 5.10255 10.6555 5.00121 10.2248 5.00001C9.79404 4.99881 9.36891 5.09779 8.98285 5.28915C8.5968 5.48051 8.26035 5.75902 8 6.10277"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className=" w-full hidden md:flex flex-row gap-x-0 min-h-screen  ">
        <Sidebar />
        <div
          className=" bg-gray-bg w-full  min-h-full pb-2 pl-[8px] pt-[8px] pr-[21px]
       md:pl-[14px] md:pt-[8px] md:pr-[24px] flex flex-col items-center justify-start gap-2"
        >
          <DataPanel />
          {children}
        </div>
      </div>
    </>
  );
};

export default ProtectedLayout;
