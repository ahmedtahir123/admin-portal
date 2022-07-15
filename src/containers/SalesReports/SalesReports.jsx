import { Tabs } from "antd";
import React, { Fragment } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import ReportsListView from "../../components/ReportsListView/ReportsListView";
// import { salesReport } from "../../__mocks__/report&Statistics";
import { reportsConfig } from "../../utils/reports.util";
import { MONTH_ARRAY } from "../../utils/constants";

const { TabPane } = Tabs;
const SalesReportsContainerer = () => {
  const columns = [
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      fixed: "left",
      render: text => <span>{MONTH_ARRAY[text]}</span>,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      fixed: "left",
    },
    {
      title: "Total Consumer Books Count",
      dataIndex: "soldBookCount",
      key: "soldBookCount",
    },
    {
      title: "Total Corporate Books Count",
      dataIndex: "soldCooperateBookCount",
      key: "soldCooperateBookCount",
    },
    {
      title: "Total Promotion Count",
      dataIndex: "soldPromotionCampaignCount",
      key: "soldPromotionCampaignCount",
    },
    {
      title: "Total Count",
      dataIndex: "totalCount",
      key: "totalCount",
    },
  ];

  return (
    <Fragment>
      <PageTitle title="SALES REPORT" />
      {/* <Tabs defaultActiveKey="1"> */}
      {/* <TabPane tab="Sales Report View" key="1"> */}
      <ReportsListView scrolling={false} columns={columns} reportConfig={reportsConfig.salesReport.monthWiseView} />
      {/* <Table dataSource={salesReport} columns={columns} /> */}
      {/* </TabPane> */}
      {/* <TabPane tab="Tab 2" key="2">
          <ReportsListView columns={columns} reportConfig={reportsConfig.salesReport.monthWiseView} />
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          <ReportsListView columns={columns} reportConfig={reportsConfig.salesReport.monthWiseView} />
        </TabPane>
        <TabPane tab="Tab 4" key="4">
          <ReportsListView columns={columns} reportConfig={reportsConfig.salesReport.monthWiseView} />
        </TabPane> */}
      {/* </Tabs> */}
    </Fragment>
  );
};

SalesReportsContainerer.defaultProps = {};

SalesReportsContainerer.propTypes = {};

export default SalesReportsContainerer;
