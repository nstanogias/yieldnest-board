"use client";

import { useWeb3 } from "@/context/Web3InfoProvider";
import React from "react";

const AccountInfoSection = () => {
  const { isActive, address } = useWeb3();
  return <section>{isActive && <span>Your address: {address}</span>}</section>;
};

export default AccountInfoSection;
