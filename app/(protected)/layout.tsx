import React from "react";
import { Navbar } from "./_components/navbar";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="w-full flex flex-col gap-y-2 items-center justify-center bg-sky-300 py-5 px-2 min-h-screen">
      <Navbar />

      {children}
    </div>
  );
};

export default layout;
