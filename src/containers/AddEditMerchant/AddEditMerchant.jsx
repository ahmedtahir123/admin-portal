import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Row,
  Col,
  Divider,
  Select,
  Spin,
  Table,
  InputNumber,
  Popconfirm,
  Skeleton,
  Switch,
} from "antd";
import PropTypes from "prop-types";
import "../../styles/_helpers.scss";
import * as moment from "dayjs";
import { useParams } from "react-router-dom";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import _map from "lodash/map";
import { numberOnly } from "../../utils/utils";

import defaultLogo from "../../images/listing-card.svg";
import avatar from "../../images/avatar.svg";
import errorLogo from "../../images/invalidLogo.svg";

import { STATUS, VALIDATE_FORM_MESSAGES_TEMPLATE, CONFIRM_MESSAGE, DATE_FORMAT_TIME } from "../../utils/constants";
import { merchantTableData, merchantList } from "../../__mocks__/merchantTableData";
import ROUTES from "../../routes/constant.route";
import ChangePartnerProvider from "../../providers/changePartner.provider";
import PageTitle from "../../components/PageTitle/PageTitle";
import { StatusRadioButtons } from "../../components/StatusRadioButtons/StatusRadioButtons";
import permissionsUtil from "../../utils/permissions.util";

const { Option } = Select;

