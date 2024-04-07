import { LoginButton } from "@/components/auth/loginbutton";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" h-full w-full">
      <div>Home page</div>
      <div>
        <LoginButton mode="modal" asChild>
          <Button variant={"secondary"} size={"lg"}>
            {" "}
            Sign in
          </Button>
        </LoginButton>
      </div>
    </div>
  );
}
