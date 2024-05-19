import { format } from "date-fns";
import { Metadata } from "next";

import { db } from "@/lib/db";
import { formatter } from "@/lib/utils";

import { currentUser } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { OfferColumns } from "./columns";
import { OffersClient } from "./client";

const OffersCreatedByMeAndAccepted = async () => {
  const user = await currentUser();
  //console.log("user from OffersCreatedByMeAndAccepted:", user);

  const offers = await db.offer.findMany({
    where: { authorId: user?.id },
    /*   include: {
           user: true,
    }, */
    orderBy: {
      createdAt: "desc",
    },
    include: { usersWhoAccepted: true },
  });
  //console.log("offers from OffersCreatedByMeAndAccepted:", offers);

  const formattedOffers: OfferColumns[] = offers.map((item) => ({
    id: item.id,
    name: item.name,
    brand: item.brand,
    authorId: item.authorId,
    price: item.price.toNumber(), // formatter.format(item.price.toNumber()),
    balance: item.balance.toNumber(), //formatter.format(item.balance.toNumber()),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    link: item.link,
    isVerified: item.isVerified,
    isVIP: item.isVIP,
    accepted: item.usersWhoAccepted.length > 0,
  }));
  //console.log("formattedOffers from OffersCreatedByMeAndAccepted:", formattedOffers);
  const filteredOffers: OfferColumns[] = formattedOffers.filter(
    (item) => item.accepted == true
  );
  /*  name      String
  brand     String
  price     Decimal
  balance   Decimal */

  //lg:max-w-[1200px]
  return (
    <Card className=" w-full my-2  mx-auto border-0 shadow-none bg-inherit  ">
      <CardContent className="px-0">
        <OffersClient
          text="Офери,що я створив і хтось прийняв"
          data={filteredOffers}
        />
      </CardContent>
    </Card>
  );
};

export default OffersCreatedByMeAndAccepted;
