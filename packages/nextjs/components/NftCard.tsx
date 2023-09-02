import React from "react";
import Image from "next/image";
import { abi as GOATabi } from "../../hardhat/artifacts/contracts/GOAT.sol/GOAT.json";
import { GOAT_ADDRESS } from "../pages/oracles";
import { useContractRead } from "wagmi";

type NftCardProps = {
  nft: {
    oracleDisplayName: string;
    dataFeedDisplayName: string;
    imgSrc: string;
    rentedTo: string;
    locked: boolean;
    tokenId: number;
    lockedUntil: number;
  };
  handleNftClick: (nft: any) => void;
};

const NftCard = ({ nft, handleNftClick }: NftCardProps) => {
  const { data: locked } = useContractRead({
    abi: GOATabi,
    address: GOAT_ADDRESS,
    functionName: "locked",
    args: [nft.tokenId],
  });

  return (
    <div className="nft-tile m-2 border rounded-lg flex flex-col p-4 w-64">
      <div className="flex justify-between">
        <div className="flex-grow">
          <div className="font-bold mb-1">{nft.oracleDisplayName}</div>
          <div className="mb-2">{nft.dataFeedDisplayName}</div>
          <div className="text-sm text-gray-500">Rented to: {nft.rentedTo}</div>
        </div>
        <div className="ml-2">
          {locked ? (
            <Image src="/assets/locked.svg" alt="Locked" width={20} height={20} />
          ) : (
            <Image src="/assets/unlocked.svg" alt="Unlocked" width={20} height={20} />
          )}
        </div>
      </div>
      <div className="flex-grow mt-2" onClick={() => handleNftClick(nft)}>
        <Image
          src={nft.imgSrc && nft.imgSrc !== "" ? nft.imgSrc : "/assets/nameless.png"}
          alt="NFT"
          layout="responsive"
          width={300}
          height={240}
          className="rounded"
        />
      </div>
    </div>
  );
};

export default NftCard;
