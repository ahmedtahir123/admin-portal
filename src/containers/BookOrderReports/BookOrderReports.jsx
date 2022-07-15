import * as dayjs from "dayjs";
import React, { Fragment } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import ReportsListView from "../../components/ReportsListView/ReportsListView";
import { DATE_FORMAT_TIME } from "../../utils/constants";
import { reportsConfig } from "../../utils/reports.util";

const BookOrderReportsContainer = () => {
  const columns = [
    {
      title: "Code",
      dataIndex: "id",
      key: "id",
      fixed: "left",
    },
    {
      title: "Name",
      dataIndex: "bookTitle",
      key: "bookTitle",
      filterConfig: {
        filterType: "text",
      },
      fixed: "left",
    },
    {
      title: "Order Processed At",
      dataIndex: "orderUpdatedAt",
      key: "orderUpdatedAt",
      render: value => <span>{value ? dayjs(value).format(DATE_FORMAT_TIME) : ""}</span>,
    },
    {
      title: "Order Created At",
      dataIndex: "orderCreatedAt",
      key: "orderCreatedAt",
      filterConfig: {
        filterType: "date",
      },
      render: value => <span>{value ? dayjs(value).format(DATE_FORMAT_TIME) : ""}</span>,
    },
    {
      title: "Location Name",
      dataIndex: "bookCity",
      key: "bookCity",
      filterConfig: {
        filterType: "text",
      },
    },
    {
      title: "Original Price",
      dataIndex: "bookOriginalPrice",
      key: "bookOriginalPrice",
    },
    {
      title: "Discounted Price",
      dataIndex: "bookDiscountedPrice",
      key: "bookDiscountedPrice",
    },
    {
      title: "Consumer Code",
      dataIndex: "customerId",
      key: "customerId",
      filterConfig: {
        filterType: "text",
      },
    },
    {
      title: "Consumer Name",
      dataIndex: "customerFirstName",
      key: "customerFirstName",
      filterConfig: {
        filterType: "text",
      },
      render: (text, record) => (
        <span>{`${record.customerFirstName} ${record.customerLastName ? record.customerLastName : ""}`}</span>
      ),
    },
    {
      title: "Payment transaction ID",
      dataIndex: "paymentTransactionNumber",
      key: "paymentTransactionNumber",
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      filterConfig: {
        filterType: "radio",
        filters: [
          { text: "Completed", value: "Completed" },
          { text: "Rejected", value: "Rejected" },
        ],
      },
    },
    {
      title: "Failure / Rejection reason",
      dataIndex: "orderFailureReason",
      key: "orderFailureReason",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      filterConfig: {
        filterType: "radio",
        filters: [
          { text: "Paid", value: "Paid" },
          { text: "UnPaid", value: "UnPaid" },
        ],
      },
    },
  ];

  return (
    <Fragment>
      <PageTitle title="BOOK ORDERS REPORT" />
      <ReportsListView columns={columns} reportConfig={reportsConfig.bookOrderReports.generalView} />
      {/* <Table scroll={{ x: 1500 }} dataSource={bookOrderReport} columns={columns} /> */}
    </Fragment>
  );
};

BookOrderReportsContainer.defaultProps = {};

BookOrderReportsContainer.propTypes = {};

export default BookOrderReportsContainer;
