import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";
import PropTypes from "prop-types";
import { Form, Icon, Input, Button, Checkbox, Radio } from "antd";
import { toastMessage } from "../../utils/utils";
import { VALIDATE_FORM_MESSAGES_TEMPLATE } from "../../utils/constants";
import AuthLayout from "../../components/AuthLayout";
import ROUTES from "../../routes/constant.route";
import CustomIcon from "../../components/CustomIcon/CustomIcon";

const LoginContainer = ({ login, history, loading }) => {
  const [form] = Form.useForm();
  const [plainMessage, setPlainMessage] = useState(null);

  const onFormFinish = values => {
    // setUserType(values.userType);
    const { userType } = values;
    setPlainMessage(null);
    login(values, history)
      .then(() => {
        // if (userType === "MERCHANT") {
        //   history.push(ROUTES.MERCHANT_DASHBOARD.path);
        //   toastMessage("success", "", "Welcome");
        // } else {
        history.push(ROUTES.DASHBOARD.path);
        toastMessage("success", "", "Welcome");
        // }
      })
      .catch(error => {
        console.log(error);
        if (error.message === "This password is not correct" || error.message === "User not found") {
          setPlainMessage("Invalid Credentials");
        } else {
          setPlainMessage(error);
        }
      });
  };

  return (
    <AuthLayout>
      <Form
        className="login-form"
        form={form}
        layout="vertical"
        name="nest-messages"
        initialValues={{ userType: "MERCHANT" }}
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Form.Item
          className="text-left"
          name="userType"
          rules={[{ require: true, message: "Please select user type!" }]}
        >
          <Radio.Group>
            <Radio.Button value="MERCHANT">Merchant</Radio.Button>
            <Radio.Button value="ADMIN">Admin</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="emailAddress"
          // label="Email"
          rules={[
            {
              label: "Email",
              required: true,
              // message: "Please input your email!",
              type: "email",
            },
          ]}
        >
          <Input prefix={<CustomIcon name="UserOutlined" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password prefix={<CustomIcon name="LockOutlined" />} placeholder="Password" />
        </Form.Item>
        {/* <Form.Item name="remember">
          <Checkbox className="float-left">Remember me</Checkbox>
        </Form.Item> */}
        <Form.Item>
          <Link to="/forgot-password" className="float-right">
            Forgot password
          </Link>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="clearfix w-pc-100">
            Log in
          </Button>
        </Form.Item>
        {plainMessage ? <p>* {plainMessage}</p> : null}
      </Form>
    </AuthLayout>
  );
};

LoginContainer.propTypes = {
  history: PropTypes.object,
  login: PropTypes.func,
  loading: PropTypes.bool,
};
export default LoginContainer;
