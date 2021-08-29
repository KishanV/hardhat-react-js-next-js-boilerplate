import axios, { AxiosInstance } from "axios";
import React from "react";
import { Bot } from "../backend/entities/bots";
import { PairDetail } from "./crypto-watch";
const Client = axios.create({
  baseURL: "/api",
  responseType: "json",
});

Client.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log(config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

Client.interceptors.response.use(
  function (config) {
    // Do something before response is reached
    console.log(config);
    return config;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export type LoadConfig<T> = {
  state?: {
    data?: T;
    loading?: boolean;
  };
  component?: React.Component<any, any>;
};
export class NextClient {
  client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  load<T>(props?: LoadConfig<T>) {
    if (props && props.state && props.component) {
      props.state.loading = true;
      props.state.data = undefined;
      props.component.setState({});
    }
    return (
      afterLoadProps: LoadConfig<T> & {
        data: T;
      }
    ) => {
      if (afterLoadProps.state && afterLoadProps.component) {
        afterLoadProps.state.loading = false;
        afterLoadProps.state.data = afterLoadProps.data;
        afterLoadProps.component.setState({});
      }
      return afterLoadProps.data;
    };
  }

  bots = {
    list: async (config?: LoadConfig<Bot[]>) => {
      return this.load<Bot[]>(config)({
        ...config,
        data: (
          await this.client.get<{
            bots: Bot[];
          }>("bot/list")
        ).data.bots,
      });
    },
    item: async (props: { id: number | string }, config?: LoadConfig<Bot>) => {
      return this.load<Bot>(config)({
        ...config,
        data: (
          await this.client.post<{
            bot: Bot;
          }>(`bot/item`, props)
        ).data.bot,
      });
    },
    create: async (body: {
      name: string;
      description: string;
      details: PairDetail;
    }) => {
      return this.client.post("bot/create", body);
    },
  };
}

export const NextApi = new NextClient(Client);
