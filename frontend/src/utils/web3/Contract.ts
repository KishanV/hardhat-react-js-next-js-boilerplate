import Web3 from "web3";
import { Contract as Web3Contract } from "web3-eth-contract";
import { NODE_URL } from "./contracts.constants";
import ICATF20Token from "../../sc-build/contracts/ICATF20Token.json";
import { savePendingTransaction } from "../../utils/transaction-status";

type Props = {
  web3?: Web3;
  account?: string;
  provider?: string;
  address: string;
  abiObject: any;
};

export class Contract {
  singed: Web3Contract;
  direct: Web3Contract;
  props: Props;
  web3: Web3;

  constructor(props: Props) {
    this.props = props;
    if (props.web3) {
      this.web3 = props.web3;
      props.web3.eth.defaultAccount = props.account as any;
      this.singed = new props.web3.eth.Contract(
        props.abiObject.abi,
        props.address
      );
      this.direct = new props.web3.eth.Contract(
        props.abiObject.abi,
        props.address
      );
    } else {
      const provider =
        (window as any).web3?.currentProvider ||
        new Web3.providers.HttpProvider(props.provider || NODE_URL);
      const web3 = (this.web3 = new Web3(provider));
      this.direct = this.singed = new web3.eth.Contract(
        props.abiObject.abi,
        props.address
      );
    }
  }

  async estimateGas(method: any) {
    const methodName = method._method.name;
    const clonedMethod = this.direct.methods[methodName](...method.arguments);
    let estimatedGas: any = null;
    let callError: any = null;
    try {
      estimatedGas = await clonedMethod.estimateGas({
        from: this.props.account,
      });
    } catch {
      try {
        await clonedMethod.call({
          from: this.props.account,
        });
      } catch (error) {
        callError = error;
      }
    }

    if (callError && callError.data) {
      console.log(method, callError.data);
      throw Error(
        Web3.utils
          .hexToAscii(
            `0x${(callError.data.split("0x")[1] as string).substr(6)}`
          )
          .trim()
      );
    }

    if (callError) {
      console.log(method);
      console.log(method, callError);
      throw callError;
    }

    console.log("estimatedGas", estimatedGas);
    return estimatedGas;
  }

  async send(
    method: any,
    monitor?: {
      type: string;
      event?: string;
      title: string;
      needReceipt?: boolean;
      remember?: { [index: string]: any };
      onReceiptGenerated?: () => void;
    },
    afterEstimatedGas?: (number: number) => void
  ) {
    const estimatedGas = await this.estimateGas(method);
    if (afterEstimatedGas) afterEstimatedGas(estimatedGas);
    const result = method.send({
      from: this.props.account,
      gas: Web3.utils.toBN(
        parseInt((estimatedGas * 1.3).toString()).toString()
      ),
    });

    return new Promise<void>(async (resolve) => {
      result.on("transactionHash", async (hash: string) => {
        if (monitor?.needReceipt !== true) {
          resolve();
        }
        if (monitor)
          savePendingTransaction(
            monitor.type,
            monitor.title,
            hash,
            monitor.event,
            monitor.remember
          );
      });
      if (monitor?.needReceipt) {
        resolve(await result);
      } else {
        resolve();
      }
    });
  }
}

export function createCAT20FContract(
  address: string,
  web3?: Web3,
  account?: string
) {
  return new Contract(
    web3
      ? {
          web3,
          abiObject: ICATF20Token,
          address: address,
          account,
        }
      : {
          provider: NODE_URL,
          abiObject: ICATF20Token,
          address: address,
        }
  );
}
