"use client";

import { useState } from "react";
import { parseEther } from "viem";
import { readContract, writeContract } from "@wagmi/core";
import { ynETHContractABI, ynETHContractAddress } from "@/contract";
import { config } from "@/lib/config";
import { useWeb3 } from "@/context/Web3InfoProvider";
import { useWriteContract } from "wagmi";

const DepositForm = () => {
  const { address } = useWeb3();
  const [numTokens, setNumTokens] = useState("");

  const { writeContract: writeContractHook } = useWriteContract();

  // const { data, write } = useWriteContract({
  //   address: ynETHContractAddress,
  //   abi: ynETHContractABI,
  //   functionName: "stake",
  //   onError(error) {
  //     setError(error.message);
  //   },
  //   onSuccess(data, variables, context) {
  //     alert("Success");
  //     setError("");
  //     fetchUserPositions();
  //   },
  // });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!numTokens || isNaN(+numTokens) || +numTokens < 0) {
      return;
    }
    try {
      const allowance = await readContract(config, {
        address: ynETHContractAddress,
        abi: ynETHContractABI,
        functionName: "allowance",
        args: [address ?? `0x${""}`, ynETHContractAddress],
      });
      console.log(allowance);
      if (allowance !== undefined && Number(BigInt(allowance)) < +numTokens) {
        const result = await writeContract(config, {
          abi: ynETHContractABI,
          address: ynETHContractAddress,
          functionName: "approve",
          args: [ynETHContractAddress, parseEther(numTokens)],
        });
        if (result) {
          setTimeout(() => {
            writeContractHook({
              address: ynETHContractAddress,
              abi: ynETHContractABI,
              functionName: "depositETH",
              args: [ynETHContractAddress],
            });
          }, 1000);
        }
      } else {
        writeContractHook({
          address: ynETHContractAddress,
          abi: ynETHContractABI,
          functionName: "depositETH",
          args: [ynETHContractAddress],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={submitHandler} className="flex flex-col mt-8">
      <label className="font-bold">Deposit ETH</label>
      <input onChange={(e) => setNumTokens(e.target.value)} />
      <button
        type="submit"
        className="text-white px-[32px] py-[12px] rounded-lg bg-blue-400 mt-4"
      >
        Deposit
      </button>
    </form>
  );
};

export default DepositForm;
