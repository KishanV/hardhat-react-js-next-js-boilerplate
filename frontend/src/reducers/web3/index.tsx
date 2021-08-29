import Web3 from "web3";

export type Web3Model = {
  account?: string;
  web3?: Web3;
  chainId?: number;
  eth?: number;
};

export const Web3Data = {
  Set: "Web3_Data_Set",
};

export type Web3State = Web3Model;

export class Web3Controller {
  static value: Web3State = {};

  static reducer(state = Web3Controller.value, action: any = undefined) {
    if (action && action.type === Web3Data.Set) {
      state = {
        ...state,
        ...action.data,
      };
    }
    return state;
  }

  static setData(data?: Web3Model) {
    return {
      type: Web3Data.Set,
      data,
    };
  }
}
