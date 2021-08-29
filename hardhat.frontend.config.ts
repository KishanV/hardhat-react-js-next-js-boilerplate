import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";
import "@typechain/hardhat";
import "@symfoni/hardhat-react";
import Config from "./hardhat.config";

const config: HardhatUserConfig = {
  ...Config,
  react: {
    providerPriority: ["web3modal", "hardhat"],
  },
  namedAccounts: {
    deployer: 0,
  },
  paths: {
    deployments: "frontend/src/hardhat/deployments",
  },
  typechain: {
    outDir: "frontend/src/hardhat/types",
    target: "ethers-v5",
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: ["externalArtifacts/*.json"], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  },
};
export default config;
