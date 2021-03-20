import React, { FC, useContext, useState } from "react";
import { IconButton } from "../../components/icon/Icon";
import { Context } from "../../components/provider/Provider";
import {
  createNewRecordAsync,
  deleteRecordAsync,
  updateRecordAsync,
} from "../../components/provider/reducer/asyncActions";
import { groupDailyRecords } from "../../services/recordHelper";
import DailyRecords from "./components/dailyRecords/DailyRecords";
import { RecordItem } from "./components/record/Record";
import RecordModal, { NewRecordItem } from "./components/recordModal/RecordModal";
import "./DetailPage.css";

const DetailPage: FC = () => {
  const [visible, setVisible] = useState(false);
  const [updateRecordId, setUpdateRecordId] = useState<number>();
  const { state, dispatch } = useContext(Context);
  const groupedDailyRecords = groupDailyRecords(state.monthlyRecords);

  const onToggleVisible = () => {
    setVisible(!visible);
  };

  const onAddRecord = (record: NewRecordItem) => {
    dispatch(createNewRecordAsync(record));
  };

  const onUpdateRecord = (record: RecordItem) => {
    dispatch(updateRecordAsync(record));
  };

  const onDeleteRecord = (recordId: number) => {
    dispatch(deleteRecordAsync(recordId));
  };

  const onOpenUpdateModal = (id: number) => {
    setUpdateRecordId(id);
    setVisible(true);
  };

  const target = updateRecordId ? state.monthlyRecords.find((i) => i.id === updateRecordId) : undefined;
  return (
    <div className="detail-page">
      <div className={"detail-page-header"}>
        <IconButton icon={"icon-huabanfuben"} className={"detail-page-add-btn"} onClick={onToggleVisible} />
      </div>
      <div className="detail-page-content">
        {groupedDailyRecords.map((daily) => (
          <DailyRecords
            key={daily.timeStamp}
            {...daily}
            onOpenUpdateModal={onOpenUpdateModal}
            onDeleteRecord={onDeleteRecord}
          />
        ))}
      </div>
      <RecordModal
        visible={visible}
        updateRecord={target}
        onClose={onToggleVisible}
        onProcessRecord={target ? onUpdateRecord : onAddRecord}
      />
    </div>
  );
};

export default DetailPage;
