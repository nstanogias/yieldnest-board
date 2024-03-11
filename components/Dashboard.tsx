"use client";

import { useWeb3 } from "@/context/Web3InfoProvider";
import AccountInfoSection from "./AccountInfoSection";
import { TokenDataSection } from "./TokenDataSection";
import DepositForm from "./DepositForm";

const Dashboard = () => {
  const { isActive } = useWeb3();

  return (
    <main className="flex flex-col items-center p-24">
      {isActive && (
        <>
          <AccountInfoSection />
          <TokenDataSection />
          <DepositForm />
        </>
      )}
    </main>
  );
};

export default Dashboard;
