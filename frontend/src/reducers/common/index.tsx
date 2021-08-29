const ActPreFix = "Classes";

export const ClassesActions = {
  Set: `${ActPreFix}_Set`,
};

export type ClassesState<T> = { instant: CommonController<T>; data: T };

export class CommonController<T> {
  state: ClassesState<T>;
  type: string;

  constructor(type: string, state: T) {
    this.state = { data: state, instant: this };
    this.type = type;
  }

  reducer = (
    state: ClassesState<T> = this.state,
    action: { type: string; data?: T } | undefined = undefined
  ) => {
    if (action?.type === this.type + "_set") {
      return {
        instant: this,
        data: action.data ? { ...state.data, ...action.data } : state.data,
      };
    } else {
      return state;
    }
  };

  setData<K extends keyof T>(data?: Pick<T, K>) {
    return {
      type: this.type + "_set",
      data,
    };
  }
}
