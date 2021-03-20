import axios from "axios";
import { NewRecordItem } from "./../pages/detail/components/recordModal/RecordModal";
import { RecordItem } from "../pages/detail/components/record/Record";

axios.interceptors.response.use((response) => response.data);

export const getRecordsBetweenRangeUsingGet = (start: number, end: number) => {
  return axios.get<any, RecordItem[]>(`/api/records?timeStamp_gte=${start}&timeStamp_lte=${end}`);
};

export const createNewRecordUsingPost = (record: NewRecordItem) => {
  return axios.post<any, RecordItem>(`/api/records`, record);
};

export const updateRecordUsingPut = (record: RecordItem) => {
  return axios.put<any, RecordItem>(`/api/records/${record.id}`, record);
};

export const deleteRecordUsingDelete = (recordId: number) => {
  return axios.delete<any, RecordItem>(`/api/records/${recordId}`);
};
