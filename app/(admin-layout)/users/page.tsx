import { format } from "date-fns";
import { Metadata } from "next";

import { db } from "@/lib/db";
import { formatter, userRole } from "@/lib/utils";

import { UsersClient } from "./_components/client";
import { UsersColumn } from "./_components/columns";
import { currentUser } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Список користувачів | Neurolide",
  description: "Список користувачів на Neurolide",
};

const UsersPage = async () => {
  //const user = await currentUser();
  //console.log("user from UsersPage:", user);

  const users = await db.user.findMany({
    /* orderBy: {
      createdAt: "desc",
    }, */
  });
  //console.log("UsersPage from UsersPage:", users);

  const formattedUsers: UsersColumn[] = users.map((item) => ({
    numId: item.numId as number,
    name: item.name || "",
    email: item.email || "",
    address: item.address || "Not entered",
    phoneNumber: item.phoneNumber || "Not entered",
    role: userRole(item.role) || "",
  }));
  //console.log("formattedUsers from UsersPage:", formattedUsers);

  //lg:max-w-[1200px]
  return (
    <Card className=" w-full my-2  mx-auto  border-0 shadow-none bg-inherit">
      {/*  <CardHeader>
      <p className="text-2xl font-semibold text-center py-0">
        {`${categories?.length}`} Categories exist
      </p>
    </CardHeader> */}
      <CardContent className="px-0">
        <UsersClient data={formattedUsers} />
      </CardContent>
    </Card>
    /*  <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div> */
  );
};

export default UsersPage;
