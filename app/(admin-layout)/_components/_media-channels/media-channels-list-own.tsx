import { format } from "date-fns";
import { Metadata } from "next";

import { db } from "@/lib/db";
import { formatter } from "@/lib/utils";

import { MediaChannelsClient } from "./client";
import { MediaChannelColumn } from "./columns";
import { currentUser } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";

interface MediaChannelsListProps {}

export const MediaChannelsListOwn: React.FC<
  MediaChannelsListProps
> = async () => {
  const user = await currentUser();
  console.log("user from MediaChannelsList:", user);

  const mediaChannels = await db.mediaChannel.findMany({
    where: { userId: user?.id },
    /*   include: {
           user: true,
    }, */
    orderBy: {
      createdAt: "desc",
    },
  });
  //console.log("mediaChannels from MediaChannelsList:", mediaChannels);

  const formattedMediaChannels: MediaChannelColumn[] = mediaChannels.map(
    (item) => ({
      id: item.id,
      name: item.name,
      userId: item.userId,
      description: item.description,
      image: item.image,
      link: item.link,
      isVerified: item.isVerified,
      isVIP: item.isVIP,
      subscribers: item.subscribers,
      views: item.views,
      price: item.price.toNumber(), //formatter.format(item.price.toNumber()),
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );
  /*  console.log(
    "formattedMediaChannels from MediaChannelsList:",
    formattedMediaChannels
  ); */

  //lg:max-w-[1200px]
  return (
    <Card className=" w-full my-2  mx-auto border-0 shadow-none bg-inherit  ">
      <CardContent className="px-0">
        <MediaChannelsClient
          text="Мої медіа канали"
          data={formattedMediaChannels}
        />
      </CardContent>
    </Card>
  );
};
