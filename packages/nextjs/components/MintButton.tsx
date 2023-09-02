import React from "react";
import { abi as GOATabi } from "../../hardhat/artifacts/contracts/GOAT.sol/GOAT.json";
import { parseEther } from "viem";
import { useAccount, useContractWrite } from "wagmi";
import { GOAT_ADDRESS } from "~~/pages/oracles";

type MintButtonProps = {
  oracleAddress: string;
  providerId: number;
};

const MintButton = ({ oracleAddress, providerId }: MintButtonProps) => {
  const account = useAccount();
  const { isLoading, write: mintGoat } = useContractWrite({
    abi: GOATabi,
    address: GOAT_ADDRESS,
    functionName: "mintGOAT",
  });

  return (
    <div>
      {isLoading ? (
        <div className="loading loading-spinner loading-xs" />
      ) : (
        <button
          onClick={() =>
            mintGoat({
              args: [
                account.address,
                [
                  {
                    oracle: oracleAddress,
                    providerId: providerId,
                  },
                ],
              ],
              value: parseEther("0.01"),
            })
          }
          className="btn btn-accent w-full relative mr-2"
        >
          Mint
        </button>
      )}
    </div>
  );
};

export default MintButton;
