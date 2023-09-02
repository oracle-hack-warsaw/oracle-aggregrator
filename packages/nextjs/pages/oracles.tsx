import { useCallback, useState } from "react";
import { abi as GOATabi } from "../../hardhat/artifacts/contracts/GOAT.sol/GOAT.json";
import moment from "moment";
import type { NextPage } from "next";
import { parseEther } from "viem";
import { useAccount, useContractWrite } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import oracleData from "~~/components/oracles/oracleData.json";

const GOAT_ADDRESS = "0x085039d9644736b5970ae5BeE3B1DD56D00A9f0B";

const Oracles: NextPage = () => {
  const account = useAccount();

  const { write: mintGoat } = useContractWrite({
    abi: GOATabi,
    address: GOAT_ADDRESS,
    functionName: "mintGOAT",
  });

  const doRent = useCallback(() => {
    // Placeholder for renting logic
  }, []);

  // Extract all unique feed names and oracle display names
  const allFeedNames = Array.from(new Set(oracleData.flatMap(oracle => oracle.feeds.map(feed => feed.displayName))));
  const allOracleNames = oracleData.map(oracle => oracle.displayName);

  // State to track the selected filters
  const [selectedFeeds, setSelectedFeeds] = useState<string[]>([]);
  const [selectedOracles, setSelectedOracles] = useState<string[]>([]);

  const toggleFeedFilter = (feedName: string) => {
    if (selectedFeeds.includes(feedName)) {
      setSelectedFeeds(prev => prev.filter(feed => feed !== feedName));
    } else {
      setSelectedFeeds(prev => [...prev, feedName]);
    }
  };

  const toggleOracleFilter = (oracleName: string) => {
    if (selectedOracles.includes(oracleName)) {
      setSelectedOracles(prev => prev.filter(oracle => oracle !== oracleName));
    } else {
      setSelectedOracles(prev => [...prev, oracleName]);
    }
  };
  return (
    <>
      <MetaHeader title="G.O.A.T | Oracles" description="Available Oracles.">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="container mx-auto p-8 w-full">
        {/* Oracle Filters */}
        <div className="mb-4 flex flex-wrap">
          {allOracleNames.map(oracleName => (
            <span
              key={oracleName}
              className={`cursor-pointer px-3 py-1 border rounded-lg m-1 ${
                selectedOracles.includes(oracleName) ? "bg-gray-400" : ""
              }`}
              onClick={() => toggleOracleFilter(oracleName)}
            >
              {oracleName}
            </span>
          ))}
        </div>

        {/* Feed Filters */}
        <div className="mb-4 flex flex-wrap">
          {allFeedNames.map(feedName => (
            <span
              key={feedName}
              className={`cursor-pointer px-3 py-1 border rounded-lg m-1 ${
                selectedFeeds.includes(feedName) ? "bg-gray-300" : ""
              }`}
              onClick={() => toggleFeedFilter(feedName)}
            >
              {feedName}
            </span>
          ))}
        </div>

        {/* Table */}
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="p-4 w-1/4">Oracle Provider</th>
              <th className="p-4 w-1/6">Feed</th>
              <th className="p-4 w-1/6">Last Updated</th>
              <th className="p-4 w-1/6">Mint Price</th>
              <th className="p-4 w-1/4">Action</th>
            </tr>
          </thead>
          <tbody>
            {oracleData
              .filter(oracle => selectedOracles.length === 0 || selectedOracles.includes(oracle.displayName))
              .map((oracle, oIndex) =>
                oracle.feeds
                  // Filter based on selected feeds
                  .filter(feed => selectedFeeds.length === 0 || selectedFeeds.includes(feed.displayName))
                  .map((feed, fIndex) => (
                    <tr key={`${oIndex}-${fIndex}`}>
                      <td className={`p-4 border-b-2 ${oracle.cssClass}`}>
                        <div className="p-2 rounded-lg">{oracle.displayName}</div>
                      </td>
                      <td className="p-4 border-b-2">
                        <div className="font-bold">
                          <a href={`https://sepolia.etherscan.io/address/${feed.address}`}>{feed.displayName}</a>
                        </div>
                        <div className="text-sm mt-1">{feed.currentFeedPrice}</div>
                      </td>
                      <td className="p-4 border-b-2">{moment(feed.lastUpdatedLong).fromNow()}</td>
                      <td className="p-4 border-b-2">{feed.displayMintPrice}</td>
                      <td className="p-4 border-b-2 flex justify-between items-center">
                        <button
                          onClick={() =>
                            mintGoat({
                              args: [
                                account.address,
                                [
                                  {
                                    oracle: feed.address,
                                    providerId: oracle.providerId,
                                  },
                                ],
                              ],
                              value: parseEther("0.01"),
                            })
                          }
                          className="btn btn-accent w-1/2 relative mr-2"
                        >
                          Mint
                        </button>
                        <button onClick={doRent} className="btn btn-secondary w-1/2 relative" disabled>
                          <span className="tooltip ml-2" title="Minimal design - will work in future">
                            Rent
                          </span>
                        </button>
                      </td>
                    </tr>
                  )),
              )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Oracles;
