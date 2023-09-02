import { task } from "hardhat/config";

task("kiss", "Get kissed by a Chronicle")
  .addParam("kisser", "Address of the kisser contract")
  .addParam("contract", "Contract address to get kissed")
  .setAction(async ({ kisser, contract }, { ethers }) => {
    const Kisser = await ethers.getContractAt("ISelfKisser", kisser);
    const oracles = await Kisser["oracles()"]();

    for (let i = 0; i < oracles.length; i++) {
      await Kisser["selfKiss(address,address)"](oracles[i], contract);

      console.log(`Kissed ${contract} with oracle ${oracles[i]}`);
    }
  });
