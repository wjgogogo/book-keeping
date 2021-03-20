import moment, { Moment } from "moment";
import "moment/locale/zh-cn";

export enum DateFormat {
  MONTH_DAYOFWEEK = "MMMDo dddd",
  YEAR_MONTH_DAY = "YYYY-MM-DD",
  Day = "D",
}

const TIMEZONE_OFFSET = 480;

export const formatTimeStamp = (timeStamp: number, format = DateFormat.YEAR_MONTH_DAY) => {
  return moment(timeStamp).utcOffset(TIMEZONE_OFFSET).format(format);
};

export const getMonthRange = (month: Moment) => {
  const start = moment(month).utcOffset(TIMEZONE_OFFSET).startOf("month").valueOf();
  const end = moment(month).utcOffset(TIMEZONE_OFFSET).endOf("month").valueOf();
  return [start, end];
};

export const isSameMonth = (timeStamp: number, currentMonth: Moment) => {
  const month = moment(timeStamp).utcOffset(TIMEZONE_OFFSET);
  return (
    month.isSame(currentMonth.utcOffset(TIMEZONE_OFFSET), "year") &&
    month.isSame(currentMonth.utcOffset(TIMEZONE_OFFSET), "month")
  );
};
