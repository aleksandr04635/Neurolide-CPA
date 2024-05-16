import { auth } from "@/auth";
import { db } from "@/lib/db";
import SettingsClientInter from "./_components/settings-client-inter";

const SettingsPage = async () => {
  const session = await auth();
  //console.log("session from @/auth from SettingsPage: ", session);
  const user = session?.user;
  //console.log("user form  SettingsPage: ", user);
  const fullUser = await db.user.findFirst({ where: { id: user?.id } });
  //console.log("fullUser form  SettingsPage: ", fullUser);

  //max-w-[600px] lg:w-[600px]
  return <SettingsClientInter fullUser={fullUser} />;
};

export default SettingsPage;
