import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

interface Props {
  label: string;
}

const Header = ({ label }: Props) => {
  return (
    <div className=" flex flex-col items-center justify-center">
      <h1 className={cn(" text-3xl font-semibold ")}>STORE</h1>
      <p className=" text-muted-foreground text-sm"> {label}</p>
    </div>
  );
};

export default Header;
