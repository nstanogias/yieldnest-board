"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAccount, useChainId } from "wagmi";

interface Web3InfoContextType {
  address: `0x${string}` | undefined;
  chainId: number;
  isActive: boolean;
}

const Web3InfoContext = createContext<Web3InfoContextType | undefined>(
  undefined
);

export function Web3InfoProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  return (
    <Web3InfoContext.Provider
      value={{ address, chainId, isActive: isConnected }}
    >
      {children}
    </Web3InfoContext.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3InfoContext);

  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3InfoProvider");
  }

  return context;
}
