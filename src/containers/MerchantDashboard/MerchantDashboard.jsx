import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Chart } from "@antv/g2";
import { Divider, Form, Row, Col, Input, Table, Tabs, Button, TimePicker, DatePicker, Switch } from "antd";
import dayjs from "dayjs";
import Graph from "../../components/Graphs/Graph";
import { graphData, weeklyHours, kpiMock } from "../../__mocks__/merchantDashboard";

const MerchantDashboardContainer = props => {
  const { getDailyRecordsList, dailyList } = props;

  const [form] = Form.useForm();
  const { TabPane } = Tabs;

  const columns = [
    {
      title: "Week days",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Open Hr",
      dataIndex: "start",
      key: "start",
    },
    {
      title: "Closing Hr",
      dataIndex: "close",
      key: "close",
    },
    {
      title: "Day Availibility Note",
      dataIndex: "description",
      key: "description",
    },
  ];

  const KpisColumns = [
    {
      title: "Key Performance Indicators",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Today",
      dataIndex: "Today",
      key: "Today",
    },
    {
      title: "Yesterday",
      dataIndex: "Yesterday",
      key: "Yesterday",
    },
    {
      title: "Difference",
      dataIndex: "Difference",
      key: "Difference",
    },
    {
      title: "Week's Avg",
      dataIndex: "Week",
      key: "Week",
    },
    {
      title: "Month's Avg",
      dataIndex: "Month",
      key: "Month",
    },
  ];

  const kpisResponse = () => {
    const numberOfRedemptions = {};
    numberOfRedemptions.title = "Number Of Redemptions";
    numberOfRedemptions.Today = kpiMock.today.totalRedemption;
    numberOfRedemptions.Yesterday = kpiMock.yesterday.totalRedemption;
    numberOfRedemptions.Difference = kpiMock.difference.totalRedemption;
    numberOfRedemptions.Week = kpiMock.weekAvg.totalRedemption;
    numberOfRedemptions.Month = kpiMock.monthAvg.totalRedemption;

    const totalRedemptionRollback = {};
    totalRedemptionRollback.title = "Number of redemptions rollback";
    totalRedemptionRollback.Today = kpiMock.today.totalRedemptionRollback;
    totalRedemptionRollback.Yesterday = kpiMock.yesterday.totalRedemptionRollback;
    totalRedemptionRollback.Difference = kpiMock.difference.totalRedemptionRollback;
    totalRedemptionRollback.Week = kpiMock.weekAvg.totalRedemptionRollback;
    totalRedemptionRollback.Month = kpiMock.monthAvg.totalRedemptionRollback;

    const totalSaleRedemption = {};
    totalSaleRedemption.title = "Total sales with redemptions";
    totalSaleRedemption.Today = kpiMock.today.totalSaleRedemption;
    totalSaleRedemption.Yesterday = kpiMock.yesterday.totalSaleRedemption;
    totalSaleRedemption.Difference = kpiMock.difference.totalSaleRedemption;
    totalSaleRedemption.Week = kpiMock.weekAvg.totalSaleRedemption;
    totalSaleRedemption.Month = kpiMock.monthAvg.totalSaleRedemption;

    const totalOrderDeliveries = {};
    totalOrderDeliveries.title = "Number of order deliveries";
    totalOrderDeliveries.Today = kpiMock.today.totalOrderDeliveries;
    totalOrderDeliveries.Yesterday = kpiMock.yesterday.totalOrderDeliveries;
    totalOrderDeliveries.Difference = kpiMock.difference.totalOrderDeliveries;
    totalOrderDeliveries.Week = kpiMock.weekAvg.totalOrderDeliveries;
    totalOrderDeliveries.Month = kpiMock.monthAvg.totalOrderDeliveries;

    const totalCancelOrders = {};
    totalCancelOrders.title = "Number of cancel orders";
    totalCancelOrders.Today = kpiMock.today.totalCancelOrders;
    totalCancelOrders.Yesterday = kpiMock.yesterday.totalCancelOrders;
    totalCancelOrders.Difference = kpiMock.difference.totalCancelOrders;
    totalCancelOrders.Week = kpiMock.weekAvg.totalCancelOrders;
    totalCancelOrders.Month = kpiMock.monthAvg.totalCancelOrders;

    const totalSaleDeliveries = {};
    totalSaleDeliveries.title = "Total sales on delivery";
    totalSaleDeliveries.Today = kpiMock.today.totalOrderDeliveries;
    totalSaleDeliveries.Yesterday = kpiMock.yesterday.totalOrderDeliveries;
    totalSaleDeliveries.Difference = kpiMock.difference.totalOrderDeliveries;
    totalSaleDeliveries.Week = kpiMock.weekAvg.totalOrderDeliveries;
    totalSaleDeliveries.Month = kpiMock.monthAvg.totalOrderDeliveries;

    const KpisDataSource = [
      numberOfRedemptions,
      totalRedemptionRollback,
      totalSaleRedemption,
      totalOrderDeliveries,
      totalCancelOrders,
      totalSaleDeliveries,
    ];

    return KpisDataSource;
  };
  const [date, setDate] = useState(
    dayjs()
      .format("LLLL")
      .split(","),
  );

  useEffect(() => {
    getDailyRecordsList();
    if (date) {
      setInterval(() => {
        setDate(
          dayjs()
            .format("LLLL")
            .split(","),
        );
      }, 60 * 1000);
    }
  }, []);

  return (
    <div className="dashboard">
      <Divider orientation="left" className="form-divider first">
        Home
      </Divider>
      <Row className="fields-row" gutter={20} type="flex">
        <Col span={8} xs={24} sm={12} lg={24}>
          <h2>
            Today is <span className="color-orange">{date[0]}</span> | {`${date[1]} ${date[2].split(" ")[1]}`} |{" "}
            {`${date[2].split(" ")[2]} ${date[2].split(" ")[3]}`}
          </h2>
        </Col>
      </Row>
      <Divider />
      <Tabs type="card">
        <TabPane tab="Business Hours" key="1">
          <Form form={form}>
            <Row className="fields-row" gutter={20} type="flex">
              <Col span={8} xs={24} sm={12} lg={8}>
                <h1>Business Current Status</h1>

                <Row type="flex" justify="space-between">
                  <h2 className="color-orange">Closed</h2>
                  <Button type="primary">Start Bussiness Now</Button>
                </Row>
                <h4>Since 6/3/2020 12:00 am</h4>
                <Row>
                  <Button style={{ width: "100%" }} type="primary">
                    Declare Bussiness Day Off{" "}
                  </Button>
                </Row>
                <Divider />
                <h1>Set Todays Opening Hours</h1>
                <Form.Item className="text-right" name="time-picker" label="Bussiness Start Time">
                  <TimePicker />
                </Form.Item>
                <Form.Item className="text-right" label="Bussiness Close Time">
                  <TimePicker />
                </Form.Item>
                <Form.Item name="description">
                  <span>
                    <h1>Availibility Note:</h1>
                    <Input.TextArea maxLength="500" rows={5} placeholder="Description" />
                  </span>
                </Form.Item>
                <Form.Item className="text-right" name="description" justify="">
                  <Button type="primary">Save</Button>
                </Form.Item>
              </Col>
              <Col span={8} xs={24} sm={12} lg={16}>
                <h1>Business Hours Schedule</h1>
                <Table pagination={false} columns={columns} dataSource={weeklyHours} />
              </Col>
            </Row>

            <Divider />
          </Form>
        </TabPane>
        <TabPane tab="KPIs" key="2">
          <Row type="flex" justify="space-between">
            <h1>Todays metrics</h1>
            <Button type="link" onClick={() => getDailyRecordsList()}>
              Refresh Now
            </Button>
          </Row>
          <Table pagination={false} columns={KpisColumns} dataSource={kpisResponse()} />
        </TabPane>
        <TabPane tab="Summary" key="3">
          <Row type="flex" justify="space-between">
            <Button>This Week</Button>
            <Button>Previous Week</Button>
            <h1>primary Period</h1>
            <DatePicker />
            <Switch />
            <h1>Compare With</h1>
            <DatePicker />
            <Button type="primary">Apply</Button>
          </Row>
          <Divider />
          <Row>
            <Col lg={12}>
              <Graph data={graphData} title="Voucher redemptions" id="container1" />
            </Col>
            <Col lg={12}>
              <Graph data={graphData} title="Order Deliveries" id="container2" />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col lg={12}>
              <Graph data={graphData} title="Unredeemed Vouchers" id="container3" />
            </Col>
            <Col lg={12}>
              <Graph data={graphData} title="Cancelled Orders" id="container4" />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col lg={12}>
              <Graph data={graphData} title="Sales with redmeptions" id="container5" />
            </Col>
            <Col lg={12}>
              <Graph data={graphData} title="Sales on order deliveries" id="container6" />
            </Col>
          </Row>
          <Divider />
          <Row type="flex" justify="space-between">
            <Button>This Month</Button>
            <Button>Previous Month</Button>
            <Button>This Quarter</Button>
            <DatePicker />
            <Button type="primary">Apply</Button>
          </Row>
          <Divider />
          <Graph data={graphData} title="Month graph of all" id="container7" />
        </TabPane>
      </Tabs>
    </div>
  );
};
MerchantDashboardContainer.propTypes = {
  getDailyRecordsList: PropTypes.func,
  dailyList: PropTypes.array,
};

export default MerchantDashboardContainer;
