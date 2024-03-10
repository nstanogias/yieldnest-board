import React from "react";
import ConnectButton from "./ConnectButton";

export const Navbar = () => {
  return (
    <div className="flex justify-between p-6">
      <span className="text-[26px] font-medium text-blue-400">YieldNest</span>
      <ConnectButton />
    </div>
  );
};
