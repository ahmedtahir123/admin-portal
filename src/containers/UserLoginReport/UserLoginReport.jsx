import React, { Fragment } from "react";
// import { salesReport } from "../../__mocks__/report&Statistics";
import * as dayjs from "dayjs";
import PageTitle from "../../components/PageTitle/PageTitle";
import ReportsListView from "../../components/ReportsListView/ReportsListView";
import { reportsConfig } from "../../utils/reports.util";
import { DATE_FORMAT_TIME } from "../../utils/constants";

const UserLoginReport = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "userFirstName",
      key: "userFirstName",
      width: "10%",

      filterConfig: {
        filterType: "text",
      },
      fixed: "left",
      render: (text, record) => (
        <span>{`${record.userFirstName} ${record.userLastName ? record.userLastName : ""}`}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
      width: "15%",

      filterConfig: {
        filterType: "text",
      },
    },
    {
      title: "Login At",
      dataIndex: "userLoginAt",
      key: "userLoginAt",
      width: "10%",
      // filterConfig: {
      //   filterType: "date",
      // },
      render: value => <span>{value ? dayjs(value).format(DATE_FORMAT_TIME) : ""}</span>,
    },
    {
      title: "Type",
      dataIndex: "userType",
      key: "userType",
      width: "10%",
      filterConfig: {
        filterType: "checkBox",
        filters: [
          { text: "ADMIN", value: "ADMIN" },
          { text: "MERCHANT", value: "MERCHANT" },
          { text: "CONSUMER", value: "CONSUMER" },
        ],
      },
    },
    {
      title: "Login User Agent",
      dataIndex: "userDevice",
      key: "userDevice",
    },
    {
      title: "Attempt Status",
      dataIndex: "userLoginAttemptStatus",
      key: "userLoginAttemptStatus",
      width: "10%",

      filterConfig: {
        filterType: "radio",
        filters: [
          { text: "SUCCESS", value: "LOGIN_SUCCEED" },
          { text: "FAILED", value: "LOGIN_FAILED" },
        ],
      },
      render: value => <span>{value ? value.split("_")[1] : ""}</span>,
    },
  ];

  return (
    <Fragment>
      <PageTitle title="USER LOGIN REPORT" />
      <ReportsListView columns={columns} reportConfig={reportsConfig.userLoginReport.generalView} />
      {/* <Table dataSource={salesReport} columns={columns} /> */}
    </Fragment>
  );
};

UserLoginReport.defaultProps = {};

UserLoginReport.propTypes = {};

export default UserLoginReport;
