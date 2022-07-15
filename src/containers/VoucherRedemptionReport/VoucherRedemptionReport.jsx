import { Tabs } from "antd";
import * as dayjs from "dayjs";
import React, { Fragment } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import ReportsListView from "../../components/ReportsListView/ReportsListView";
import { DATE_FORMAT_TIME, MONTH_ARRAY } from "../../utils/constants";
import { reportsConfig } from "../../utils/reports.util";

const { TabPane } = Tabs;

const VoucherRedemptionReportsContainer = () => {
  const columnsConsumerView = [
    {
      title: "Name",
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
      title: "Contact",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
      filterConfig: {
        filterType: "text",
      },
    },
    {
      title: "Redeemed At",
      dataIndex: "dealRedeemedAt",
      key: "dealRedeemedAt",
      // filterConfig: {
      //   filterType: "date",
      // },
      render: value => <span>{value ? dayjs(value).format(DATE_FORMAT_TIME) : ""}</span>,
    },
    {
      title: "Source Type",
      dataIndex: "dealSourceType",
      key: "dealSourceType",
      filterConfig: {
        filterType: "radio",
        filters: [
          { text: "Book", value: "BOOK" },
          { text: "Promotion", value: "PROMOTION" },
          { text: "Gift", value: "GIFT" },
        ],
      },
    },
    {
      title: "Source Code",
      dataIndex: "dealSourceCode",
      key: "dealSourceCode",
    },
    {
      title: "Source Name ",
      dataIndex: "dealSourceName",
      key: "dealSourceName",
      filterConfig: {
        filterType: "text",
      },
    },
    {
      title: "Brand Name",
      dataIndex: "brandName",
      key: "brandName",
      filterConfig: {
        filterType: "text",
      },
    },

    {
      title: "Outlet Name",
      dataIndex: "partnerName",
      key: "partnerName",
      filterConfig: {
        filterType: "text",
      },
    },
    {
      title: "Deal Text",
      dataIndex: "dealDescription",
      key: "dealDescription",
    },
    {
      title: "Deal Code",
      dataIndex: "dealCode",
      key: "dealCode",
    },

    {
      title: "City",
      dataIndex: "dealSourceCityName",
      key: "dealSourceCityName",
      filterConfig: {
        filterType: "text",
      },
    },
    {
      title: "Redeemed ID",
      dataIndex: "dealRedeemedId",
      key: "dealRedeemedId",
    },

    // {
    //   title: "Unredeemed ID",
    //   dataIndex: "dealUnredeemedId",
    //   key: "dealUnredeemedId",
    // },

    {
      title: "Unredeemed At",
      dataIndex: "dealUnredeemedAt",
      key: "dealUnredeemedAt",
      filterConfig: {
        filterType: "date",
      },
      render: value => <span>{value ? dayjs(value).format(DATE_FORMAT_TIME) : ""}</span>,
    },
  ];

  // const columnsPartnerView = [
  //   {
  //     title: "Name",
  //     dataIndex: "partnerName",
  //     key: "partnerName",
  //     filterConfig: {
  //       filterType: "text",
  //     },
  //     fixed: "left",
  //   },
  //   {
  //     title: "Redeemed At",
  //     dataIndex: "dealRedeemedAt",
  //     key: "dealRedeemedAt",
  //     // filterConfig: {
  //     //   filterType: "date",
  //     // },
  //     render: value => <span>{value ? dayjs(value).format(DATE_FORMAT_TIME) : ""}</span>,
  //   },
  //   {
  //     title: "Brand Name",
  //     dataIndex: "brandName",
  //     key: "brandName",
  //     filterConfig: {
  //       filterType: "text",
  //     },
  //   },
  //   {
  //     title: "Deal Code",
  //     dataIndex: "dealCode",
  //     key: "dealCode",
  //   },
  //   {
  //     title: "Deal Text",
  //     dataIndex: "dealDescription",
  //     key: "dealDescription",
  //     filterConfig: {
  //       filterType: "text",
  //     },
  //   },
  //   {
  //     title: "Source Type",
  //     dataIndex: "dealSourceType",
  //     key: "dealSourceType",
  //     filterConfig: {
  //       filterType: "radio",
  //       filters: [
  //         { text: "Book", value: "BOOK" },
  //         { text: "Promotion", value: "PROMOTION" },
  //         { text: "Gift", value: "GIFT" },
  //       ],
  //     },
  //   },
  //   {
  //     title: "Source Code",
  //     dataIndex: "dealSourceCode",
  //     key: "dealSourceCode",
  //   },
  //   {
  //     title: "Source Name ",
  //     dataIndex: "dealSourceName",
  //     key: "dealSourceName",
  //     filterConfig: {
  //       filterType: "text",
  //     },
  //   },
  //   {
  //     title: "Consumer Name",
  //     dataIndex: "customerFirstName",
  //     key: "customerFirstName",
  //     filterConfig: {
  //       filterType: "text",
  //     },
  //     render: (text, record) => <span>{`${record.customerFirstName} ${record.customerLastName}`}</span>,
  //   },
  //   {
  //     title: "Consumer Contact",
  //     dataIndex: "customerPhoneNumber",
  //     key: "customerPhoneNumber",
  //   },
  // ];

  // const columnsPartnerWiseView = [
  //   {
  //     title: "Name",
  //     dataIndex: "partnerName",
  //     key: "partnerName",
  //     filterConfig: {
  //       filterType: "text",
  //     },
  //     fixed: "left",
  //   },
  //   {
  //     title: "Deal Code",
  //     dataIndex: "dealCode",
  //     key: "dealCode",
  //   },
  //   {
  //     title: "Deal Text",
  //     dataIndex: "dealDescription",
  //     key: "dealDescription",
  //     filterConfig: {
  //       filterType: "text",
  //     },
  //   },
  //   {
  //     title: "Brand Name",
  //     dataIndex: "brandName",
  //     key: "brandName",
  //     filterConfig: {
  //       filterType: "text",
  //     },
  //   },
  //   {
  //     title: "Source Type",
  //     dataIndex: "dealSourceType",
  //     key: "dealSourceType",
  //     filterConfig: {
  //       filterType: "radio",
  //       filters: [
  //         { text: "Book", value: "Book" },
  //         { text: "Promotion", value: "Promotion" },
  //         { text: "Gift", value: "Gift" },
  //       ],
  //     },
  //   },
  //   {
  //     title: "Book Name",
  //     dataIndex: "dealSourceName",
  //     key: "dealSourceName",
  //     filterConfig: {
  //       filterType: "text",
  //     },
  //   },
  //   {
  //     title: "Total Redemtion",
  //     dataIndex: "dealRedeemedAmount",
  //     key: "dealRedeemedAmount",
  //   },
  //   {
  //     title: "From Date",
  //     dataIndex: "dealRedeemedAt",
  //     key: "dealRedeemedAt",
  //     filterConfig: {
  //       filterType: "date",
  //     },
  //     render: value => <span>{value ? dayjs(value).format(DATE_FORMAT_TIME) : ""}</span>,
  //   },
  //   {
  //     title: "To Date",
  //     dataIndex: "dealUnredeemedAt",
  //     key: "dealUnredeemedAt",
  //     filterConfig: {
  //       filterType: "date",
  //     },
  //     render: value => <span>{value ? dayjs(value).format(DATE_FORMAT_TIME) : ""}</span>,
  //   },
  // ];
  const monthWiseView = [
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
      title: "Total Redemption",
      dataIndex: "totalRedeemCount",
      key: "totalRedeemCount",
    },
  ];
  const columnsUnRedeemedView = [
    {
      title: "Consumer Name",
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
      title: "UnRedeemed At",
      dataIndex: "dealUnredeemedAt",
      key: "dealUnredeemedAt",
      // filterConfig: {
      //   filterType: "date",
      // },
      render: value => <span>{value ? dayjs(value).format(DATE_FORMAT_TIME) : ""}</span>,
    },
    {
      title: "Consumer Contact",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "Outlet Name",
      dataIndex: "partnerName",
      key: "partnerName",
      filterConfig: {
        filterType: "text",
      },
    },
    {
      title: "Brand Name",
      dataIndex: "brandName",
      key: "brandName",
      filterConfig: {
        filterType: "text",
      },
    },
    {
      title: "Deal Code",
      dataIndex: "dealCode",
      key: "dealCode",
    },
    {
      title: "Deal Text",
      dataIndex: "dealDescription",
      key: "dealDescription",
      filterConfig: {
        filterType: "text",
      },
    },
    {
      title: "Source Type",
      dataIndex: "dealSourceType",
      key: "dealSourceType",
      filterConfig: {
        filterType: "radio",
        filters: [
          { text: "Book", value: "Book" },
          { text: "Promotion", value: "Promotion" },
          { text: "Gift", value: "Gift" },
        ],
      },
    },
    {
      title: "Source Code",
      dataIndex: "dealSourceCode",
      key: "dealSourceCode",
    },
    {
      title: "Source Name ",
      dataIndex: "dealSourceName",
      key: "dealSourceName",
      filterConfig: {
        filterType: "text",
      },
    },
    {
      title: "UnRedeemed ID",
      dataIndex: "dealUnredeemedId",
      key: "dealUnredeemedId",
    },
  ];

  return (
    <Fragment>
      <PageTitle title="VOUCHER REDEMPTION REPORTS" />
      <Tabs destroyInactiveTabPane defaultActiveKey="1">
        <TabPane tab="Redeemed View" key="1">
          <ReportsListView
            columns={columnsConsumerView}
            reportConfig={reportsConfig.voucherRedemptionReport.consumerView}
          />
          {/* <Table scroll={{ x: 1500 }} dataSource={consumerReport} columns={columnsConsumerView} /> */}
        </TabPane>
        {/* <TabPane tab="Outlet View" key="2">
          <ReportsListView
            columns={columnsPartnerView}
            reportConfig={reportsConfig.voucherRedemptionReport.partnerView}
          />
          <Table scroll={{ x: 1500 }} dataSource={consumerReport} columns={columnsPartnerView} />
        </TabPane> */}
        {/* <TabPane tab="Outlet Wise View" key="3">
          <ReportsListView
            columns={columnsPartnerWiseView}
            reportConfig={reportsConfig.voucherRedemptionReport.partnerWiseView}
          />
          <Table scroll={{ x: 1500 }} dataSource={consumerReport} columns={columnsPartnerWiseView} />
        </TabPane> */}
        <TabPane tab="Unredeemed View" key="2">
          <ReportsListView
            columns={columnsUnRedeemedView}
            reportConfig={reportsConfig.voucherRedemptionReport.unredeemedView}
          />
          {/* <Table dataSource={consumerReport} columns={columnsUnRedeemedView} /> */}
        </TabPane>
        <TabPane tab="Month Wise View" key="3">
          <ReportsListView
            scrolling={false}
            columns={monthWiseView}
            reportConfig={reportsConfig.voucherRedemptionReport.monthWiseView}
          />
          {/* <Table dataSource={salesReport} columns={monthWiseView} /> */}
        </TabPane>
      </Tabs>
    </Fragment>
  );
};

VoucherRedemptionReportsContainer.defaultProps = {};

VoucherRedemptionReportsContainer.propTypes = {};

export default VoucherRedemptionReportsContainer;
