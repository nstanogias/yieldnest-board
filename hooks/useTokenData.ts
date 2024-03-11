"use client";

import { useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import { config } from "@/lib/config";
import { Abi } from "viem";

type TokenData = {
  tokenAddress: string;
  tokenName: string;
  symbol: string;
  tokenSupply: BigInt;
  userBalance: BigInt;
  tokenDecimals: number;
};

const initialTokenData: TokenData = {
  tokenAddress: "",
  tokenName: "",
  symbol: "",
  tokenSupply: BigInt(0),
  userBalance: BigInt(0),
  tokenDecimals: 0,
};

const useTokenData = (
  address: `0x${string}`,
  abi: Abi,
  account: `0x${string}`
) => {
  const [tokenData, setTokenData] = useState<TokenData>(initialTokenData);

  useEffect(() => {
    if (!address || !abi) return;
    const fetchTokenData = async () => {
      try {
        const tokenName = await readContract(config, {
          address,
          abi,
          functionName: "name",
        });
        const symbol = await readContract(config, {
          address,
          abi,
          functionName: "symbol",
        });
        const totalSupply = await readContract(config, {
          address,
          abi,
          functionName: "totalSupply",
        });
        const userBalance = await readContract(config, {
          address,
          abi,
          functionName: "balanceOf",
          args: [account],
        });
        const decimals = await readContract(config, {
          address,
          abi,
          functionName: "decimals",
        });
        setTokenData({
          tokenAddress: address,
          tokenName: tokenName as string,
          symbol: symbol as string,
          tokenSupply: totalSupply as BigInt,
          userBalance: userBalance as BigInt,
          tokenDecimals: decimals as number,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchTokenData();
  }, [address, abi, account]);

  return {
    ...tokenData,
  };
};

export default useTokenData;
