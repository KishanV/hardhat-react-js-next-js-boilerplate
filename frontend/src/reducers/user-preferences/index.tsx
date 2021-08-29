type UserPreferencesModel = {
  token?: string;
  loaded?: boolean;
  showWeb3Model?: boolean;
  web3ModelPromise?: (value: unknown) => void;
};

const ActPreFix = "User_Preferences";

export const UserPreferencesActions = {
  Set: `${ActPreFix}_Set`,
};

export type UserPreferencesState = UserPreferencesModel;

export class UserPreferencesController {
  static value: UserPreferencesState = {};

  static reducer(
    state = UserPreferencesController.value,
    action: any = undefined
  ) {
    if (action && action.type === UserPreferencesActions.Set) {
      state = {
        ...state,
        ...action.data,
      };
      window.localStorage.userPreferences = JSON.stringify(state);
    }
    return state;
  }

  static setData(data: UserPreferencesModel) {
    return {
      type: UserPreferencesActions.Set,
      data,
    };
  }
}
