import { Button, Col, Divider, Form, Input, Popconfirm, Radio, Row, Select, Spin } from "antd";
import * as moment from "dayjs";
import JoditEditor from "jodit-react";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import PropTypes from "prop-types";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import ROUTES from "../../routes/constant.route";
import "../../styles/_helpers.scss";
import { CONFIRM_MESSAGE, DATE_FORMAT_TIME, VALIDATE_FORM_MESSAGES_TEMPLATE } from "../../utils/constants";
import { numberOnly } from "../../utils/utils";
import "./AddEditBaitussalamWeb&AppPublicationCategoryManagement.scss";

const AddEditBaitussalamWebAndAppPublicationCategoryManagementContainer = ({
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
  const { Option } = Select;

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
      <PageTitle title={isEditView ? "Edit Publication Category" : "Add Publication Category"} />
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
            <Form.Item label="Name" name="Name" rules={[{ required: true }]}>
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item label="Parent Category" name="Parent Category" rules={[{ required: true }]}>
              <Select placeholder="Parent Category">
                {_map([], city => (
                  <Option key={city.code} value={city.code}>
                    {city.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Description" name="Description" rules={[{ required: true }]}>
              <JoditEditor onBlur={newContent => {}} />
            </Form.Item>
            <Form.Item label="Display order" name="Display order" rules={[{ required: true }]}>
              <Input placeholder="Display order" readOnly={isEditView} />
            </Form.Item>
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
                <Radio.Button value>Active</Radio.Button>
                <Radio.Button value={false}>In Active</Radio.Button>
              </Radio.Group>
            </Form.Item>
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

AddEditBaitussalamWebAndAppPublicationCategoryManagementContainer.propTypes = {
  addAdminUser: PropTypes.func,
  selected: PropTypes.object,
  getUserById: PropTypes.func,
  updateUser: PropTypes.func,
  deleteAdminUser: PropTypes.func,
  loading: PropTypes.bool,
  history: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
};
export default AddEditBaitussalamWebAndAppPublicationCategoryManagementContainer;
