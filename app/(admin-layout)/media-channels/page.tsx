import { Metadata } from "next";

import { MediaChannelsList } from "../_components/_media-channels/media-channels-list";

export const metadata: Metadata = {
  title: "Медіа канали | Neurolide",
  description: "Медіа канали на Neurolide",
};

const MediaChannelsPage = async () => {
  //const user = await currentUser();
  //console.log("user from MediaChannelsPage:", user);

  return <MediaChannelsList />;
};

export default MediaChannelsPage;
