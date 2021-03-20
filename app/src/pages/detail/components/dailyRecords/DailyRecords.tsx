import React, { FC } from "react";
import { DateFormat, formatTimeStamp } from "../../../../services/dateHelper";
import { GroupedDailyRecords } from "../../../../services/recordHelper";
import Record from "../record/Record";
import "./DailyRecords.css";

interface DailyRecordsProps extends GroupedDailyRecords {
  onOpenUpdateModal: (id: number) => void;
  onDeleteRecord:(id:number)=>void;
}

const DailyRecords: FC<DailyRecordsProps> = ({ records, summary, timeStamp, onOpenUpdateModal,onDeleteRecord }) => {
  return (
    <div className={"daily-records"}>
      <div className={"daily-records-summary"}>
        <div className={"daily-records-date"}>{formatTimeStamp(timeStamp, DateFormat.MONTH_DAYOFWEEK)}</div>
        {summary.totalExpenditure > 0 && (
          <div className={"daily-records-detail"}>支出：-{summary.totalExpenditure}</div>
        )}
        {summary.totalIncome > 0 && <div className={"daily-records-detail"}>收入：+{summary.totalIncome}</div>}
      </div>
      <div className={"records"}>
        {records.map((record) => (
          <Record key={record.timeStamp} {...record} onOpenUpdateModal={onOpenUpdateModal}  onDeleteRecord={onDeleteRecord}/>
        ))}
      </div>
    </div>
  );
};

export default DailyRecords;
