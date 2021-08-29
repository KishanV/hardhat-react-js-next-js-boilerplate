import { ethers } from "hardhat";

async function main() {
  const TokenFactory = await ethers.getContractFactory("TokenFactory");
  const tokenFactory = await TokenFactory.deploy();
  await tokenFactory.deployed();

  (await tokenFactory.createToken("Kishan Devani", "KD")).wait();
  (await tokenFactory.createNft("My Nft", "MN")).wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
