import {
  Button,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Table,
  Popconfirm,
  Checkbox,
} from "antd";
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import _map from "lodash/map";
import * as moment from "dayjs";
import { VALIDATE_FORM_MESSAGES_TEMPLATE, STATUS } from "../../utils/constants";
import { licensableFeatures } from "../../__mocks__/partner";
import { StatusRadioButtons } from "../StatusRadioButtons/StatusRadioButtons";

const BillingPlanDrawer = props => {
  const {
    visibility,
    close,
    createBillingPlan,
    updateBillingPlan,
    _readOnly,
    print,
    resumeBillingPlan,
    retireBillingPlan,
    suspendBillingPlan,
    getBillingPlanById,
    brands,
    partners,
    editMode,
    id,
    billingPlan,
    cloneBillingPlan,
  } = props;
  const [checkType, setCheckType] = useState("");
  const [rowsSelected, setRowsSelected] = useState([]);

  const statusRadioButtonProps = {
    currentStatus: [
      { code: STATUS.ACTIVE, name: "ACTIVE" },
      { code: STATUS.INACTIVE, name: "INACTIVE" },
      { code: STATUS.COMPLETED, name: "COMPLETED" },
      { code: STATUS.RETIRED, name: "RETIRED" },
    ],
    defaultValue: editMode ? STATUS[billingPlan.status] : STATUS.INACTIVE,
  };
  const brandArr = brands || [];
  const outletArr = partners || []; // filters.Partner;

  useEffect(() => {
    if (visibility && id) {
      console.log(rowsSelected);
      getBillingPlan();
    }
  }, [visibility, id]);
  useEffect(() => {
    if (id && billingPlan.partner) {
      const data = licensableFeatures.filter(item => item.status).map(item => item.feature);
      setRowsSelected(data);
      setFormValues();
    }
  }, [billingPlan]);

  const setFormValues = () => {
    form.setFieldsValue({
      brandCode: billingPlan.partner.brand.name,
      partnerCode: billingPlan.partner.name,
      status: statusRadioButtonProps.defaultValue,
      type: billingPlan.type,
      subscriptionFee: billingPlan.subscriptionAmount,
      // fixedAmountBilling:billingPlan
      commissionPercentage: billingPlan.commissionPercentage,
      hybridOption: billingPlan.hybridOption,
      date: [moment(billingPlan.startDate), moment(billingPlan.endDate)],
    });
    if (billingPlan.type) {
      setCheckType(billingPlan.type);
    }
  };
  const getBillingPlan = () => {
    getBillingPlanById(id);
  };

  const renderStatusColumn = (status, feature) => {
    if (feature === "emailing_volume" || feature === "push_notification_volume" || feature === "sms_messaging_volume") {
      return (
        <Form.Item name={feature}>
          <Input style={{ border: "none" }} placeholder="1000" />
        </Form.Item>
      );
    }
    return (
      <span>
        <Checkbox defaultChecked={id ? status : false} onChange={() => onSelectChange(feature)} />
      </span>
    );
  };

  const Option = Select;
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const columns = [
    {
      title: "Licensable Features",
      dataIndex: "feature",
      key: "feature",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status, record) => renderStatusColumn(status, record.feature),
    },
  ];
  const dataSource = licensableFeatures;
  const feature = str => {
    const obj = {};
    if (rowsSelected.includes(str)) {
      obj.feature = str;
      obj.status = true;
    } else {
      obj.feature = str;
      obj.status = false;
    }
    return obj;
  };
  const onFinish = values => {
    const merchantLogin = feature("merchant_login");
    const reports = feature("reports");
    const viewConsumers = feature("view_consumers");
    const consumerMessaging = feature("consumer_messaging");
    const areaMarketing = feature("area_marketing");
    const smsMessagingVolume = values.sms_messaging_volume;
    const pushNotificationVolume = values.push_notification_volume;
    const emailingVolume = values.emailing_volume;
    const menuManagement = feature("menu_management");
    const discountManagement = feature("discount_management");
    const orderManagementDashboard = feature("order_management_dashboard");
    const bogoDispatchRider = feature("bogo_dispatch_rider");

    const [start, end] = values.date || [];
    const startDate = start.valueOf();
    const endDate = end.valueOf();
    const data = {};
    data.licensableFeatures = [
      merchantLogin,
      reports,
      viewConsumers,
      consumerMessaging,
      areaMarketing,
      smsMessagingVolume,
      pushNotificationVolume,
      emailingVolume,
      menuManagement,
      discountManagement,
      orderManagementDashboard,
      bogoDispatchRider,
    ];
    data.partnerCode = values.partnerCode;
    data.status = statusRadioButtonProps.defaultValue;
    data.type = values.type;
    data.hybridOption = values.hybridOption;
    data.subscriptionAmount = values.subscriptionFee;
    data.commissionPercentage = values.commissionPercentage;
    data.startDate = startDate;
    data.endDate = endDate;

    if (id) {
      updateBillingPlan(id, data);
      onReset();
    } else {
      createBillingPlan(data);
      onReset();
    }
    setRowsSelected([]);
  };
  const onReset = () => {
    form.resetFields();
    setRowsSelected([]);
    close();
  };

  const onTypeChange = () => {
    const { type } = form.getFieldsValue();
    setCheckType(type);
    console.log(checkType);
  };

  // const _onResume = async () => {
  //   await resumeBillingPlan(id);
  // };
  // const _onSuspend = async () => {
  //   await suspendBillingPlan(id);
  // };
  // const _onRetire = async () => {
  //   await retireBillingPlan(id);
  // };
  // const _cloneLast = () => {
  //   cloneBillingPlan(id);
  // };

  const onSelectChange = selectedRowKeys => {
    if (rowsSelected.includes(selectedRowKeys)) {
      const features = rowsSelected.filter(item => item !== selectedRowKeys);
      setRowsSelected(features);
    } else {
      rowsSelected.push(selectedRowKeys);
    }
  };

  return (
    <Fragment>
      <Drawer
        destroyOnClose
        footer={
          <div className="text-right">
            <Row justify="end">
              <Button className="action-btn mg-right-8" onClick={onReset}>
                Cancel
              </Button>
              {_readOnly ? (
                <Button className="action-btn mg-right-8" type="primary" htmlType="submit" form="BillingPlan">
                  Save
                </Button>
              ) : (
                <Button className="action-btn mg-right-8" type="primary" htmlType="submit" form="BillingPlan">
                  Create
                </Button>
              )}
            </Row>
            {/* {_readOnly ? (
              <Row justify="space-between">
                <Button onClick={() => _cloneLast()}>Clone Last</Button>
                <Popconfirm
                  title="Want to Resume"
                  onConfirm={() => _onResume()}
                  onCancel={() => {}}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button>Resume</Button>
                </Popconfirm>
                <Popconfirm
                  title="Want to Suspend"
                  onConfirm={() => _onSuspend()}
                  onCancel={() => {}}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button>Suspend</Button>
                </Popconfirm>
                <Popconfirm
                  title="Want to Retire"
                  onConfirm={() => _onRetire()}
                  onCancel={() => {}}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button>Retire</Button>
                </Popconfirm>
                <Button onClick={() => print(billingPlan.code)} type="primary">
                  Print
                </Button>
              </Row>
            ) : (
              <></>
            )} */}
          </div>
        }
        width={720}
        id="drawer"
        title={
          <Row type="flex" justify="space-between">
            <h2>Create Billing Plan</h2>
            <Form.Item>
              <Select placeholder="Select a option" allowClear>
                <Option value="copyFrom">Copy From</Option>
                <Option value="copyLast">Copy Last</Option>
              </Select>
            </Form.Item>
          </Row>
        }
        placement="right"
        closable={false}
        maskClosable={false}
        visible={visibility}
      >
        <Form
          id="BillingPlan"
          form={form}
          labelCol={{ span: 8 }}
          layout="vertical"
          onFinish={onFinish}
          validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
        >
          <Form.Item label="Brand Name" name="brandCode">
            <Select
              showSearch
              placeholder="Select Brand"
              optionFilterProp="children"
              disabled={_readOnly}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {_map(brandArr, item => (
                <Select.Option key={item.code} value={item.code}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Business Partner" name="partnerCode">
            <Select
              showSearch
              placeholder="Select Outlet"
              optionFilterProp="children"
              disabled={_readOnly}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {_map(outletArr, item => (
                <Select.Option key={item.code} value={item.code}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Billing Plan Status" className="text-left" name="status">
            <StatusRadioButtons
              currentStatus={statusRadioButtonProps.currentStatus}
              defaultValue={statusRadioButtonProps.defaultValue}
            />
          </Form.Item>
          <Form.Item label="Billing Plan Type" name="type" rules={[{ required: true }]}>
            <Select onChange={onTypeChange} placeholder="Select a option" allowClear>
              <Option value="SUBSCRIPTION">Subscription</Option>
              <Option value="COMMISSION">Commission</Option>
              <Option value="HYBRID">Hybrid</Option>
            </Select>
          </Form.Item>
          {checkType === "COMMISSION" ? (
            <Form.Item label="Commission %" name="commissionPercentage" rules={[{ required: true }]}>
              <Input placeholder="Commission Percentage" autoComplete="off" />
            </Form.Item>
          ) : (
            <></>
          )}
          {checkType === "SUBSCRIPTION" ? (
            <Form.Item label="Monthly Subscription" name="subscriptionFee" rules={[{ required: true }]}>
              <Input placeholder="Subscription Fee" autoComplete="off" />
            </Form.Item>
          ) : (
            <></>
          )}
          {checkType === "HYBRID" ? (
            <>
              <Form.Item label="Fixed Amount Billing" rules={[{ required: true }]} name="fixedAmountBilling">
                <Input placeholder="Fixed Amount Billing" autoComplete="off" />
              </Form.Item>
              <Form.Item label="Commission Percentage" name="commissionPercentage" rules={[{ required: true }]}>
                <Input placeholder="Commission Percentage" autoComplete="off" />
              </Form.Item>
              <Form.Item label="Billing Operation" name="hybridOption" rules={[{ required: true }]}>
                <Select placeholder="Select a option" allowClear>
                  <Option value="ADDITION">Addition</Option>
                  <Option value="MAXIMUM">Maximum</Option>
                  <Option value="MINIMUM">Minimum</Option>
                </Select>
              </Form.Item>
            </>
          ) : (
            <></>
          )}
          <Form.Item label="Plan Valid Period" name="date">
            <RangePicker format="DD/MM/YYYY" />
          </Form.Item>
          <Divider />
          <Table scroll={{ y: 400 }} bordered dataSource={dataSource} columns={columns} pagination={false} />
        </Form>
      </Drawer>
    </Fragment>
  );
};

BillingPlanDrawer.propTypes = {
  visibility: PropTypes.bool,
  _readOnly: PropTypes.bool,
  close: PropTypes.func,
  createBillingPlan: PropTypes.func,
  updateBillingPlan: PropTypes.func,
  print: PropTypes.func,
  resumeBillingPlan: PropTypes.func,
  suspendBillingPlan: PropTypes.func,
  retireBillingPlan: PropTypes.func,
  getBillingPlanById: PropTypes.func,
  brands: PropTypes.array,
  partners: PropTypes.array,
  editMode: PropTypes.bool,
  id: PropTypes.string,
  billingPlan: PropTypes.object,
  cloneBillingPlan: PropTypes.func,
};

export default BillingPlanDrawer;
