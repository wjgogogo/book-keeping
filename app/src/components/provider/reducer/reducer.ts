import { isSameMonth } from "./../../../services/dateHelper";
import moment, { Moment } from "moment";
import { RecordItem, RecordType } from "../../../pages/detail/components/record/Record";
import { Action, ActionType } from "./actions";

export interface State {
  month: Moment;
  monthlyRecords: RecordItem[];
}

export const defaultState: State = {
  month: moment(),
  monthlyRecords: [],
};

const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case Action.UPDATE_MONTHLY_RECORDS:
      return {
        ...state,
        monthlyRecords: action.records,
      };

    case Action.ADD_RECORD:
      return {
        ...state,
        monthlyRecords: isSameMonth(action.record.timeStamp, state.month)
          ? state.monthlyRecords.concat(action.record)
          : state.monthlyRecords,
      };
    case Action.UPDATE_RECORD:
      return {
        ...state,
        monthlyRecords: isSameMonth(action.record.timeStamp, state.month)
          ? state.monthlyRecords.map((i) => (i.id === action.record.id ? action.record : i))
          : state.monthlyRecords.filter((i) => i.id !== action.record.id),
      };
    case Action.DELETE_RECORD:
      return {
        ...state,
        monthlyRecords: state.monthlyRecords.filter((item) => item.id !== action.recordId),
      };

    case Action.UPDATE_MONTH:
      return {
        ...state,
        month: action.month,
      };

    default:
      return state;
  }
};

export default reducer;
