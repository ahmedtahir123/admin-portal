import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, Select, Row, Col } from "antd";
import PropTypes from "prop-types";
import { VALIDATE_FORM_MESSAGES_TEMPLATE } from "../../utils/constants";

const EditUserContainer = props => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { user } = props;

  const getUserById = async () => {
    await props.getUserById(id);
  };

  useEffect(() => {
    getUserById();
  }, []);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullname: user.fullname,
        email: user.email,
        user_type: user.user_type,
        cellnumber: user.cellnumber,
        emailAddress: user.contacts,
      });
    }
  }, [user]);

  const onFormFinish = values => {
    console.log("values", values);
  };

  return (
    <Form
      className="EditUser"
      form={form}
      layout="vertical"
      name="nest-messages"
      onFinish={onFormFinish}
      validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
    >
      <Row className="fields-row" gutter={20} type="flex">
        <Col span={8} xs={24} sm={12} lg={8} key="fullname">
          <Form.Item name="fullname" rules={[{ required: true }]}>
            <Input placeholder="Full Name" />
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={12} lg={8} key="email" rules={[{ required: true, type: "email" }]}>
          <Form.Item name="email">
            <Input placeholder="Email" />
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={12} lg={8} key="user_type">
          <Form.Item name="user_type" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="merchant">Merchant</Select.Option>
              <Select.Option value="consumer">Consumer</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <fieldset>
        <legend>Personal Information</legend>

        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={8} key="cellnumber">
            <Form.Item name="cellnumber" rules={[{ required: true, type: "number" }]}>
              <Input placeholder="Cell Number" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={8} key="emailAddress">
            <Form.Item name="emailAddress" rules={[{ required: true }]}>
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
        </Row>
      </fieldset>

      <Row className="fields-row" gutter={20} type="flex">
        <Col xs={24} sm={24} lg={12}>
          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
EditUserContainer.propTypes = {
  getUserById: PropTypes.func,
  user: PropTypes.object,
};
export default EditUserContainer;
