import { GOAT } from "../typechain-types";
import { readFile } from "fs/promises";
import { task } from "hardhat/config";

export enum OracleProvider {
  Chronicle,
  Chainlink,
  Redstone,
}

export type OracleProviderName = "Chronicle" | "Chainlink" | "Redstone";

export const OracleProviderNames: Record<OracleProviderName, OracleProvider> = {
  Chronicle: OracleProvider.Chronicle,
  Chainlink: OracleProvider.Chainlink,
  Redstone: OracleProvider.Redstone,
};

export type OracleConfig = {
  provider: string;
  feeds: string[];
};

task("deploy-goat", "Deploy the GOAT")
  .addParam("oracleConfig", "Path to oracle configuration json file")
  .setAction(async ({ oracleConfig }, { ethers }) => {
    const GOATFactory = await ethers.getContractFactory("GOAT");
    const GOAT = (await GOATFactory.deploy()) as GOAT;
    await GOAT.deployed();

    console.log(`Deployed GOAT at ${GOAT.address}`);

    // read config file
    const oracleConfigRaw = (await readFile(oracleConfig)).toString();
    const oracleConfigJson = JSON.parse(oracleConfigRaw) as OracleConfig[];

    // add oracles to the GOAT
    for (const { provider, feeds } of oracleConfigJson) {
      const oracleProvider = OracleProviderNames[provider as OracleProviderName];
      if (oracleProvider === undefined) {
        throw new Error(`Unknown oracle provider ${provider}`);
      }

      const tx = await GOAT.addOracles(oracleProvider, feeds);
      await tx.wait();

      const providerOracles = await GOAT.providerOracles(oracleProvider);
      console.log(`Added oracles for provider ${provider}:`, providerOracles);
    }
  });
