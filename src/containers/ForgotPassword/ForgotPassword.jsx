import React from "react";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, Divider } from "antd";
import { VALIDATE_FORM_MESSAGES_TEMPLATE } from "../../utils/constants";
import "./ForgotPassword.scss";
import AuthLayout from "../../components/AuthLayout";

const ForgotPasswordContainer = () => {
  const [form] = Form.useForm();

  const onFormFinish = values => {
    console.log("VALUES:---", values);
  };

  return (
    <AuthLayout>
      <Divider orientation="left" className="form-divider first">
        Forgot Password
      </Divider>
      <Form
        noValidate
        className="EditAdmin"
        form={form}
        name="nest-messages"
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Form.Item name="email" rules={[{ label: "Email", required: true, type: "email" }]}>
          <Input type="email" prefix={<Icon type="mail" className="input-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" block>
            Reset Password
          </Button>
          <div className="text-right">
            <Link to="/">Back to login</Link>
          </div>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default ForgotPasswordContainer;
