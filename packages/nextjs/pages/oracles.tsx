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
          {/* ... */}
        </MetaHeader>
        <div className="container mx-auto p-8 w-full">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="p-4">Oracle Provider</th>
                <th className="p-4">Feed</th>
                <th className="p-4">Last Updated</th>
                <th className="p-4">Address</th>
                <th className="p-4 w-1/4">Action</th>
              </tr>
            </thead>
            <tbody>
              {oracleData.map((oracle, oIndex) => (
                  oracle.feeds.map((feed, fIndex) => (
                      <tr key={`${oIndex}-${fIndex}`}>
                        <td className={`p-4 border-b-2 ${oracle.cssClass}`}>
                          <div className="p-2 rounded-lg">
                            {oracle.displayName}
                          </div>
                        </td>
                        <td className="p-4 border-b-2">
                          <div className="font-bold">{feed.displayName}</div>
                          <div className="text-sm mt-1">{feed.currentFeedPrice}</div>
                        </td>
                        <td className="p-4 border-b-2">
                          {moment(feed.lastUpdatedLong).fromNow()}
                        </td>
                        <td className="p-4 border-b-2 text-xs">{feed.address}</td>
                        <td className="p-4 border-b-2 flex justify-between items-center">
                          <button onClick={doMint} className="btn btn-accent w-1/2 relative mr-2">
                            Mint
                            <span className="absolute bottom-0 left-0 right-0 text-xs bg-opacity-70 p-1">
                              {feed.displayMintPrice}
                            </span>
                          </button>
                          <button onClick={doRent} className="btn btn-secondary w-1/2" disabled>
                            <span className="tooltip ml-2" title="Minimal design - will work in future">Rent</span>
                          </button>
                        </td>
                      </tr>
                  ))
              ))}
            </tbody>
          </table>
        </div>
      </>
  );
};

export default Oracles;