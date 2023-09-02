import { GOAT } from "../typechain-types";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("goat", function () {
  // We define a fixture to reuse the same setup in every test.

  let owner: string;
  let goat: GOAT;
  before(async () => {
    owner = (await ethers.getSigners())[0].address;
    const goatFactory = await ethers.getContractFactory("GOAT");
    goat = (await goatFactory.deploy()) as GOAT;
    await goat.deployed();
  });

  describe("Deployment", function () {
    it("Should have the right message on deploy", async function () {
      expect(await goat.symbol()).to.equal("GOAT");
    });
  });

  describe("mintGOAT", function () {
    const oracleAddress = "0x1122334455667788990011223344556677889900";

    beforeEach(async () => {
      await goat.addOracles(0, [oracleAddress]);
    });

    it("Should mint a GOAT", async function () {
      await goat.mintGOAT(
        owner,
        [
          {
            oracle: oracleAddress,
            providerId: 0,
          },
        ],
        { value: ethers.utils.parseEther("0.01") },
      );
    });
  });
});
