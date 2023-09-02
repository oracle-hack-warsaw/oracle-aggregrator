import { NextPage } from "next";
import Image from "next/image";
import { MetaHeader } from "~~/components/MetaHeader";
import inventoryData from "~~/components/inventory/inventoryData.json";
import { useState } from 'react';
import moment from 'moment';

const Inventory: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [contractAddress, setContractAddress] = useState('');
  const handleProceed = (e) => {
    alert('now proceed to metamask')
  };
  const handleInputChange = (e) => {
    setContractAddress(e.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setContractAddress(''); // Resetting the contractAddress state
  };

  const isValidAddress = () => {
    // checks if the string starts with "0x" and followed by at least one character
    // console.log(contractAddress + ' ' + /^0x.+/.test(contractAddress))
    return /^0x.+/.test(contractAddress);
  };
  const handleNftClick = (nft) => {
    if (nft.locked) {
      const now = moment();
      const lockedUntil = moment(nft.lockedUntil);
      const duration = moment.duration(lockedUntil.diff(now));

      if (duration.asMilliseconds() > 0) {
        const minutesRemaining = duration.asMinutes();
        const humanReadableDuration = duration.humanize();

        setModalContent({
          title: 'NFT Locked',
          message: `You cannot unlock this NFT because it is rented until ${lockedUntil.format('LLL')}. Time remaining: ${humanReadableDuration}.`,
        });
      } else {
        setModalContent({
          title: 'Error',
          message: 'Something went wrong with this NFT.',
        });
      }
    } else {
      setModalContent({
        title: 'Use NFT',
        message: `Use this NFT for oracle feed. Provide smart contract address that will use this nft to have access to oracle ${nft.oracleDisplayName} with feed data ${nft.dataFeedDisplayName}`,
        isUnlocked: true
      });
    }
    setShowModal(true);
  };

  return (
      <>
        <MetaHeader
            title="G.O.A.T | Nft Inventory"
            description="Available Nfts for you."
        >
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
        </MetaHeader>
        <div className="flex flex-wrap p-4">
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
          ))}
        </div>
        {showModal &&
            <Modal
                content={modalContent}
                onClose={handleCloseModal}
                isValidAddress={isValidAddress}
                handleInputChange={handleInputChange}
                handleProceed={handleProceed}
            />}
      </>
  );
};

function Modal({ content, onClose, isValidAddress, handleInputChange, handleProceed}) {
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

          {content.isUnlocked &&
              <button className="btn-proceed" disabled={!isValidAddress()} onClick={handleProceed}>Proceed</button>
          }
          <button onClick={onClose} className="btn-close">Close</button>
        </div>
      </div>
  );
}

export default Inventory;