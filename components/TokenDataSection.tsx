"use client";

import { useWeb3 } from "@/context/Web3InfoProvider";
import { ynETHContractAddress, ynETHContractABI } from "@/contract";
import useTokenData from "@/hooks/useTokenData";
import InfoCard from "./InfoCard";

export const TokenDataSection = () => {
  const { address } = useWeb3();
  const {
    tokenAddress,
    tokenName,
    tokenDecimals,
    tokenSupply,
    userBalance,
    symbol,
  } = useTokenData(
    ynETHContractAddress,
    ynETHContractABI,
    address ?? `0x${""}`
  );

  console.log("address :", tokenAddress);
  console.log(tokenName);
  console.log(tokenDecimals);
  console.log(tokenSupply);
  console.log(userBalance);
  console.log(symbol);

  return (
    <section className="flex flex-col mt-8">
      <div className="flex flex-col md:flex-row gap-[24px]">
        <InfoCard title="Token Symbol" content={symbol} />
        <InfoCard title="Token Name" content={tokenName} />
        <InfoCard title="Token Decimals" content={tokenDecimals} />
      </div>
      <div className="mt-3 flex gap-2">
        <span className="font-semibold">User Balance</span>
        <span>{userBalance.toString()}</span>
      </div>
      <div className="mt-3 flex gap-2">
        <span className="font-semibold">Total Supply</span>
        <span>{tokenSupply.toString()}</span>
      </div>
    </section>
  );
};
