import { format } from "date-fns";
import { Metadata } from "next";

import { db } from "@/lib/db";
import { formatter } from "@/lib/utils";

import { MediaChannelsClient } from "./_components/client";
import { MediaChannelColumn } from "./_components/columns";
import { currentUser } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Медіа канали | Neurolide",
  description: "Медіа канали на Neurolide",
};

const MediaChannelsPage = async () => {
  //const user = await currentUser();
  //console.log("user from MediaChannelsPage:", user);

  const mediaChannels = await db.mediaChannel.findMany({
    where: {},
    /*   include: {
           user: true,
    }, */
    orderBy: {
      createdAt: "desc",
    },
  });
  //console.log("mediaChannels from MediaChannelsPage:", mediaChannels);

  const formattedMediaChannels: MediaChannelColumn[] = mediaChannels.map(
    (item) => ({
      id: item.id,
      name: item.name,
      userId: item.userId,
      description: item.description,
      image: item.image,
      subscribers: item.subscribers,
      views: item.views,
      price: item.price.toNumber(), //formatter.format(item.price.toNumber()),
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );
  /*   console.log(
    "formattedMediaChannels from MediaChannelsPage:",
    formattedMediaChannels
  ); */

  //lg:max-w-[1200px]
  return (
    <Card className=" w-full my-2  mx-auto border-0 shadow-none bg-inherit  ">
      <CardContent className="px-0">
        <MediaChannelsClient data={formattedMediaChannels} />
      </CardContent>
    </Card>
  );
};

export default MediaChannelsPage;
