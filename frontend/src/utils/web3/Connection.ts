import Web3 from "web3";
import { UserPreferencesController } from "../../reducers/user-preferences";

export async function checkWeb3Connection(reduxDispatch: any, web3?: Web3) {
  return new Promise((resolve) => {
    if (web3 === undefined) {
      reduxDispatch(
        UserPreferencesController.setData({
          showWeb3Model: true,
          web3ModelPromise: resolve,
        })
      );
    } else {
      resolve(undefined);
    }
  });
}

export async function getWeb3NetworkUrl(web3: Web3) {
  const networkId = await web3.eth.net.getId();
  const listOfNetwork: { [index: string]: string } = {
    "1": "",
    "3": "ropsten",
    "42": "kovan",
  };
  return `https://${listOfNetwork[networkId.toString()]}.etherscan.io`;
}
