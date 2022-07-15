import * as dayjs from "dayjs";
import { Tabs } from "antd";
import React, { Fragment } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import ReportsListView from "../../components/ReportsListView/ReportsListView";
import { DATE_FORMAT, MONTH_ARRAY, TIME_FORMAT } from "../../utils/constants";
import { reportsConfig } from "../../utils/reports.util";

const BookActivationReportsContainer = () => {
  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerFirstName",
      key: "customerFirstName",
      filterConfig: {
        filterType: "text",
      },
      fixed: "left",
      render: (text, record) => (
        <span>{`${record.customerFirstName} ${record.customerLastName ? record.customerLastName : ""}`}</span>
      ),
    },
    {
      title: "Customer Contact",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "Customer Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
      filterConfig: {
        filterType: "text",
      },
    },
    {
      title: "Activation Date",
      dataIndex: "bookActivatedAt",
      key: "bookActivatedAt",
      // filterConfig: {
      //   filterType: "time",
      // },
      render: value => <span>{value ? dayjs(value).format(DATE_FORMAT) : ""}</span>,
    },
    {
      title: "Activation Time",
      dataIndex: "bookActivatedAt",
      key: "bookActivatedAt",
      // filterConfig: {
      //   filterType: "time",
      // },
      render: value => <span>{value ? dayjs(value).format(TIME_FORMAT) : ""}</span>,
    },
    {
      title: "Book Name",
      dataIndex: "bookTitle",
      key: "bookTitle",
      filterConfig: {
        filterType: "text",
      },
    },
    {
      title: "Book Code",
      dataIndex: "bookCode",
      key: "bookCode",
    },
    {
      title: "Book Activation Code",
      dataIndex: "bookActivationCode",
      key: "bookActivationCode",
    },
    {
      title: "City",
      dataIndex: "bookCity",
      key: "bookCity",
      filterConfig: {
        filterType: "text",
      },
    },
    {
      title: "Is Active",
      dataIndex: "isActive",
      key: "isActive",
    },
    {
      title: "Is Used",
      dataIndex: "isUsed",
      key: "isUsed",
    },
    {
      title: "Blocked",
      dataIndex: "blocked",
      key: "blocked",
    },
    {
      title: "Verified",
      dataIndex: "verified",
      key: "verified",
    },
    {
      title: "Device Name",
      dataIndex: "deviceName",
      key: "deviceName",
      filterConfig: {
        filterType: "text",
      },
    },
  ];
  const monthWiseViewColumns = [
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      render: text => <span>{MONTH_ARRAY[text]}</span>,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Total Activation",
      dataIndex: "totalActivationCount",
      key: "totalActivationCount",
    },
  ];
  // const MONTH_ARRAY = ["", "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

  const { TabPane } = Tabs;

  return (
    <Fragment>
      <PageTitle title="BOOK ACTIVATION REPORTS" />
      <Tabs destroyInactiveTabPane defaultActiveKey="1">
        <TabPane tab="General View" key="1">
          <ReportsListView columns={columns} reportConfig={reportsConfig.bookActivationReports.generalView} />
        </TabPane>
        <TabPane tab="Month Wise View" key="2">
          <ReportsListView
            scrolling={false}
            columns={monthWiseViewColumns}
            reportConfig={reportsConfig.bookActivationReports.monthWiseView}
          />
        </TabPane>
      </Tabs>
    </Fragment>
  );
};

BookActivationReportsContainer.defaultProps = {};

BookActivationReportsContainer.propTypes = {};

export default BookActivationReportsContainer;
