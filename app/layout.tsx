import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";
import "./globals.css";
import { ToastProvider } from "./(admin-layout)/_components/toast-provider";

//import StoreProvider from "./_components/store-provider";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neurolide",
  description: "Neurolide CPA",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  //h-fit justify-stretch from-sky-200 to-blue-600 gap-y-3 items-center
  //className="w-screen overflow-x-hidden "
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className="w-screen overflow-x-hidden ">
          <div className={` ${inter.className}`}>
            <ToastProvider />
            <div className="  relative w-full flex flex-col    min-h-screen bg-white">
              {children}
            </div>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
