import axios, { AxiosInstance, AxiosResponse } from "axios";

export const CryptoWatchClient = axios.create({
  baseURL: "cw/",
  responseType: "json",
});

CryptoWatchClient.interceptors.request.use(
  function (config) {
    console.log(config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

CryptoWatchClient.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export type Allowance = {
  cost: number;
  remaining: number;
  upgrade: string;
};

export type Exchange = {
  active: boolean;
  id: number;
  name: string;
  route: string;
  symbol: string;
};

export type Asset = {
  fiat: boolean;
  id: number;
  name: string;
  route: string;
  symbol: string;
};

export type PairExchange = {
  active: boolean;
  exchange: string;
  id: 282;
  pair: string;
  route: string;
};

export type PairDetail = {
  id: number;
  base: Asset;
  quote: Asset;
  markets: PairExchange[];
};

export class CryptoWatchApi {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async getExchanges(): Promise<
    AxiosResponse<{
      allowance: Allowance;
      result: Exchange[];
    }>
  > {
    return this.client.get("exchanges");
  }

  async getAssets(): Promise<
    AxiosResponse<{
      allowance: Allowance;
      result: Asset[];
    }>
  > {
    return this.client.get("assets");
  }

  async getPairDetails(pair: string): Promise<
    AxiosResponse<{
      allowance: Allowance;
      result: PairDetail;
    }>
  > {
    return this.client.get(`pairs/${pair}`);
  }
}

export class CryptoWatchUtil {
  static getAssetFromList(list: Asset[], by: { id?: string; name?: string }) {
    return list.find((item) => {
      return item.id.toString() === by.id || item.name.toString() === by.name;
    });
  }
}

export const CryptoWatch = new CryptoWatchApi(CryptoWatchClient);
