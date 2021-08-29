import { ethers } from "hardhat";
import { expect } from "chai";

/*
describe("TokenFactory", function () {
  it("Should create new token and nft", async function () {
    const TokenFactory = await ethers.getContractFactory("TokenFactory");
    const tokenFactory = await TokenFactory.deploy();
    await tokenFactory.deployed();

    (await tokenFactory.createToken("Kishan Devani", "KD")).wait();
    (await tokenFactory.createNft("My Nft", "MN")).wait();

    const tokenEvents = await tokenFactory.queryFilter(
      tokenFactory.filters.TokenCreated()
    );

    const nftEvents = await tokenFactory.queryFilter(
      tokenFactory.filters.NftCreated()
    );

    expect(tokenEvents.length).to.equal(2);
    expect(nftEvents.length).to.equal(2);
  });
});*/
describe("Gas", async function () {
  it("Gas practice", async function () {
    const Gas = await ethers.getContractFactory("Gas");
    const gas = await Gas.deploy();
    const createTokenTx = await (await gas.createToken()).wait();
    console.log("createTokens gas", createTokenTx.gasUsed.toNumber());

    const tokenAddress = await gas.getTokenAddress();

    for (let index = 0; index < 5; index++) {
      console.log(
        "getInfoWithStorage gas",
        (
          await (await gas.getInfoWithStorage(tokenAddress)).wait()
        ).gasUsed.toNumber()
      );
      console.log(
        "getTokenInfoFromAddress gas",
        (
          await (await gas.getTokenInfoFromAddress(tokenAddress)).wait()
        ).gasUsed.toNumber()
      );
      console.log(
        "getTokenInfoFromAddress gas",
        (
          await (await gas.getInfoWithMemory(tokenAddress)).wait()
        ).gasUsed.toNumber()
      );
    }
  });
});
