import { useState, useCallback } from 'react';
import type { NextPage } from 'next';
import { MetaHeader } from '~~/components/MetaHeader';
import oracleData from '~~/components/oracles/oracleData.json';
import moment from 'moment';

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
          <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
        </MetaHeader>
        <div data-theme="oracles">
          <div className="container mx-auto p-8">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-4 border-b-2">Provider</th>
                  <th className="p-4 border-b-2">Feed Name</th>
                  <th className="p-4 border-b-2">Price</th>
                  <th className="p-4 border-b-2">Last Updated</th>
                  <th className="p-4 border-b-2">Address</th>
                  <th className="p-4 border-b-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {oracleData.map((oracle, index) => (
                    oracle.feeds.map((feed, fIndex) => (
                        <tr key={`${index}-${fIndex}`}>
                          <td className={`p-4 border-b-2 ${oracle.cssClass}`}>
                            <div className="p-2 rounded-lg">
                              {oracle.displayName}
                            </div>
                          </td>
                          <td className="p-4 border-b-2">{feed.displayName} ({feed.currentFeedPrice})</td>
                          <td className="p-4 border-b-2">{feed.displayMintPrice}</td>
                          <td className="p-4 border-b-2">
                            {moment(feed.lastUpdatedLong).fromNow()}
                          </td>
                          <td className="p-4 border-b-2">{feed.address}</td>
                          <td className="p-4 border-b-2 flex justify-between">
                            <button onClick={doMint} className="btn btn-accent w-1/2 mr-2">Mint</button>
                            <button onClick={doRent} className="btn btn-secondary w-1/2" disabled>
                              Rent
                              <span className="tooltip ml-2" data-tip="Minimal design - will work in future">?</span>
                            </button>
                          </td>
                        </tr>
                    ))
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
  );
}

export default Oracles;