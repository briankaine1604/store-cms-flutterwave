import { Card, CardFooter, CardHeader } from "../ui/card";
import { Backbutton } from "./backbutton";
import Header from "./header";

export const ErrorCard = () => {
  return (
    <Card className="px-3 md:px-0 md:w-[400px] shadow-md">
      <CardHeader>
        <Header label="Oops something went wrong!" />
      </CardHeader>
      <CardFooter>
        <Backbutton label="Back to login" href="/auth/login" />
      </CardFooter>
    </Card>
  );
};
