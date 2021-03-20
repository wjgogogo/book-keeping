import React, { FC, useContext } from "react";
import { Context } from "../../components/provider/Provider";
import { getDailySummaryInMonth, getTypeSummaryInMonth } from "../../services/recordHelper";
import LineChartInMonth from "./components/lineChart/LineChartInMonth";
import PieChartInMonth from "./components/pieChart/PieChartInMonth";
import "./ChartPage.css";

const ChartPage: FC = () => {
  const {
    state: { monthlyRecords, month },
  } = useContext(Context);
  const dailySummaryInMonth = getDailySummaryInMonth(monthlyRecords, month);
  const { incomeSummary, expenditureSummary } = getTypeSummaryInMonth(monthlyRecords);
  return (
    <div className={"chart-page"}>
      <div className={"chart-page__header"}></div>
      <div className={"chart-page__content"}>
        <LineChartInMonth title={"本月收支情况"} data={dailySummaryInMonth} />
        <PieChartInMonth title={"支出情况"} data={expenditureSummary} />
        <PieChartInMonth title={"收入情况"} data={incomeSummary} />
      </div>
    </div>
  );
};

export default ChartPage;
