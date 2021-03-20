import React, { FC, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Layout, Menu, Statistic } from "antd";
import Icon from "../icon/Icon";
import Logo from "../logo/Logo";
import { ROUTE_CONFIG } from "../../services/router";
import "./MainLayout.css";
import LocaleDatePicker from "../localeDatePicker/LocaleDatePicker";
import { Context } from "../provider/Provider";
import { Moment } from "moment";
import { updateMonth } from "../provider/reducer/actions";
import { getSummary } from "../../services/recordHelper";

const { Sider, Content } = Layout;
const { Item } = Menu;

const MainLayout: FC = () => {
  const { pathname } = useLocation();

  const { state, dispatch } = useContext(Context);

  const monthlySummary = getSummary(state.monthlyRecords);

  const onMonthChange = (month: Moment) => {
    dispatch(updateMonth(month));
  };

  return (
    <Layout className="app">
      <Sider className="sider" theme="light" collapsible>
        <Logo />
        <Menu defaultSelectedKeys={[pathname]}>
          <Item key="/" icon={<Icon icon={"icon-zhuye"} />}>
            <Link to="/">明细</Link>
          </Item>
          <Item key="/chart" icon={<Icon icon={"icon-Chart"} />}>
            <Link to="/chart">图表</Link>
          </Item>
        </Menu>
      </Sider>
      <Content className="content">
        <div className={"header"}>
          <Logo size={"large"} />
          <div className={"header-category"}>
            <Statistic
              title={"请选择月份"}
              valueRender={() => <LocaleDatePicker value={state.month} onChange={onMonthChange} />}
            />
            <Statistic title={"总收入"} value={monthlySummary.totalIncome} />
            <Statistic title={"总支出"} value={monthlySummary.totalExpenditure} />
          </div>
        </div>
        <div className="body">{renderRoutes(ROUTE_CONFIG)}</div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
