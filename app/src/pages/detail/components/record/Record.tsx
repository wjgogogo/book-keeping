import { Popconfirm } from "antd";
import React, { FC } from "react";
import Icon, { IconButton } from "../../../../components/icon/Icon";
import { getIconByName } from "../../../../services/iconSelector";
import "./Record.css";

export enum RecordType {
  Income = "income",
  Expenditure = "expenditure",
}

export interface RecordItem {
  id: number;
  timeStamp: number;
  type: RecordType;
  name: string;
  price: number;
  remark?: string;
}

interface RecordProps extends RecordItem {
  onOpenUpdateModal: (id: number) => void;
  onDeleteRecord: (id: number) => void;
}

const Record: FC<RecordProps> = ({ id, type, name, price, remark, onOpenUpdateModal, onDeleteRecord }) => {
  const icon = getIconByName(type, name);

  return (
    <div className={"record"}>
      <Icon className={"record-icon"} icon={icon.icon} />
      <div className={"record-name"}>{name}</div>
      <div className={"record-remark"}>{remark}</div>
      <div className={"record-price"}>
        {type === RecordType.Income ? "+" : "-"}
        {price}
      </div>
      <div className={"record-action"}>
        <IconButton icon={"icon-bianji"} onClick={() => onOpenUpdateModal(id)} />
        <Popconfirm
          placement="topRight"
          okText="确认"
          cancelText="取消"
          title={"您确认想删除这条记录吗？"}
          onConfirm={() => {
            onDeleteRecord(id);
          }}
        >
          <IconButton icon={"icon-shanchu"} />
        </Popconfirm>
      </div>
    </div>
  );
};

export default Record;
