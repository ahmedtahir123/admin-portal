import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Radio, Spin, Divider, Popconfirm, InputNumber } from "antd";
import PropTypes from "prop-types";
import * as moment from "dayjs";
import { useParams } from "react-router-dom";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import ROUTES from "../../routes/constant.route";
import Avatar from "../../images/avatar.svg";
import { VALIDATE_FORM_MESSAGES_TEMPLATE, CONFIRM_MESSAGE, DATE_FORMAT_TIME } from "../../utils/constants";
import PageTitle from "../../components/PageTitle/PageTitle";
import { numberOnly } from "../../utils/utils";

import "./AddEditAdmin.scss";
import "../../styles/_helpers.scss";

const AddEditAdminContainer = ({
  selected,
  loading,
  getUserById,
  updateUser,
  addAdminUser,
  deleteAdminUser,
  history,
  enableDisableAdmin,
}) => {
  const { id } = useParams();
  const isEditView = !!id;
  const [form] = Form.useForm();
  const [displayPic, setDisplayPic] = useState("");

  const _deleteAdmin = async () => {
    try {
      await deleteAdminUser(id);
      history.push(ROUTES.ADMIN_MANAGEMENT.path);
    } catch (error) {
      console.log("merchant del error", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAdminUserDetail(id);
    }
  }, [id]);

  useEffect(() => {
    if (!_isEmpty(selected) && !loading) {
      setFormValues();
    }
  }, [selected, loading]);

  // on Component did mount
  useEffect(() => {
    if (form) {
      form.resetFields();
    }
    // return () => { TODO: should work on Component unMount
    //   if (form) {
    //     form.resetFields();
    //   }
    // };
  }, [form]);

  const setFormValues = () => {
    form.setFieldsValue({
      userId: selected.userId,
      fullName: selected.fullName,
      firstName: selected.firstName,
      lastName: selected.lastName,
      emailAddress: selected.emailAddress,
      userMetaData: selected.userMetaData,
      cellPhoneNumber: selected.cellPhoneNumber,
    });
    if (selected.displayPicture) {
      setDisplayPic(selected.displayPicture);
    }
  };

  const onFormFinish = async fieldsValues => {
    const headers = {
      "is-enabled": fieldsValues.userMetaData.isEnabled,
    };

    const fullName = `${fieldsValues.firstName} ${fieldsValues.lastName}`;
    const values = {
      ...fieldsValues,
      fullName,
    };
    try {
      if (id) {
        await updateUser(id, { ...selected, ...values }, headers);
      } else {
        await addAdminUser(values, { headers });
      }
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAdminUserDetail = async userId => {
    await getUserById(userId);
  };

  const _changePassword = () => {
    history.push({
      pathname: `${ROUTES.CHANGE_PASSWORD.path}/${id}`,
      state: { userName: selected.emailAddress, page: "admin" },
    });
  };

  const onEnableClick = () => {
    if (id) {
      enableDisableAdmin(id, true);
    }
  };

  const onDisableClick = () => {
    if (id) {
      enableDisableAdmin(id, false);
    }
  };
  const createdAt = _get(selected, "createdAt", "") ? moment(selected.createdAt).format(DATE_FORMAT_TIME) : "";
  const updatedAt = _get(selected, "updatedAt", "") ? moment(selected.updatedAt).format(DATE_FORMAT_TIME) : "";
  return (
    <>
      {loading ? (
        <div className="edit-form__spin">
          <Spin size="large" tip="Loading ..." />
        </div>
      ) : null}
      <PageTitle title={isEditView ? "Edit Admin" : "Add Admin"} />
      <Form
        className="AddUser"
        form={form}
        layout="vertical"
        name="nest-messages"
        initialValues={{ userMetaData: { isEnabled: true } }}
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
                <Input.Password />
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
              <Input placeholder="03001234567" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item className="text-left mg-top-40" name={["userMetaData", "isEnabled"]}>
              <Radio.Group>
                <Radio.Button value>Enabled</Radio.Button>
                <Radio.Button value={false}>Disabled</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="">
              <div className="bg-gray text-center">
                {/* <div className="bg-gray"> */}
                {/* {displayPic ? (
                    <img src={displayPic} alt="avatar" width={275} />
                  ) : (
                    <img src={avatar} alt="avatar" width={275} />
                  )} */}
                {/* </div> */}
                <img src={displayPic || Avatar} alt="avatar" width={275} />
              </div>
            </Form.Item>
            {isEditView ? (
              <div className="text-right mg-top-10">
                <Button type="primary" onClick={_changePassword}>
                  Change Password
                </Button>
              </div>
            ) : null}
          </Col>
        </Row>

        <Divider />

        {isEditView ? (
          <Row className="fields-row" gutter={20}>
            <Col span={8} xs={24} sm={8} lg={8}>
              Created By: {_get(selected, "createdBy", "")}
              <br />
              Created At: {createdAt}
              <br />
              Last Modify By: {_get(selected, "updatedBy", "")}
              <br />
              Last Modify At: {updatedAt}
            </Col>
            <Col span={8} xs={24} sm={16} lg={16}>
              <Row className="fields-row" gutter={24} type="flex">
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  <Popconfirm
                    title={CONFIRM_MESSAGE.DELETE}
                    onConfirm={_deleteAdmin}
                    onCancel={() => {}}
                    okText="Yes"
                    cancelText="No"
                    disabled
                  >
                    <Button type="danger" disabled>
                      Delete
                    </Button>
                  </Popconfirm>
                </Col>
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  <Form.Item>
                    <Button type="info" onClick={() => history.push(ROUTES.ADMIN_MANAGEMENT.path)}>
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
        ) : (
          <Row className="fields-row" justify="end" type="flex">
            <Col>
              <Button
                className="action-btn mg-right-50"
                type="info"
                onClick={() => history.push(ROUTES.ADMIN_MANAGEMENT.path)}
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
    </>
  );
};

AddEditAdminContainer.propTypes = {
  addAdminUser: PropTypes.func,
  selected: PropTypes.object,
  getUserById: PropTypes.func,
  updateUser: PropTypes.func,
  deleteAdminUser: PropTypes.func,
  loading: PropTypes.bool,
  history: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
};
export default AddEditAdminContainer;
