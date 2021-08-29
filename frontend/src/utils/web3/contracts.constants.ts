import ComplianceOracleJson from "../../sc-build/contracts/ComplianceOracle.json";
import TokenCreationServiceJson from "../../sc-build/contracts/TokenCreationService.json";
import TokensFactoryJson from "../../sc-build/contracts/TokensFactory.json";
import RulesEngineJson from "../../sc-build/contracts/RulesEngine.json";
import AssetComposerBasicSetupJson from "../../sc-build/custom-scripts-output/asset-composer-basic-setup.json";
import LoanWithCollateralJson from "../../sc-build/contracts/LoanWithCollateral.json";

//export const NODE_URL = "http://localhost:8545";
export const NODE_URL =
  "https://kovan.infura.io/v3/56a5bd83884d4563955150cd2d0f6481";

export const FIRST_BLOCK = 0;
export const NETWORK = "42";

export const UtilsContractInfo = {
  MULTI_TOTAL_SUPPLY: "0xC1BbE8ce957446436C2942d13AA0f2D89B395134",
};

export const LoanWithCollateralInfo = {
  ADDRESS: LoanWithCollateralJson.networks[NETWORK].address,
};

export const RulesEngineInfo = {
  ADDRESS: RulesEngineJson.networks[NETWORK].address,
};

export const FundLogicInfo = {
  ADDRESS: AssetComposerBasicSetupJson.FundAssetLogic,
};

export const PamAssetInfo = {
  DATA_KEYS: {
    loanProviderSet: "LoanProviderSet",
  },
  ADDRESS: AssetComposerBasicSetupJson.PAMAssetLogic,
};

export const AssetLogicInfo = {
  ADDRESS: PamAssetInfo.ADDRESS,
};

export const TokenCreationInfo = {
  ADDRESS: TokenCreationServiceJson.networks[NETWORK].address,
};

export const TokenRegistryInfo = {
  ADDRESS: TokensFactoryJson.networks[NETWORK].address,
  TOPICS: [
    "0x9ea4e668c607333f34fed3978610ec771a6ea827f7530bb7628e4717b7c1a447",
  ],
  STARTING_BLOCK: FIRST_BLOCK,
  METHODS: {
    getName: "0x06fdde03",
    getSymbol: "0x95d89b41",
    getDecimal: "0x313ce567",
    getTotalSupply: "0x18160ddd",
    getTokenStandard: "0xcc2d4da3",
  },
  DATA_KEY: "token-manager",
};

export const ComplianceOracleInfo = {
  ADDRESS: ComplianceOracleJson.networks[NETWORK].address,
  TOPICS: [
    "0xd2dee4b1ae6992ab37a4dd03ec949dcfc25299007bf2f9de83a220adb4b59eea",
  ],
  STARTING_BLOCK: TokenRegistryInfo.STARTING_BLOCK,
  DATA_KEY: "attributes",
};

export const ClassesRegistryInfo = {
  ADDRESS: ComplianceOracleInfo.ADDRESS,
  TOPICS: [
    "0x717fa3fa8dfbc7d3f06c71881c1f132084e7061a18cabb9fbdfe1ad15368b106",
  ],
  STARTING_BLOCK: ComplianceOracleInfo.STARTING_BLOCK,
  DATA_KEY: "classes",
};

export const AssetRegistryInfo = {
  ADDRESS: AssetComposerBasicSetupJson.assetRegistry,
  TOPICS: [
    "0xc199bb0cbd4777e53fa61e6ae8f7df4cdcd7a5b039332746bcbcfe1fc948e42f",
  ],
  STARTING_BLOCK: FIRST_BLOCK,
  METHODS: {
    getAssetName: "0x24fc099b",
    getAssetDescription: "0xcd73cd9e",
    getAssetClassId: "0x4f14f434",
  },
  DATA_KEY: "asset-registry-manager",
};

export const TokenRequestInfo = {
  ADDRESS: AssetRegistryInfo.ADDRESS,
  TOPICS: [
    "0x863508c53e75eb3f830181f87ec856cc14d7b18db8eddc61037d23e54d48379c",
  ],
  STARTING_BLOCK: AssetRegistryInfo.STARTING_BLOCK,
  DATA_KEY: "token-request-info",
};

export const TokenApprovedRequestInfo = {
  ADDRESS: AssetRegistryInfo.ADDRESS,
  TOPICS: [
    "0x85e1543bf2f84fe80c6badbce3648c8539ad1df4d2b3d822938ca0538be727e6",
  ],
  STARTING_BLOCK: AssetRegistryInfo.STARTING_BLOCK,
  DATA_KEY: "approved-token-request-info",
};

export const AssetClassRegistryInfo = {
  ADDRESS: AssetComposerBasicSetupJson.assetClassRegistry,
  TOPICS: [
    "0x0bb3f007ea892c3ba0521e9827e63df6df841a426f4bf11cbdb284c502cf2f1e",
  ],
  STARTING_BLOCK: FIRST_BLOCK,
  METHODS: {
    getClassName: "0x3ddfbd8b",
    getClassLogicId: "0xce8d8ed7",
    getClassDescription: "0x31bcb9d8",
  },
  DATA_KEY: "class-registry-manager",
};

export const LogicContractRegistryInfo = {
  ADDRESS: AssetComposerBasicSetupJson.assetLogicRegistry,
  TOPICS: [
    "0x9138461e1e7bfd0132bad13e18f46ece84c197ed0ee8f52e8b130f468f11d7ca",
  ],
  STARTING_BLOCK: FIRST_BLOCK,
  METHODS: {
    getLogicOwne: "0xb988843a",
    getLogicAddress: "0x2a54d13d",
    getLogicName: "0x8098a574",
    getLogicDescription: "0xaea518e3",
    getLogicApproval: "0x52666ac2",
  },
  DATA_KEY: "logic-registry-manager",
};