const AddEditMerchantContainer = ({
  addMerchantUser,
  getUserById,
  updateMerchant,
  loading,
  merchant,
  deleteMerchant,
  history,
  clearMerchant,
  partner,
  partnerLoading,
  changeRole,
  verifyMerchant,
  clearPartner,
}) => {
  const [isPartnerDrawerVisible, setIsPartnerDrawerVisible] = useState(false);
  const [displayPic, setDisplayPic] = useState();
  const [partnerDataObj, setPartner] = useState({});
  const [errorImage, setErrorImage] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const isEditView = !!id;
  const canViewEnableDisable = permissionsUtil.checkAuth({
    category: "UserManagement",
    subCategory: "Merchant",
    action: "ViewEnableDisable",
  });

  const canEditPermission = permissionsUtil.checkAuth({
    category: "UserManagement",
    subCategory: "Merchant",
    action: "EditPermission",
  });

  const canDelete = permissionsUtil.checkAuth({
    category: "UserManagement",
    subCategory: "Merchant",
    action: "EditDelete",
  });
  const canCancel = permissionsUtil.checkAuth({
    category: "UserManagement",
    subCategory: "Merchant",
    action: "EditCancel",
  });
  const canChangePartner = permissionsUtil.checkAuth({
    category: "UserManagement",
    subCategory: "Merchant",
    action: "EditPartner",
  });
  const canEditMerchantRole = permissionsUtil.checkAuth({
    category: "UserManagement",
    subCategory: "Merchant",
    action: "EditMerchantRole",
  });

  const columns = [
    {
      title: "Panel",
      dataIndex: "panel",
    },
    {
      title: "Allows",
      dataIndex: "allows",
      render: status => <Switch defaultChecked={status || false} disabled={!canEditPermission} />,
    },
  ];

  useEffect(() => {
    if (id) {
      fetchUserDetail(id);
    }
  }, [id]);

  useEffect(() => {
    if (!_isEmpty(merchant) && !loading && isEditView) {
      setFormValues();
    }
  }, [merchant, loading]);

  // on Component did mount
  useEffect(() => {
    if (form) {
      form.resetFields();
      setPartner({});
    }
    // TODO: should work on Component unMount
    return () => {
      if (isEditView) {
        clearMerchant({});
        clearPartner({});
        setPartner({});
      }
    };
  }, [form]);

  useEffect(() => {
    if (!_isEmpty(merchant.partnerId) && !_isEmpty(partner)) {
      const partnerObj = partner;
      setPartner(partnerObj || {});
      form.setFieldsValue({
        partnerDataObj: partnerObj || {},
      });
    }
  }, [partner]);

  const fetchUserDetail = async userId => {
    await getUserById(userId);
  };

  const _deleteMerchant = async () => {
    try {
      await deleteMerchant(id);
      history.push(ROUTES.MERCHANT_MANAGEMENT.path);
    } catch (error) {
      console.log(error);
    }
  };

  const onFormFinish = async fieldValues => {
    const fullName = `${fieldValues.firstName} ${fieldValues.lastName}`;
    const partnerId = partnerDataObj.code;
    delete fieldValues.partnerDataObj;
    const values = {
      ...fieldValues,
      partnerId,
      fullName,
    };
    const headers = {
      "is-enabled": fieldValues.userMetaData.isEnabled,
    };
    try {
      if (isEditView) {
        await updateMerchant(id, { ...merchant, ...values }, { headers });
        if (fieldValues.merchantRole !== merchant.merchantRole) {
          await changeRole({ userId: id, merchantRole: fieldValues.merchantRole });
        }
      } else {
        await addMerchantUser(values, { headers });
      }
      if (canDelete) {
        history.push(ROUTES.MERCHANT_MANAGEMENT.path);
      }
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
    defaultValue: isEditView ? _get(merchant, "userMetaData.status", STATUS.NON_VERIFIED) : STATUS.NON_VERIFIED,
  };

  const selectedPartner = param => {
    if (!_isEmpty(param)) {
      param = { ...param, name: `${param.name}, ${param.address}` };
      setPartner(param);
      form.setFieldsValue({
        partnerDataObj: param,
      });
    }
  };

  // const partnerLogo = _get(partnerDataObj, "card");
  const partnerLogo = errorImage ? errorLogo : (partnerDataObj && partnerDataObj.card) || defaultLogo;

  console.log("partnerLogo", partnerDataObj, partnerLogo);
  const createdAt = _get(merchant, "createdAt", "") ? moment(merchant.createdAt).format(DATE_FORMAT_TIME) : "";
  const updatedAt = _get(merchant, "updatedAt", "") ? moment(merchant.updatedAt).format(DATE_FORMAT_TIME) : "";

  const verifyMerchantReq = () => {
    verifyMerchant(id);
  };

  return (
    <>
      {loading ? (
        <div className="edit-form__spin">
          <Spin size="large" tip="Loading ..." />
        </div>
      ) : null}
      <PageTitle title={isEditView ? "Edit Merchant" : "Add Merchant"} />
      <Form
        className="AddMerchant"
        form={form}
        initialValues={{ userMetaData: { isEnabled: true, status: "NOT_VERIFIED" } }}
        layout="vertical"
        name="nest-messages"
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            {isEditView ? (
              <Form.Item label="User Code" name="userId">
                <Input placeholder="User Code" readOnly />
              </Form.Item>
            ) : null}
            <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item label="Email" name="emailAddress" rules={[{ required: true, type: "email" }]}>
              <Input placeholder="Email" readOnly={isEditView} />
            </Form.Item>
            {!isEditView ? (
              <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                <Input.Password placeholder="Password" />
              </Form.Item>
            ) : null}
            <Form.Item
              label="Cell Number"
              name="cellPhoneNumber"
              rules={[
                {
                  required: true,
                  max: 20,
                },
                numberOnly,
              ]}
            >
              <Input className="input-number-full-width" placeholder="03001234567" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={12}>
            {canViewEnableDisable && (
              <Form.Item className="text-left mg-top-40" name={["userMetaData", "isEnabled"]}>
                <Radio.Group>
                  <Radio.Button value>Enabled</Radio.Button>
                  <Radio.Button value={false}>Disabled</Radio.Button>
                </Radio.Group>
              </Form.Item>
            )}
            <Form.Item className="text-left" label="Current Status" name={["userMetaData", "status"]}>
              <StatusRadioButtons
                currentStatus={statusRadioButtonProps.currentStatus}
                defaultValue={statusRadioButtonProps.defaultValue}
              />
            </Form.Item>

            <Form.Item className="text-right">
              <Button
                type="primary"
                onClick={verifyMerchantReq}
                disabled={STATUS.VERIFIED === _get(merchant, "userMetaData.status", "")}
              >
                Verify Merchant
              </Button>
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

            {isEditView ? (
              <div className="mg-top-10">
                <Row className="mg-top-40" justify="end" type="flex">
                  <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                    <Form.Item>
                      <Button type="primary" onClick={_changePassword}>
                        Change Password
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            ) : null}
          </Col>
        </Row>

        <Divider />

        {loading ? (
          <Skeleton active avatar />
        ) : (
          <Row className="fields-row" gutter={20} type="flex" justify="space-between" align="middle">
            <Col span={8} xs={24} sm={6} lg={6}>
              <img src={partnerLogo} alt="logo" width={150} height={150} />
            </Col>
            <Col span={8} xs={24} sm={12} lg={12}>
              <Form.Item label="" name={["partnerDataObj", "name"]} className="mg-top-10">
                <Input placeholder="Outlet Name" disabled />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={6} lg={6} className="text-right">
              {canChangePartner ? (
                <Button type="primary" onClick={() => setIsPartnerDrawerVisible(true)}>
                  Add / Change Outlet
                </Button>
              ) : null}
            </Col>
          </Row>
        )}

        <Divider />

        <Row className="fields-row" gutter={20}>
          {canEditMerchantRole && (
            <Col span={8} xs={24} sm={12} lg={12}>
              <Form.Item label="User Type" name="merchantRole" rules={[{ required: true }]}>
                <Select placeholder="Select User Type">
                  {_map(merchantList, type => (
                    <Option key={type} value={type}>
                      {type}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="Permissions">
              <Table columns={columns} dataSource={merchantTableData} bordered scroll={{ y: 240 }} pagination={false} />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        {isEditView ? (
          <Row className="fields-row" gutter={20}>
            <Col span={8} xs={24} sm={8} lg={8}>
              Created By: {_get(merchant, "createdBy", "")}
              <br />
              Created At: {createdAt}
              <br />
              Last Modify By: {_get(merchant, "updatedBy", "")}
              <br />
              Last Modify At: {updatedAt}
            </Col>
            <Col span={8} xs={24} sm={16} lg={16}>
              <Row className="fields-row" gutter={24} type="flex">
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  {canDelete ? (
                    <Form.Item>
                      <Popconfirm
                        title={CONFIRM_MESSAGE.DELETE}
                        onConfirm={_deleteMerchant}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No"
                        disabled
                      >
                        <Button type="danger" disabled>
                          Delete
                        </Button>
                      </Popconfirm>
                    </Form.Item>
                  ) : null}
                </Col>
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  {canCancel ? (
                    <Form.Item>
                      <Button type="info" onClick={() => history.push(ROUTES.MERCHANT_MANAGEMENT.path)}>
                        Cancel
                      </Button>
                    </Form.Item>
                  ) : null}
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
        ) : (
          <Row className="fields-row" justify="end" type="flex">
            <Col>
              <Button
                className="action-btn mg-right-50"
                type="info"
                onClick={() => history.push(ROUTES.MERCHANT_MANAGEMENT.path)}
              >
                Cancel
              </Button>
              <Button className="action-btn" type="primary" htmlType="submit" loading={loading}>
                Create
              </Button>
            </Col>
          </Row>
        )}
      </Form>
      <ChangePartnerProvider
        visible={isPartnerDrawerVisible}
        onSave={selectedPartner}
        close={() => {
          setIsPartnerDrawerVisible(false);
        }}
      />
    </>
  );
};

AddEditMerchantContainer.propTypes = {
  addMerchantUser: PropTypes.func,
  getUserById: PropTypes.func,
  updateMerchant: PropTypes.func,
  deleteMerchant: PropTypes.func,
  loading: PropTypes.bool,
  merchant: PropTypes.object,
  history: PropTypes.object,
  clearMerchant: PropTypes.func,
  partner: PropTypes.object,
  partnerLoading: PropTypes.bool,
  changeRole: PropTypes.func,
  verifyMerchant: PropTypes.func,
  clearPartner: PropTypes.func,
};

export default AddEditMerchantContainer;
