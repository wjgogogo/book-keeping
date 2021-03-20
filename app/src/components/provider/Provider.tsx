import React, { createContext, Dispatch, FC, useEffect } from "react";
import { ActionType } from "./reducer/actions";
import { fetchRecordsAsync } from "./reducer/asyncActions";
import { State } from "./reducer/reducer";
import { EnhancedActionType, useCustomizedReducer } from "./reducer/useCustomizedReducer";

export const Context = createContext<{
  state: State;
  dispatch: (action: EnhancedActionType) => void;
}>(null as any);

export const Provider: FC = ({ children }) => {
  const store = useCustomizedReducer();

  // 在每次 month 改变后重新获取数据
  useEffect(() => {
    store.dispatch(fetchRecordsAsync(store.state.month));
  }, [store.state.month]);

  return <Context.Provider value={store}>{children}</Context.Provider>;
};
