"use client";

import { useEffect, useState } from "react";
import { readContracts } from "@wagmi/core";
import { config } from "../lib/config";
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
    const tokenContract = {
      address,
      abi,
    } as const;
    const fetchTokenData = async () => {
      try {
        const result = await readContracts(config, {
          contracts: [
            {
              ...tokenContract,
              functionName: "name",
            },
            {
              ...tokenContract,
              functionName: "symbol",
            },
            {
              ...tokenContract,
              functionName: "decimals",
              args: [69],
            },
            {
              ...tokenContract,
              functionName: "totalSupply",
            },
            {
              ...tokenContract,
              functionName: "balanceOf",
              args: [account],
            },
          ],
        });
        console.log(result);

        setTokenData({
          tokenAddress: address,
          tokenName: result[0].result as string,
          symbol: result[1].result as string,
          tokenSupply: result[3].result as BigInt,
          userBalance: result[4].result as BigInt,
          tokenDecimals: result[2].result as number,
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
