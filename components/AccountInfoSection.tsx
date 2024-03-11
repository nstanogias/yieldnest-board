"use client";

import { useWeb3 } from "@/context/Web3InfoProvider";

const AccountInfoSection = () => {
  const { address } = useWeb3();
  return (
    <section>
      <span>Your address: {address}</span>
    </section>
  );
};

export default AccountInfoSection;
