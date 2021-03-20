import { Dispatch, useCallback, useReducer } from "react";
import { ActionType } from "./actions";
import reducer, { defaultState } from "./reducer";

export type EnhancedActionType = ActionType | ((d: Dispatch<ActionType>) => void);

export const useCustomizedReducer = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const enhancedDispatch = useCallback(
    (action: EnhancedActionType) => {
      if (typeof action === "function") {
        return action(dispatch);
      } else {
        return dispatch(action);
      }
    },
    [dispatch]
  );
  return { state, dispatch: enhancedDispatch };
};
