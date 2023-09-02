import { GOAT } from "../typechain-types";
import { task } from "hardhat/config";

task("mint", "Mint a GOAT")
  .addParam("goat", "Address of the GOAT contract")
  .addParam("oracleProvider", "ID of the oracle provider")
  .addParam("oracle", "Address of the oracle")
  .setAction(async ({ goat, oracleProvider, oracle }, { ethers }) => {
    const deployer = (await ethers.getSigners())[0];
    const GOAT = (await ethers.getContractAt("GOAT", goat)) as GOAT;
    const mintPrice = await GOAT.PRICE_PER_TOKEN();

    const tx = await GOAT.mintGOAT(
      deployer.address,
      [
        {
          oracle: oracle,
          providerId: oracleProvider,
        },
      ],
      { value: mintPrice },
    );
    const receipt = await tx.wait();

    console.log(receipt.events?.filter(x => x.event === "GOATsMinted"));
  });
