import { UserInfo } from "@/components/userInfo";
import { currentUser } from "@/hooks/use-current-user-server";

const ServerPage = async () => {
  const user = await currentUser();
  return <UserInfo label="💻 Server Component" user={user} />;
};

export default ServerPage;
