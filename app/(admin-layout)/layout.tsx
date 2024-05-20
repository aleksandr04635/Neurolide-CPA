import DataPanel from "./_components/data-panel-server";
import { Sidebar } from "./_components/sidebar";
import { UserButton } from "./_components/user-button";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

//export const dynamic = "force-dynamic"; //tells next to not cache ay pages in the layout

//h-fit xl:min-h-[calc(100vh_-_130px)] xl:min-h-fit bg-red-500   gap-x-2
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    /*  <div
      className="h-fit w-full flex flex-col gap-y-3 items-center justify-center  min-h-screen
     bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800"
    > */
    <div className=" w-full flex flex-row gap-x-0 min-h-screen  ">
      <Sidebar />
      <div
        className=" bg-gray-bg w-full  min-h-full pb-2 pl-[8px] pt-[8px] pr-[21px]
       md:pl-[14px] md:pt-[8px] md:pr-[24px] flex flex-col items-center justify-start gap-2"
      >
        <DataPanel />
        {/*  <div className="w-full flex items-center justify-between gap-2">
          <div className=" w-full xl:w-fit flex items-center justify-between gap-2">
            <div className="w-full xl:w-[250px] h-[70px] bg-white rounded-lg flex flex-col overflow-hidden">
              <div className="h-full flex flex-col justify-center pt-2 pl-2 sm:pl-6 ">
                <div className="text-gray-text text-sm">Index</div>
                <div className="text-black text-lg font-semibold">601,78</div>
              </div>
              <div className="w-full h-[8px] bg-[#FF0000]"></div>
            </div>
            <div className="w-full xl:w-[250px] h-[70px] bg-white rounded-lg flex flex-col overflow-hidden">
              <div className="h-full flex flex-col justify-center pt-2 pl-2 sm:pl-6 ">
                <div className="text-gray-text text-sm">Payments</div>
                <div className="text-black text-lg font-semibold">3002,49</div>
              </div>
              <div className="w-full h-[8px] bg-[#FFD600]"></div>
            </div>
            <div className="w-full xl:w-[250px] h-[70px] bg-white rounded-lg flex flex-col overflow-hidden">
              <div className="h-full flex flex-col justify-center pt-2 pl-2 sm:pl-6 ">
                <div className="text-gray-text text-sm">Budget</div>
                <div className="text-black text-lg font-semibold">216</div>
              </div>
              <div className="w-full h-[8px] bg-[#0FB600]"></div>
            </div>
          </div>

          <div className=" flex-0 w-[70px] h-[70px] bg-white rounded-lg">
            <UserButton />
          </div>
        </div> */}
        {children}
      </div>
    </div>
  );
};

export default ProtectedLayout;
