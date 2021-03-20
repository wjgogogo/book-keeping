import { FC, useEffect, useReducer } from "react";
import { Input, message, Modal, Tabs } from "antd";
import LocaleDatePicker from "../../../../components/localeDatePicker/LocaleDatePicker";
import { RecordItem, RecordType } from "../record/Record";
import { EXPENDITURE_ICON_LIST, INCOME_ICON_LIST } from "../../../../constants";
import { IconButton } from "../../../../components/icon/Icon";
import "./RecordModal.css";
import classNames from "classnames";
import moment, { Moment } from "moment";

export type NewRecordItem = Omit<RecordItem, "id">;

interface RecordModalProps {
  visible: boolean;
  updateRecord?: RecordItem;
  onClose: () => void;
  onProcessRecord: ((record: NewRecordItem) => void) | ((record: RecordItem) => void);
}

interface Values extends Omit<RecordItem, "id" | "timeStamp"> {
  month: Moment;
}

const RecordModal: FC<RecordModalProps> = ({ visible, updateRecord, onClose, onProcessRecord }) => {
  const [values, dispatch] = useReducer(
    (state: Values, updated: Partial<Values>) => ({ ...state, ...updated }),
    {} as Values
  );

  function OnTypeChange(type?: RecordType, name?: string) {
    dispatch({ type, name });
  }

  function onMonthChange(month: Moment) {
    dispatch({ month });
  }

  function onPriceChange(price: number) {
    dispatch({ price });
  }

  function onRemarkChange(remark: string) {
    dispatch({ remark });
  }

  function onSubmit() {
    if (!values.name) {
      message.error("请选择类型");
      return;
    }

    if (!values.month) {
      message.error("请选择日期");
      return;
    }

    if (!values.price) {
      message.error("请输入金额");
      return;
    }

    message.success("成功");

    onProcessRecord(normalizeValues(values) as RecordItem);
    onClose();
  }

  function normalizeValues({ month, price, ...props }: Values): NewRecordItem | RecordItem {
    const timeStamp = month.valueOf();
    const normalizedPrice = Math.abs(values.price);
    return { ...updateRecord, ...props, timeStamp, price: normalizedPrice };
  }

  useEffect(() => {
    if (!visible) {
      return;
    }

    if (updateRecord) {
      const { id, timeStamp, ...props } = updateRecord;
      dispatch({ ...props, month: moment(timeStamp) });
    } else {
      dispatch({ type: RecordType.Expenditure, month: moment(), name: "", price: undefined, remark: "" });
    }
  }, [visible]);

  return (
    <Modal
      okText={"确认"}
      cancelText={"取消"}
      destroyOnClose={true}
      visible={visible}
      onOk={onSubmit}
      onCancel={onClose}
    >
      <div className={"record-modal"}>
        <Tabs
          activeKey={values.type || RecordType.Expenditure}
          centered
          size={"middle"}
          onChange={(activeKey) => {
            OnTypeChange(activeKey as RecordType, undefined);
          }}
        >
          <Tabs.TabPane tab="支出" key={RecordType.Expenditure}>
            {EXPENDITURE_ICON_LIST.map((item) => (
              <div key={item.name} className={"record-item"}>
                <IconButton
                  icon={item.icon}
                  className={classNames({ active: values.name === item.name })}
                  onClick={() => OnTypeChange(RecordType.Expenditure, item.name)}
                />
                <span>{item.name}</span>
              </div>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="收入" key={RecordType.Income}>
            {INCOME_ICON_LIST.map((item) => (
              <div key={item.name} className={"record-item"}>
                <IconButton
                  icon={item.icon}
                  className={classNames({ active: values.name === item.name })}
                  onClick={() => OnTypeChange(RecordType.Income, item.name)}
                />
                <span>{item.name}</span>
              </div>
            ))}
          </Tabs.TabPane>
        </Tabs>

        <div className={"record-modal__list"}>
          <div className={"record-modal__list__item"}>
            <span>日期：</span> <LocaleDatePicker picker={"date"} value={values.month} onChange={onMonthChange} />
          </div>
          <div className={"record-modal__list__item"}>
            <span>金额：</span>{" "}
            <Input type={"number"} value={values.price} onChange={(e) => onPriceChange(parseInt(e.target.value))} />
          </div>
          <div className={"record-modal__list__item"}>
            <span>备注：</span>{" "}
            <Input maxLength={20} value={values.remark} onChange={(e) => onRemarkChange(e.target.value)} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RecordModal;
