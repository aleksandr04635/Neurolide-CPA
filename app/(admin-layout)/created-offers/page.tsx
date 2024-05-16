import { format } from "date-fns";
import { Metadata } from "next";

import { db } from "@/lib/db";
import { formatter } from "@/lib/utils";

import { currentUser } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { OfferColumns } from "../_components/_offers-editing/columns";
import { OffersClient } from "../_components/_offers-editing/client";

export const metadata: Metadata = {
  title: "Створені офери | Neurolide",
  description: "Список створених оферів на Neurolide",
};

const OffersPage = async () => {
  const user = await currentUser();
  //console.log("user from OffersPage:", user);

  const offers = await db.offer.findMany({
    where: { authorId: user?.id },
    /*   include: {
           user: true,
    }, */
    orderBy: {
      createdAt: "desc",
    },
  });
  //console.log("offers from OffersPage:", offers);

  const formattedOffers: OfferColumns[] = offers.map((item) => ({
    id: item.id,
    name: item.name,
    brand: item.brand,
    authorId: item.authorId,
    price: item.price.toNumber(), // formatter.format(item.price.toNumber()),
    balance: item.balance.toNumber(), //formatter.format(item.balance.toNumber()),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  /*   console.log(
    "formattedOffers from OffersPage:",
    formattedOffers
  ); */

  /*  name      String
  brand     String
  price     Decimal
  balance   Decimal */

  //lg:max-w-[1200px]
  return (
    <Card className=" w-full my-2  mx-auto border-0 shadow-none bg-inherit  ">
      <CardContent className="px-0">
        <OffersClient data={formattedOffers} />
      </CardContent>
    </Card>
  );
};

export default OffersPage;
