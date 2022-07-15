import React from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Form, Icon, Input, Button, Divider } from "antd";
import { VALIDATE_FORM_MESSAGES_TEMPLATE } from "../../utils/constants";
import "./ChangePassword.scss";

const ChangePasswordContainer = ({ location, history, changePassword }) => {
  const { id } = useParams();
  const { userName, page } = location.state;

  console.log(location.state);

  const [form] = Form.useForm();

  const onFormFinish = fieldValues => {
    console.log("VALUES:---", fieldValues);
    const values = {
      newPassword: fieldValues.newPassword,
      confirmPassword: fieldValues.newPassword,
      userId: id,
    };
    changePassword(values, page, history);
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      lg: {
        span: 8,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      lg: {
        span: 8,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      lg: {
        span: 8,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <Divider orientation="left" className="form-divider first">
        <span className="page-title">Change Password</span>
      </Divider>

      <Form
        noValidate
        className="change-password"
        form={form}
        name="nest-messages"
        initialValues={{ userName }}
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
        {...formItemLayout}
      >
        <Form.Item
          name="userName"
          label="Email"
          rules={[
            {
              label: "Email",
              required: true,
              type: "email",
            },
          ]}
        >
          <Input placeholder="Email" disabled />
        </Form.Item>
        <Form.Item
          name="password"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please input new password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The two passwords that you entered do not match!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="login-form-button" block>
            Reset Password
          </Button>
          {/* <div className="text-right">
            <Link to="/">Back to login</Link>
          </div> */}

          <Button
            type="primary"
            className="login-form-button mg-top-10"
            block
            onClick={() => {
              goBack();
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

ChangePasswordContainer.propTypes = {
  changePassword: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object,
};

export default ChangePasswordContainer;
