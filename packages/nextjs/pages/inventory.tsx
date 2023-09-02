import { useState } from "react";
import { abi as GOATabi } from "~~/generated/GOAT.json";
import { GOAT_ADDRESS } from "./oracles";
import moment from "moment";
import { NextPage } from "next";
import { useContractWrite } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import NftCard from "~~/components/NftCard";
import inventoryData from "~~/components/inventory/inventoryData.json";

export type NFTInfo = {
  oracleDisplayName: string;
  dataFeedDisplayName: string;
  imgSrc: string;
  rentedTo: string;
  locked: boolean;
  tokenId: number;
  lockedUntil: number;
};

const Inventory: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [contractAddress, setContractAddress] = useState("");
  const [currentTokenId, setCurrentTokenId] = useState<undefined | number>();
  const { write: setUser } = useContractWrite({
    abi: GOATabi,
    address: GOAT_ADDRESS,
    functionName: "setUser",
  });

  const handleProceed = e => {
    setUser({
      args: [currentTokenId, contractAddress, 184467440737095],
    });
  };
  const handleInputChange = e => {
    setContractAddress(e.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setContractAddress(""); // Resetting the contractAddress state
  };

  const isValidAddress = () => {
    // checks if the string starts with "0x" and followed by at least one character
    // console.log(contractAddress + ' ' + /^0x.+/.test(contractAddress))
    return contractAddress.length == 42 && /^0x.+/.test(contractAddress);
  };
  const handleNftClick = (nft: NFTInfo) => {
    setCurrentTokenId(nft.tokenId);
    console.log("tokenId", currentTokenId);

    if (nft.locked) {
      const now = moment();
      const lockedUntil = moment(nft.lockedUntil);
      const duration = moment.duration(lockedUntil.diff(now));

      if (duration.asMilliseconds() > 0) {
        const humanReadableDuration = duration.humanize();

        setModalContent({
          title: "NFT Locked",
          message: `You cannot unlock this NFT because it is rented until ${lockedUntil.format(
            "LLL",
          )}. Time remaining: ${humanReadableDuration}.`,
        });
      } else {
        // for presentation purpose
        console.error("Incorrect lockedUntil data for NFT:", nft);

        const absoluteDuration = moment.duration(Math.abs(duration.asMilliseconds()));
        const humanReadableDuration = absoluteDuration.humanize();

        setModalContent({
          title: "NFT Locked",
          message: `You cannot unlock this NFT because it is rented until ${lockedUntil.format(
            "LLL",
          )}. Time elapsed: ${humanReadableDuration}.`,
        });
      }
    } else {
      setModalContent({
        title: "Use NFT",
        message: `Use this NFT for oracle feed. Provide smart contract address that will use this nft to have access to oracle ${nft.oracleDisplayName} with feed data ${nft.dataFeedDisplayName}`,
        isUnlocked: true,
      });
    }
    setShowModal(true);
  };

  return (
    <>
      <MetaHeader title="G.O.A.T | Nft Inventory" description="Available Nfts for you.">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="flex flex-wrap p-4">
        {inventoryData.map((nft, index) => (
          <NftCard key={index} nft={nft} handleNftClick={handleNftClick} />
        ))}
      </div>
      {showModal && (
        <Modal
          content={modalContent}
          onClose={handleCloseModal}
          isValidAddress={isValidAddress}
          handleInputChange={handleInputChange}
          handleProceed={handleProceed}
        />
      )}
    </>
  );
};

function Modal({ content, onClose, isValidAddress, handleInputChange, handleProceed }: any) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="modal-content">
        <h2 className={content.isUnlocked ? "text-use-nft modal-title" : "text-nft-locked modal-title"}>
          {content.title}
        </h2>
        <p className="modal-message text-black">{content.message}</p>

        {content.isUnlocked ? (
          <input
            type="text"
            placeholder="Enter Smart Contract"
            className="input-field-smart-contract"
            onChange={handleInputChange}
          />
        ) : null}

        {content.isUnlocked && (
          <button className="btn-proceed" disabled={!isValidAddress()} onClick={handleProceed}>
            Use
          </button>
        )}
        <button onClick={onClose} className="btn-close">
          Close
        </button>
      </div>
    </div>
  );
}

export default Inventory;
