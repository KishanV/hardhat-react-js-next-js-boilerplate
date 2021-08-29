import "reflect-metadata";
import "../css/global.scss";
import "../css/carbon.scss";
import "tailwindcss/tailwind.css";

import { connect, Provider } from "react-redux";
import { AppProps } from "next/app";
import { appStore, ReduxType } from "../reducers";
import { UserPreferencesController } from "../reducers/user-preferences";
import { NextRouter, useRouter } from "next/dist/client/router";
import { PageContainer } from "../components/template/page-container";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { Web3Controller } from "../reducers/web3";

import Web3 from "web3";
import React, { useEffect } from "react";
import { Symfoni } from "../hardhat/SymfoniContext";

export type PageProps = AppProps & {
  router: NextRouter;
  redux: ReduxType;
  reduxDispatch: any;
};

function AppView(
  props: AppProps & {
    reduxDispatch: any;
    redux: ReduxType;
  }
) {
  const Component = props.Component;
  const router = useRouter();
  const context = useWeb3React<Web3Provider>();
  const { account, connector, library, chainId } = context;
  const [activatingConnector, setActivatingConnector] = React.useState<any>();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  React.useEffect(() => {
    const web3 = library ? new Web3(library.provider as any) : undefined;
    if (web3 && account) {
      web3.eth.defaultAccount = account;
      (async () => {
        props.reduxDispatch(
          Web3Controller.setData({
            account,
            web3,
            chainId,
            eth: parseInt(await web3.eth.getBalance(account)),
          })
        );
      })().then();
    } else {
      props.reduxDispatch(
        Web3Controller.setData({
          account: undefined,
          web3: undefined,
          chainId: undefined,
          eth: undefined,
        })
      );
    }
    const web3ModelPromise = props.redux.userPreferences.web3ModelPromise;
    props.reduxDispatch(
      UserPreferencesController.setData({
        showWeb3Model: false,
        web3ModelPromise: undefined,
        loaded: true,
      })
    );
    if (web3ModelPromise) {
      web3ModelPromise(undefined);
    }
  }, [library, library?.provider, account, chainId]);

  return (
    <>
      {props.redux.userPreferences.loaded !== undefined && (
        <>
          <Symfoni autoInit={true}>
            <PageContainer
              router={router}
              redux={props.redux}
              reduxDispatch={props.reduxDispatch}
            >
              <Component
                {...props.pageProps}
                router={router}
                redux={props.redux}
                reduxDispatch={props.reduxDispatch}
              />
            </PageContainer>
          </Symfoni>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state: ReduxType) => {
  return {
    redux: { ...state },
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    reduxDispatch: dispatch,
  };
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(AppView);

export default function (props: AppProps) {
  return (
    <Provider store={appStore}>
      <Web3ReactProvider
        getLibrary={(provider: any) => {
          const library = new Web3Provider(provider);
          library.pollingInterval = 12000;
          return library;
        }}
      >
        <ConnectedApp {...props} />
      </Web3ReactProvider>
    </Provider>
  );
}
