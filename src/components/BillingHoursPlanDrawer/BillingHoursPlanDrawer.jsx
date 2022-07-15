/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Drawer, Col, Row, Form, Select, TimePicker, Input } from "antd";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import * as moment from "dayjs";
import { VALIDATE_FORM_MESSAGES_TEMPLATE } from "../../utils/constants";

const BillingHoursPlanDrawer = props => {
  const { visibility, close, onSave, BussinessHours } = props;
  const weekArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const [form] = Form.useForm();
  const { RangePicker } = TimePicker;
  const Option = Select;
  const onFinish = values => {
    //   creating a monday Object
    const monday = {};
    let rangeTimeValue = values.MondayPeriod;
    monday.status = values.Monday;
    monday.openingTime = rangeTimeValue[0].valueOf();
    monday.closingTime = rangeTimeValue[1].valueOf();
    monday.note = values.MondayNote;
    //   creating a tuesday Object
    const tuesday = {};
    rangeTimeValue = values.TuesdayPeriod;
    tuesday.status = values.Tuesday;
    tuesday.openingTime = rangeTimeValue[0].valueOf();
    tuesday.closingTime = rangeTimeValue[1].valueOf();
    tuesday.note = values.TuesdayNote;
    //   creating a Wednesday Object
    const wednesday = {};
    rangeTimeValue = values.WednesdayPeriod;
    wednesday.status = values.Wednesday;
    wednesday.openingTime = rangeTimeValue[0].valueOf();
    wednesday.closingTime = rangeTimeValue[1].valueOf();
    wednesday.note = values.WednesdayNote;
    //   creating a thursday Object
    const thursday = {};
    rangeTimeValue = values.ThursdayPeriod;
    thursday.status = values.Thursday;
    thursday.openingTime = rangeTimeValue[0].valueOf();
    thursday.closingTime = rangeTimeValue[1].valueOf();
    thursday.note = values.ThursdayNote;
    //   creating a friday Object
    const friday = {};
    rangeTimeValue = values.FridayPeriod;
    friday.status = values.Friday;
    friday.openingTime = rangeTimeValue[0].valueOf();
    friday.closingTime = rangeTimeValue[1].valueOf();
    friday.note = values.FridayNote;
    //   creating a saturday Object
    const saturday = {};
    saturday.status = values.saturday;
    saturday.note = values.saturdayNote;
    //   creating a sunday Object
    const sunday = {};
    sunday.status = values.sunday;
    sunday.note = values.sundayNote;

    const weeklyBussinessHours = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
    console.log(weeklyBussinessHours);
    onSave(weeklyBussinessHours);
    onReset();
  };
  const onReset = () => {
    form.resetFields();
    close();
  };
  const setFormValues = () => {
    form.setFieldsValue({
      Monday: BussinessHours[0].status,
      MondayPeriod: getTimePeriod(BussinessHours[0]),
      MondayNote: BussinessHours[0].note,
      Tuesday: BussinessHours[1].status,
      TuesdayPeriod: getTimePeriod(BussinessHours[1]),
      TuesdayNote: BussinessHours[1].note,
      Wednesday: BussinessHours[2].status,
      WednesdayPeriod: getTimePeriod(BussinessHours[2]),
      WednesdayNote: BussinessHours[2].note,
      Thursday: BussinessHours[3].status,
      ThursdayPeriod: getTimePeriod(BussinessHours[3]),
      ThursdayNote: BussinessHours[3].note,
      Friday: BussinessHours[4].status,
      FridayPeriod: getTimePeriod(BussinessHours[4]),
      FridayNote: BussinessHours[4].note,
      saturday: BussinessHours[5].status,
      saturdayNote: BussinessHours[5].note,
      sunday: BussinessHours[6].status,
      sundayNote: BussinessHours[6].note,
    });
  };
  const getTimePeriod = BussinessHoursPeriod => {
    const openingTime = BussinessHoursPeriod.openingTime ? moment(BussinessHoursPeriod.openingTime) : undefined;
    const closingTime = BussinessHoursPeriod.closingTime ? moment(BussinessHoursPeriod.closingTime) : undefined;
    const period = [openingTime, closingTime];
    return period;
  };
  useEffect(() => {
    if (BussinessHours.length) {
      setFormValues();
    }
  }, []);

  return (
    <Drawer
      footer={
        <div className="text-right">
          <Row justify="end">
            <Button className="action-btn mg-right-8" onClick={close}>
              Cancel
            </Button>
            <Button className="action-btn mg-right-8" type="primary" htmlType="submit" form="BillingHoursPlan">
              Save
            </Button>
          </Row>
        </div>
      }
      width={550}
      title="Manage Weekly Business Hours Plan"
      placement="right"
      closable={false}
      maskClosable={false}
      visible={visibility}
    >
      <h4>Define business opening and closing hour for each day </h4>
      <Form
        id="BillingHoursPlan"
        // hideRequiredMark
        form={form}
        onFinish={onFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        {weekArray.map(item => (
          <>
            <Row type="flex" justify="space-around">
              <label>{item}</label>
              <Form.Item name={`${item}`} rules={[{ required: true }]}>
                <Select placeholder="Select a option" allowClear>
                  <Option value="Limited time">Limited time</Option>
                  <Option value="Full day 24h">Full day 24h</Option>
                  <Option value="Day off">Day off</Option>
                </Select>
              </Form.Item>
              <Form.Item name={`${item}Period`} rules={[{ required: true }]}>
                <RangePicker />
              </Form.Item>
            </Row>
            <Row>
              <Form.Item name={`${item}Note`} style={{ width: "80%", marginLeft: 85 }}>
                <Input.TextArea
                  maxLength="500"
                  rows={1}
                  name={`${item}Note`}
                  placeholder={`${item} (availibility) note`}
                />
              </Form.Item>
            </Row>
          </>
        ))}
        <Row type="flex" justify="">
          <label style={{ marginRight: 30 }}>Saturday</label>
          <Form.Item name="saturday" rules={[{ required: true }]}>
            <Select placeholder="Select a option" allowClear>
              <Option value="Limited time">Limited time</Option>
              <Option value="Full day 24h">Full day 24h</Option>
              <Option value="Day off">Day off</Option>
            </Select>
          </Form.Item>
        </Row>
        <Row>
          <Form.Item name="saturdayNote" style={{ width: "80%", marginLeft: 85 }}>
            <Input.TextArea maxLength="500" rows={1} placeholder="Saturday (availibility) note" />
          </Form.Item>
        </Row>
        <Row type="flex" justify="">
          <label style={{ marginRight: 30 }}>Sunday</label>
          <Form.Item name="sunday" rules={[{ required: true }]}>
            <Select placeholder="Select a option" allowClear>
              <Option value="Limited time">Limited time</Option>
              <Option value="Full day 24h">Full day 24h</Option>
              <Option value="Day off">Day off</Option>
            </Select>
          </Form.Item>
        </Row>
        <Row>
          <Form.Item name="sundayNote" style={{ width: "80%", marginLeft: 85 }}>
            <Input.TextArea maxLength="500" rows={1} placeholder="Sunday (availibility) note" />
          </Form.Item>
        </Row>
      </Form>
    </Drawer>
  );
};

BillingHoursPlanDrawer.propTypes = {
  visibility: PropTypes.bool,
  close: PropTypes.func,
  onSave: PropTypes.func,
  BussinessHours: PropTypes.array,
};

export default BillingHoursPlanDrawer;
