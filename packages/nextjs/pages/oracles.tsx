import { useState, useCallback } from 'react';
import type { NextPage } from 'next';
import { MetaHeader } from '~~/components/MetaHeader';
import oracleData from '~~/components/oracles/oracleData.json';

const Oracles: NextPage = () => {
  const doMint = useCallback(() => {
    // Placeholder for minting logic
  }, []);

  const doRent = useCallback(() => {
    // Placeholder for renting logic
  }, []);

  return (
      <>
        <MetaHeader title="G.O.A.T | Oracles" description="Available Oracles.">
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
              href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap"
              rel="stylesheet"
          />
        </MetaHeader>
        <div data-theme="oracles">
          <div className="container mx-auto p-8">
            {oracleData.map((oracle, index) => (
                <div key={index} className="mb-4 p-4 border-b-2 border-accent">
                  <div className="bg-primary text-primary-content p-4 rounded-lg mb-4">
                    {oracle.displayName}
                  </div>
                  {oracle.feeds.map((feed, fIndex) => (
                      <div
                          key={fIndex}
                          className="mb-4 p-4 rounded-lg border-2 border-neutral bg-neutral"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="bg-info p-2 rounded-lg">
                            {feed.displayPrice}
                          </div>
                          <button onClick={doMint} className="btn btn-accent">
                            Mint
                          </button>
                          <button onClick={doRent} className="btn btn-secondary" disabled>
                            Rent
                            <span className="tooltip ml-2" data-tip="Minimal design - will work in future">?</span>
                          </button>
                        </div>
                        <p className="text-neutral-content">{feed.displayName}</p>
                        <p className="text-base-content">Address: {feed.address}</p>
                      </div>
                  ))}
                </div>
            ))}
          </div>
        </div>
      </>
  );
};

export default Oracles;