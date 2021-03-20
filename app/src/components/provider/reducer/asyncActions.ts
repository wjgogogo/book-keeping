import { Moment } from "moment";
import { Dispatch } from "react";
import { RecordItem } from "../../../pages/detail/components/record/Record";
import { NewRecordItem } from "../../../pages/detail/components/recordModal/RecordModal";
import {
  createNewRecordUsingPost,
  deleteRecordUsingDelete,
  getRecordsBetweenRangeUsingGet,
  updateRecordUsingPut,
} from "../../../services/client";
import { getMonthRange } from "../../../services/dateHelper";
import { ActionType, addRecord, deleteRecord, updateRecord, updateMonthlyRecords } from "./actions";

export const fetchRecordsAsync = (month: Moment) => async (dispatch: Dispatch<ActionType>) => {
  const [start, end] = getMonthRange(month);
  const recordList = await getRecordsBetweenRangeUsingGet(start, end);
  dispatch(updateMonthlyRecords(recordList));
};

export const createNewRecordAsync = (record: NewRecordItem) => async (dispatch: Dispatch<ActionType>) => {
  const newRecord = await createNewRecordUsingPost(record);
  dispatch(addRecord(newRecord));
};

export const updateRecordAsync = (record: RecordItem) => async (dispatch: Dispatch<ActionType>) => {
  const updated = await updateRecordUsingPut(record);
  dispatch(updateRecord(updated));
};

export const deleteRecordAsync = (recordId: number) => async (dispatch: Dispatch<ActionType>) => {
  await deleteRecordUsingDelete(recordId);
  dispatch(deleteRecord(recordId));
};
