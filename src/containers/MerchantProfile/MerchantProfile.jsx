import { Button, Col, Divider, Form, Input, InputNumber, Row, Select, Spin, Table } from "antd";
import _isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { StatusRadioButtons } from "../../components/StatusRadioButtons/StatusRadioButtons";
import avatar from "../../images/avatar.png";
import ChangePartnerProvider from "../../providers/changePartner.provider";
import ROUTES from "../../routes/constant.route";
import "../../styles/_helpers.scss";
import { getUser, setUser } from "../../utils/auth.utils";
import { STATUS, VALIDATE_FORM_MESSAGES_TEMPLATE } from "../../utils/constants";
import { merchantList, merchantTableData } from "../../__mocks__/merchantTableData";

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

const MerchantProfileContainer = ({
  getUserById,
  updateMerchant,
  loading,
  merchant,
  history,
  user,
  updateUserInStore,
}) => {
  const [isPartnerDrawerVisible, setIsPartnerDrawerVisible] = useState(false);
  const [displayPic, setDisplayPic] = useState();
  const [form] = Form.useForm();
  const id = getUser("userId") || {};

  useEffect(() => {
    if (id) {
      getUserById(id);
    }
  }, [id]);

  useEffect(() => {
    if (!_isEmpty(merchant) && !loading) {
      setFormValues();
    }
  }, [merchant, loading]);

  // on Component did mount
  useEffect(() => {
    if (form) {
      form.resetFields();
    }
  }, [form]);

  const onFormFinish = async fieldValues => {
    const fullName = `${fieldValues.firstName} ${fieldValues.lastName}`;
    const values = {
      ...fieldValues,
      fullName,
    };
    const headers = {
      "is-enabled": fieldValues.userMetaData.isEnabled,
    };
    try {
      const payload = { ...merchant, ...values };
      await updateMerchant(id, payload, { headers });
      const { firstName, lastName } = payload;
      const _user = { firstName, lastName, fullName: `${firstName} ${lastName}` };

      setUser({ ...getUser(), ..._user });
      await updateUserInStore({ ...user, ..._user });
      history.push(ROUTES.DASHBOARD.path);
    } catch (error) {
      console.log(error);
    }
  };

  const setFormValues = () => {
    form.setFieldsValue({
      userId: merchant.userId,
      fullName: merchant.fullName,
      firstName: merchant.firstName,
      lastName: merchant.lastName,
      emailAddress: merchant.emailAddress,
      cellPhoneNumber: merchant.cellPhoneNumber,
      userMetaData: merchant.userMetaData,
      merchantRole: merchant.merchantRole,
    });
    if (merchant.displayPicture) {
      setDisplayPic(merchant.displayPicture);
    }
  };

  const _changePassword = () => {
    history.push({
      pathname: `${ROUTES.CHANGE_PASSWORD.path}/${id}`,
      state: { userName: merchant.emailAddress, page: "merchant" },
    });
  };

  const statusRadioButtonProps = {
    currentStatus: [
      { code: STATUS.NON_VERIFIED, name: "Not Verified" },
      { code: STATUS.VERIFIED, name: "Verified" },
    ],
    defaultValue: STATUS.NON_VERIFIED,
  };

  return (
    <>
      {loading ? (
        <div className="edit-form__spin">
          <Spin size="large" tip="Loading ..." />
        </div>
      ) : null}
      <PageTitle title="Merchant Profile" />
      <Form
        className="AddMerchant"
        form={form}
        initialValues={{ userMetaData: { isEnabled: false, status: "NOT_VERIFIED" } }}
        layout="vertical"
        name="nest-messages"
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="User Code" name="userId">
              <Input placeholder="User Code" readOnly />
            </Form.Item>
            <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item label="Email" name="emailAddress" rules={[{ required: true, type: "email" }]}>
              <Input placeholder="Email" readOnly />
            </Form.Item>
            <Form.Item label="Cell Number" name="cellPhoneNumber" rules={[{ required: true }]}>
              <InputNumber className="input-number-full-width" placeholder="03001234567" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={12}>
            {/* <Form.Item className="text-left mg-top-40" name={["userMetaData", "isEnabled"]}>
              <Radio.Group>
                <Radio.Button value>Enabled</Radio.Button>
                <Radio.Button value={false}>Disabled</Radio.Button>
              </Radio.Group>
            </Form.Item> */}
            <Form.Item className="text-left" label="Current Status" name={["userMetaData", "status"]}>
              <StatusRadioButtons
                currentStatus={statusRadioButtonProps.currentStatus}
                defaultValue={statusRadioButtonProps.defaultValue}
              />
            </Form.Item>

            <Form.Item label="">
              <div className="text-center">
                <div className="bg-gray">
                  {displayPic ? (
                    <img src={displayPic} alt="avatar" width={275} />
                  ) : (
                    <img src={avatar} alt="avatar" width={275} />
                  )}
                </div>
              </div>
            </Form.Item>

            <div className="mg-top-10">
              <Row className="mg-top-40" justify="space-between" type="flex">
                <Col span={8} xs={24} sm={24} lg={24} className="text-right">
                  <Form.Item>
                    <Button type="primary" onClick={_changePassword}>
                      Change Password
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Divider />

        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={8} lg={4}>
            <img src={avatar} alt="avatar" width={275} />
          </Col>
          <Col span={8} xs={24} sm={8} lg={20} className="mg-top-20">
            <Form.Item label="Outlet" name="partner">
              <Input placeholder="Outlet" readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Divider />

        <Row className="fields-row" gutter={20}>
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="User Type" name="merchantRole" rules={[{ required: true }]}>
              <Select placeholder="Select User Type" disabled>
                {_map(merchantList, type => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="Permissions">
              <Table columns={columns} dataSource={merchantTableData} bordered scroll={{ y: 240 }} pagination={false} />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Row className="fields-row" gutter={20}>
          {/* <Col span={8} xs={24} sm={12} lg={12}>
              Created By: {_get(merchant, "createdBy", "")}
              <br />
              Created At: {_get(merchant, "createdAt", "")}
              <br />
              Last Modify By: {_get(merchant, "updatedBy", "")}
              <br />
              Last Modify At: {_get(merchant, "updatedAt", "")}
            </Col> */}
          <Col span={8} xs={24} sm={24} lg={24}>
            <Row className="fields-row" gutter={24} type="flex">
              <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                <Form.Item>
                  <Button type="info" onClick={() => history.push(ROUTES.DASHBOARD.path)}>
                    Cancel
                  </Button>
                </Form.Item>
              </Col>
              <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Save
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <ChangePartnerProvider
        visible={isPartnerDrawerVisible}
        close={() => {
          setIsPartnerDrawerVisible(false);
        }}
      />
    </>
  );
};

MerchantProfileContainer.propTypes = {
  getUserById: PropTypes.func,
  updateUserInStore: PropTypes.func,
  updateMerchant: PropTypes.func,
  loading: PropTypes.bool,
  merchant: PropTypes.object,
  user: PropTypes.object,
  history: PropTypes.object,
};

export default MerchantProfileContainer;
