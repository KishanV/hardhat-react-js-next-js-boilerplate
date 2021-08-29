import { combineReducers, createStore } from "redux";
import {
  UserPreferencesController,
  UserPreferencesState,
} from "./user-preferences";
import { Web3Controller, Web3State } from "./web3";

export type ReduxDispatch = (value: any) => void;

export type ReduxType = {
  userPreferences: UserPreferencesState;
  web3State: Web3State;
};

type SyncReduxType = {
  [P in keyof ReduxType]: (
    state: Pick<ReduxType, P> | any,
    action: any
  ) => Pick<ReduxType, P> | any;
};

const reduxObj: SyncReduxType = {
  userPreferences: UserPreferencesController.reducer,
  web3State: Web3Controller.reducer,
};

const reducer = combineReducers(reduxObj);

export const appStore = createStore(reducer);
