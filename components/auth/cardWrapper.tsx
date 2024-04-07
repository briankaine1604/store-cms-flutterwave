import { Card, CardHeader, CardFooter, CardContent } from "../ui/card";
import { Backbutton } from "./backbutton";
import Header from "./header";
import { Social } from "./social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="sm:w-[400px] px-3 sm:px-0 shadow">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <Backbutton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
