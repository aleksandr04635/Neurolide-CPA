import { db } from "@/lib/db";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import MediaChannelForm from "./_components/media-channel-form";

const MediaChannelPage = async ({
  params,
}: {
  params: { mediaChannelId: string };
}) => {
  /*  console.log(
    "params.mediaChannelId from MediaChannelPage: ",
    params.mediaChannelId
  ); */
  const IdNum = Number(params.mediaChannelId);
  //console.log("IdNum from MediaChannelPage: ", IdNum);
  //console.log("isNaN(IdNum) from MediaChannelPage: ", isNaN(IdNum));

  const mediaChannel = !isNaN(IdNum)
    ? await db.mediaChannel.findUnique({
        where: {
          id: IdNum,
        },
      })
    : null;
  //console.log("mediaChannel from MediaChannelPage: ", mediaChannel);

  //md:w-[900px]
  return (
    <div className="flex items-center justify-center w-full bg-white rounded-lg ">
      <Card className=" w-full my-2 mx-auto max-w-[500px] shadow-none border-0 ">
        {/* <CardHeader>
        <p className="text-2xl font-semibold text-center py-0"> Category</p>
      </CardHeader> */}
        <CardContent>
          <MediaChannelForm initialData={mediaChannel} />
        </CardContent>
      </Card>
    </div>
    /*  <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MediaChannelForm initialData={mediaChannel} categories={categories} />
      </div>
    </div> */
  );
};

export default MediaChannelPage;
