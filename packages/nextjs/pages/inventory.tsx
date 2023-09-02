import type { NextPage } from "next";
import Image from "next/image"; // import Next's Image component for efficient image rendering
import { MetaHeader } from "~~/components/MetaHeader";
import inventoryData from "~~/components/inventory/inventoryData.json";

const Inventory: NextPage = () => {
  return (
      <>
        <MetaHeader
            title="G.O.A.T | Nft Inventory"
            description="Available Nfts for you."
        >
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
        </MetaHeader>
        <div className="flex flex-wrap p-4" data-theme="">
          {inventoryData.map((nft, index) => (
              <div key={index} className="nft-tile m-2 border rounded-lg flex flex-col p-4 w-64">
                <div className="flex justify-between">
                  <div className="flex-grow">
                    <div className="font-bold mb-1">{nft.oracleDisplayName}</div>
                    <div className="mb-2">{nft.dataFeedDisplayName}</div>
                    <div className="text-sm text-gray-500">Rented to: {nft.rentedTo}</div>
                  </div>
                  <div className="ml-2">
                    {nft.locked ? (
                        <Image className="lock-icon" src="/assets/locked.svg" alt="Locked" width={20} height={20} />
                    ) : (
                        <Image className="lock-icon" src="/assets/unlocked.svg" alt="Unlocked" width={20} height={20} />
                    )}
                  </div>
                </div>
                <div className="flex-grow mt-2">
                  {(
                      <Image
                          src={nft.imgSrc && nft.imgSrc!=""?nft.imgSrc:"/assets/nameless.png"}
                          alt="NFT"
                          layout="responsive"
                          width={300}
                          height={240}
                          className="rounded"
                      />
                  )}
                </div>
              </div>
          ))}
        </div>
      </>
  );
};

export default Inventory;