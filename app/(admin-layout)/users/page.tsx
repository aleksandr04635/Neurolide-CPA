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
  //console.log("users from UsersPage:", users);

  const formattedUsers: UsersColumn[] = users.map((item) => ({
    id: item.id,
    numId: item.numId as number,
    name: item.name || "",
    email: item.email || "",
    address: item.address || "Не введено",
    phoneNumber: item.phoneNumber || "Не введено",
    role: item.role || "",
    index: Number(item.index),
    payments: Number(item.payments),
    budget: Number(item.budget),
    lids: item.lids,
    writeoffs: Number(item.writeoffs),
    balance: Number(item.balance),
    clicks: item.clicks,
    hold: item.hold,
    accruals: Number(item.accruals),
    notifications: item.notifications,
  }));
  //console.log("formattedUsers from UsersPage:", formattedUsers);

  /*   id            String    @id @default(cuid())
  numId         Int       @default(autoincrement())
  name          String?
  address       String?
  phoneNumber   String?
  email         String?   @unique
  emailVerified DateTime?
  image         String    @default("https://res.cloudinary.com/dqwdfhxgl/image/upload/v1712025676/contacts/mtgn8ph1cyvu5hebxf1x.jpg")
  password      String?
  role          UserRole  @default(AFFILIATE)

  index    Decimal @default(0)
  payments Decimal @default(0)
  budget   Decimal @default(0)

  lids      Int     @default(0)
  writeoffs Decimal @default(0)
  balance   Decimal @default(0)

  clicks   Int     @default(0)
  hold     Int     @default(0)
  accruals Decimal @default(0)

  notifications Int @default(0) */

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
