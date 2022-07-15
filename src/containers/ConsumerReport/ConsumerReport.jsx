import * as dayjs from "dayjs";
import React, { Fragment } from "react";
// import { consumerReport } from "../../__mocks__/report&Statistics";
import PageTitle from "../../components/PageTitle/PageTitle";
import ReportsListView from "../../components/ReportsListView/ReportsListView";
import { DATE_FORMAT_TIME } from "../../utils/constants";
import { reportsConfig } from "../../utils/reports.util";

const ConsumerReportsContainer = () => {
  const renderAddress = value => {
    if (value === "null" || value === undefined) {
      return <span />;
    }
    let u = JSON.parse(value);
    u = Object.values(u);
    return (
      <ul>
        {u.map(item => {
          let address = "";
          if (item.addressName) address += ` ${item.addressName}`;
          if (item.addressType) address += ` ${item.addressType}`;
          if (item.building) address += ` ${item.building}`;
          if (item.street) address += ` ${item.street}`;
          if (item.area) address += ` ${item.area}`;
          if (item.floorUnit) address += ` ${item.floorUnit}`;
          if (item.riderNote) address += ` ${item.riderNote}`;
          if (item.city) address += ` ${item.city}`;
          if (item.province) address += ` ${item.province}`;
          if (item.country) address += ` ${item.country}`;

          return <li>{address}</li>;
        })}
      </ul>
    );
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "customerFirstName",
      key: "customerFirstName",
      filterConfig: {
        filterType: "text",
      },
      fixed: "left",
    },
    {
      title: "Last Name",
      dataIndex: "customerLastName",
      key: "customerLastName",
      filterConfig: {
        filterType: "text",
      },
      render: (text, record) => <span>{`${record.customerLastName ? record.customerLastName : ""}`}</span>,
      fixed: "left",
    },
    {
      title: "Contact",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
      // width: "8%",
    },
    {
      title: "Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
      filterConfig: {
        filterType: "text",
      },
      width: "12%",
    },
    {
      title: "Address",
      dataIndex: "customerAddress",
      key: "customerAddress",
      filterConfig: {
        filterType: "text",
      },
      width: "20%",

      render: value => <span>{value ? renderAddress(value) : value}</span>,
    },
    {
      title: "City",
      dataIndex: "customerCity",
      key: "customerCity",
      filterConfig: {
        filterType: "text",
      },
    },
    {
      title: "Account Created At",
      dataIndex: "customerCreatedAt",
      key: "customerCreatedAt",
      // filterConfig: {
      //   filterType: "date",
      // },
      render: value => <span>{value ? dayjs(value).format(DATE_FORMAT_TIME) : ""}</span>,
    },
    {
      title: "Account Updated At ",
      dataIndex: "customerUpdatedAt",
      key: "customerUpdatedAt",
      filterConfig: {
        filterType: "date",
      },
      render: value => <span>{value ? dayjs(value).format(DATE_FORMAT_TIME) : ""}</span>,
    },
    {
      title: "Last Login Device Name",
      dataIndex: "customerLastLoginDevice",
      key: "customerLastLoginDevice",
      filterConfig: {
        filterType: "text",
      },
    },
    {
      title: "Failed Attempt Count",
      dataIndex: "failedAttemptCount",
      key: "failedAttemptCount",
    },
    {
      title: "Last Login At",
      dataIndex: "loginAttemptAt",
      key: "loginAttemptAt",
      filterConfig: {
        filterType: "date",
      },
      render: value => <span>{value ? dayjs(value).format(DATE_FORMAT_TIME) : ""}</span>,
    },
    // {
    //   title: "Book Order Count",
    //   dataIndex: "bookOrderCount",
    //   key: "bookOrderCount",
    // },
    {
      title: "Book Activation Count",
      dataIndex: "bookActivationCount",
      key: "bookActivationCount",
    },
    {
      title: "Redemption Count",
      dataIndex: "redemptionCount",
      key: "redemptionCount",
    },
    {
      title: "Last Redeemed At ",
      dataIndex: "lastRedemptionAt",
      key: "lastRedemptionAt",
      filterConfig: {
        filterType: "date",
      },
      render: value => <span>{value ? dayjs(value).format(DATE_FORMAT_TIME) : ""}</span>,
    },
  ];

  return (
    <Fragment>
      <PageTitle title="CONSUMER REPORT" />
      <ReportsListView columns={columns} reportConfig={reportsConfig.consumerReports.generalView} />
      {/* <Table scroll={{ x: 1500 }} dataSource={consumerReport} columns={columns}></Table> */}
    </Fragment>
  );
};

ConsumerReportsContainer.defaultProps = {};

ConsumerReportsContainer.propTypes = {};

export default ConsumerReportsContainer;
