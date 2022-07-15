import React from "react";
import { Form, Input, Button, Radio, Row, Col, Typography, Divider, Select, Table } from "antd";
import PropTypes from "prop-types";
import "../../styles/_helpers.scss";
import avatar from "../../images/avatar.png";
import { STATUS, MERCHANT_USER_TYPE, VALIDATE_FORM_MESSAGES_TEMPLATE } from "../../utils/constants";
import { merchantTableData } from "../../__mocks__/merchantTableData";

const { Text } = Typography;
const { Option } = Select;

const formItemTypes = {
  input: item => (
    <Form.Item {...item.formItemProps}>
      <Input {...item.childProps}></Input>
    </Form.Item>
  ),
  customFormItem: item => <Form.Item {...item.formItemProps}>{item.component()}</Form.Item>,
  custom: item => item.component(),
};
const FormGenerator = ({ data }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} {...data.formProps}>
      {data.rows.map(row => (
        <Row {...row.rowProps}>
          {row.columns.map(col => (
            <Col {...col.colProps}>{col.colItems.map(colItem => formItemTypes[colItem.type](colItem))}</Col>
          ))}
        </Row>
      ))}
    </Form>
  );
};

FormGenerator.propTypes = {
  data: PropTypes.object,
};

export default FormGenerator;
