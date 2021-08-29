import { EventData } from "web3-eth-contract";
import { Transaction } from "web3-core";
import { Contract } from "./Contract";
import { App } from "../../pages/_app";

const FIRST_BLOCK = 0;

export type EventType = {
  eventData: EventData;
  transactionData: Transaction;
  timestamp: number;
  input: { [index: string]: any };
};

export async function loadEvents<T extends Object>({
  address,
  abiObject,
  eventName,
  decodeViaAbi,
  plugin,
}: {
  address: string;
  abiObject: any;
  eventName: string;
  decodeViaAbi?: true | { abi: any[] };
  plugin?: (event: EventType & T, contract: Contract) => Promise<void>;
}) {
  const contractName = abiObject.contractName;
  const lastBlockKey = `${contractName}-last-fetched-block-of-event-${eventName}`;
  const eventListKey = `${contractName}-list-of-events-${eventName}`;

  let contractEventLastFetchedBlock = parseInt(
    localStorage.getItem(lastBlockKey) || FIRST_BLOCK.toString()
  );
  if (contractEventLastFetchedBlock !== 0) contractEventLastFetchedBlock += 1;
  const list: EventType[] = JSON.parse(
    localStorage.getItem(eventListKey) || "[]"
  );

  const contract = new Contract({
    abiObject,
    address,
    web3: App.web3,
  });

  const abiDecoder = require("abi-decoder");
  abiDecoder.addABI(
    decodeViaAbi === true || decodeViaAbi === undefined
      ? abiObject.abi
      : decodeViaAbi.abi
  );

  const listEvents = await contract.direct.getPastEvents(eventName, {
    fromBlock: contractEventLastFetchedBlock,
    toBlock: "latest",
  });

  for (const eventData of listEvents) {
    const timestamp = parseInt(
      (
        await contract.web3.eth.getBlock(eventData.blockNumber)
      ).timestamp.toString()
    );
    const transactionData = await contract.web3.eth.getTransaction(
      eventData.transactionHash
    );

    contractEventLastFetchedBlock = transactionData.blockNumber as number;

    const input: any = abiDecoder.decodeMethod(transactionData.input);
    if (input?.params)
      input.params.forEach((item: any, itemIndex: number, array: any[]) => {
        if (item.name) array[item.name] = item.value;
      });

    const event: EventType = {
      input,
      ...eventData.returnValues,
      timestamp: timestamp * 1000,
      eventData,
      transactionData,
    };

    if (plugin) await plugin(event as any, contract);
    list.push(event);
  }

  localStorage.setItem(
    eventListKey,
    JSON.stringify(list, (key: string, value: any) => {
      if (Array.isArray(value) && value !== list) {
        return {
          ...value,
        };
      } else {
        return value;
      }
    })
  );
  localStorage.setItem(lastBlockKey, contractEventLastFetchedBlock.toString());

  return list as any as (EventType & T)[];
}
