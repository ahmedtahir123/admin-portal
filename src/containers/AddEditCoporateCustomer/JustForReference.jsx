import React from "react";
import { Form, Input, Button, Radio, Row, Col, Typography, Divider, Select, Table } from "antd";
import PropTypes from "prop-types";
import "../../styles/_helpers.scss";
import avatar from "../../images/avatar.png";
import { STATUS, MERCHANT_USER_TYPE, VALIDATE_FORM_MESSAGES_TEMPLATE } from "../../utils/constants";
import { merchantTableData } from "../../__mocks__/merchantTableData";
import FormGenerator from "../../components/FormGenerator/FormGenerator";

const { Text } = Typography;
const { Option } = Select;

const columns = [
  {
    title: "Panel",
    dataIndex: "panel",
    // render: text => <a>{text}</a>,
  },
  {
    title: "Allows",
    dataIndex: "allows",
  },
];

const UpdateCorporateCustomerContainer = ({ addMerchantUser }) => {
  const onFormFinish = values => {
    console.log("values: ", values);
    addMerchantUser(values);
  };
  const data = {
    formProps: {
      className: "AddMerchant",
      initialValues: { status: STATUS.NON_VERIFIED },
      layout: "vertical",
      name: "nest-messages",
      onFinish: onFormFinish,
      validateMessages: VALIDATE_FORM_MESSAGES_TEMPLATE,
    },
    rows: [
      {
        rowProps: { className: "fields-row", gutter: 20, type: "flex" },
        columns: [
          {
            colProps: { span: 8, xs: 24, sm: 24, lg: 12 },
            colItems: [
              {
                type: "input",
                formItemProps: { label: "User ID", name: "id", rules: [{ required: true }] },
                childProps: { placeholder: "User ID", disabled: true },
              },
              {
                type: "input",
                formItemProps: { label: "User Full Name", name: "fullname", rules: [{ required: true }] },
                childProps: { placeholder: "User Full Name", disabled: true },
              },
              {
                type: "input",
                formItemProps: { label: "Email", name: "email", rules: [{ required: true, type: "email" }] },
                childProps: { placeholder: "Email", disabled: true },
              },
              {
                type: "input",
                formItemProps: {
                  label: "Cell Number",
                  name: "cellnumber",
                  rules: [{ required: true, type: "number" }],
                },
                childProps: { placeholder: "Cell Number", disabled: true },
              },
            ],
          },
          {
            colProps: { span: 8, xs: 24, sm: 24, lg: 12 },
            colItems: [
              {
                type: "customFormItem",
                formItemProps: { className: "text-left mg-top-40" },
                component: () => (
                  <Radio.Group>
                    <Radio.Button value>Enabled</Radio.Button>
                    <Radio.Button value={false}>Disabled</Radio.Button>
                  </Radio.Group>
                ),
              },
              {
                type: "customFormItem",
                formItemProps: {
                  className: "text-left",
                  label: "Current Status",
                  name: "status",
                  rules: [{ required: false }],
                },
                component: () => (
                  <Radio.Group>
                    <Radio.Button value={STATUS.VERIFIED}>Non-verified</Radio.Button>
                    <Radio.Button value={STATUS.VERIFIED}>Verified</Radio.Button>
                  </Radio.Group>
                ),
              },
              {
                type: "customFormItem",
                formItemProps: { label: "Display Picture" },
                component: () => (
                  <div className="text-center">
                    <div className="bg-gray">
                      <img src={avatar} alt="avatar" width={275} />
                    </div>
                  </div>
                ),
              },
              {
                type: "custom",
                component: () => (
                  <div className="text-right mg-top-10">
                    <Button type="primary">Change Password</Button>
                  </div>
                ),
              },
            ],
          },
        ],
      },
    ],
  };
  return <FormGenerator data={data} />;
};

UpdateCorporateCustomerContainer.propTypes = {
  addMerchantUser: PropTypes.func,
};

export default UpdateCorporateCustomerContainer;
