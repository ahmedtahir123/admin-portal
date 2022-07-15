import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Progress,
  InputNumber,
  Popconfirm,
  Radio,
  Row,
  Table,
  Upload,
} from "antd";

import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import * as moment from "dayjs";
import PropTypes from "prop-types";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { numberOnly, beforeUpload, getBase64 } from "../../utils/utils";

import CustomIcon from "../../components/CustomIcon/CustomIcon";
import MapDrawer from "../../components/MapDrawer";
import PageTitle from "../../components/PageTitle/PageTitle";
import { StatusRadioButtons } from "../../components/StatusRadioButtons/StatusRadioButtons";
import avatar from "../../images/avatar.svg";
import ROUTES from "../../routes/constant.route";
import {
  // ADDRESS_TABLE_COLUMNS,
  CONFIRM_MESSAGE,
  STATUS,
  VALIDATE_FORM_MESSAGES_TEMPLATE,
  DATE_FORMAT_TIME,
  DATE_FORMAT,
} from "../../utils/constants";

import AddressManagementDrawer from "../AddressManagementDrawer/AddressManagementDrawer";

const AddEditConsumerContainer = ({
  addNewConsumer,
  getConsumerById,
  consumer,
  loading,
  updateConsumer,
  deleteConsumer,
  history,
  province,
  cities,
  uploadLoader,
}) => {
  const [form] = Form.useForm();

  const [isAddrDrawerVisible, setIsAddrDrawerVisible] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [userImageUrl, setUserImageUrl] = useState({
    type: "display-pic",
    name: "logo-image",
    uid: 0,
    file: null,
    url: null,
  });
  const [addresses, setAddresses] = useState([]);
  const [downloadPercentage, setDownloadPercent] = useState(0);
  const { id } = useParams();
  const isEditView = !!id;
  const status = consumer.userMetaData ? consumer.userMetaData.status : STATUS.NON_VERIFIED;
  const getTableColumns = useCallback(
    () => [
      {
        title: "Complete Address",
        dataIndex: "addressName",
        key: "addressName",
      },
      {
        title: "City",
        dataIndex: "city",
        key: "city",
        render: val => {
          const city = cities.length ? cities.find(item => item.code === val) : "";
          return city ? city.name : "";
        },
      },
      {
        title: "Area",
        dataIndex: "area",
        key: "area",
      },
    ],
    [cities],
  );

  useEffect(() => {
    if (!_isEmpty(consumer) && !loading) {
      setFormValues();
    }
  }, [consumer, loading]);

  useEffect(() => {
    if (id) {
      fetchConsumerDetail();
    }
  }, [id]);

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

  const getProgress = ({ loaded, total }) => {
    const progress = Math.floor((loaded / total) * 100);
    if (progress !== 100) {
      setDownloadPercent(progress);
      return;
    }
    setDownloadPercent(100);
  };

  const _deleteConsumer = async () => {
    try {
      await deleteConsumer(id);
      history.push(ROUTES.CONSUMER_MANAGEMENT.path);
    } catch (error) {
      console.log("consumer del error", error);
    }
  };

  const onFormFinish = async fieldsValue => {
    let displayPicture = null;
    if (_get(userImageUrl, "file")) {
      displayPicture = userImageUrl;
    } else {
      displayPicture = userImageUrl.url;
    }
    const values = {
      ...fieldsValue,
      fullName: `${fieldsValue.firstName} ${fieldsValue.lastName}`,
      dateOfBirth: fieldsValue.dateOfBirth.valueOf(),
      address: Object.assign({}, ...addresses.map((p, i) => ({ [i]: p }))), // TODO
      displayPicture,
    };
    try {
      if (isEditView) {
        await updateConsumer(id, { ...consumer, ...values }, getProgress);
      } else {
        await addNewConsumer(values, getProgress);
      }
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchConsumerDetail = async () => {
    await getConsumerById(id);
  };

  const setFormValues = () => {
    form.setFieldsValue({
      userId: consumer.userId,
      firstName: consumer.firstName,
      lastName: consumer.lastName,
      emailAddress: consumer.emailAddress,
      cellPhoneNumber: consumer.cellPhoneNumber,
      userMetaData: consumer.userMetaData,
      genderType: consumer.genderType,
      dateOfBirth: consumer.dateOfBirth ? moment(consumer.dateOfBirth) : moment(),
      signUpLocation: consumer.signUpLocation,
      corporateSubscriptionCode: consumer.corporateSubscriptionCode,
      corporateName: consumer.corporateName,
    });
    if (consumer.displayPicture)
      setUserImageUrl({
        type: "display-pic",
        name: "logo-image",
        uid: 0,
        file: null,
        url: consumer.displayPicture,
      });
    if (consumer.address) {
      const addressObj = _get(consumer, "address", {});
      const addressArr = Object.keys(addressObj).map(d => ({ ...addressObj[d], id: d }));
      console.log({ addressArr });
      setAddresses(addressArr);
    }
  };

  const handleImageChange = ({ fileList, file }) => {
    getBase64(file, url => {
      const fileObj = {
        type: "display-pic",
        name: file.name,
        uid: file.uid,
        file,
        url,
      };
      setUserImageUrl(fileObj);
    });
  };

  const _location = _get(consumer, "signUpLocation");
  const locationInput = _location && `${_location.locationName} (${_location.latitude}, ${_location.longitude})`;

  const _onSave = data => {
    setIsAddrDrawerVisible(false);
    setAddresses(data);
  };

  const _changePassword = () => {
    history.push({
      pathname: `${ROUTES.CHANGE_PASSWORD.path}/${id}`,
      state: { userName: consumer.emailAddress, page: "consumer" },
    });
  };

  const statusRadioButtonProps = {
    currentStatus: [
      { code: STATUS.NON_VERIFIED, name: "Not Verified" },
      { code: STATUS.VERIFIED, name: "Verified" },
    ],
    defaultValue: STATUS.NON_VERIFIED,
  };
  const createdAt = _get(consumer, "createdAt", "") ? moment(consumer.createdAt).format(DATE_FORMAT_TIME) : "";
  const updatedAt = _get(consumer, "updatedAt", "") ? moment(consumer.updatedAt).format(DATE_FORMAT_TIME) : "";

  return (
    <>
      <PageTitle title={isEditView ? "Edit Consumer" : "Add Consumer"} />
      <Form
        className="add-edit-consumer"
        form={form}
        layout="vertical"
        name="nest-messages"
        initialValues={{ userMetaData: { isEnabled: true, status: "NOT_VERIFIED" } }}
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            {isEditView ? (
              <Form.Item label="User Code" name="userId">
                <Input readOnly placeholder="User Code" />
              </Form.Item>
            ) : null}
            <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
              <Input placeholder="User First Name" />
            </Form.Item>
            <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
              <Input placeholder="User Last Name" />
            </Form.Item>
            <Form.Item label="Email" name="emailAddress" rules={[{ required: true, type: "email" }]}>
              <Input placeholder="Email" readOnly={isEditView} />
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
              <Input className="input-number-full-width" placeholder="03001234567" />
            </Form.Item>
            <Form.Item label="Gender" name="genderType" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio value="MALE">Male</Radio>
                <Radio value="FEMALE">Female</Radio>
                {/* <Radio value="OTHER">Other</Radio> */}
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Date Of Birth" name="dateOfBirth" rules={[{ required: true }]}>
              <DatePicker format={DATE_FORMAT} />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={12} className="mg-top-40">
            <Form.Item className="text-left" name={["userMetaData", "isEnabled"]}>
              <Radio.Group>
                <Radio.Button value>Enabled</Radio.Button>
                <Radio.Button value={false}>Disabled</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item className="text-left" label="Current Status" name={["userMetaData", "status"]}>
              <StatusRadioButtons currentStatus={statusRadioButtonProps.currentStatus} defaultValue={status} />
            </Form.Item>

            <Form.Item label="">
              <div className="text-center">
                <div className="bg-gray">
                  {userImageUrl && userImageUrl.url ? (
                    <img src={userImageUrl.url} alt="avatar" width={275} />
                  ) : (
                    <img src={avatar} alt="avatar" width={275} />
                  )}
                  <div className="upload-container">
                    <Upload showUploadList={false} beforeUpload={beforeUpload} onChange={handleImageChange}>
                      <Button>Upload Display Picture</Button>
                    </Upload>
                  </div>
                </div>
              </div>
            </Form.Item>
          </Col>
        </Row>
        {isEditView ? (
          <Row type="flex" justify="end" align="bottom">
            <Col className="pad-top-10 pad-right-2">
              <Button className="action-btn" type="primary" onClick={_changePassword}>
                Change Password
              </Button>
            </Col>
          </Row>
        ) : null}

        <Divider />

        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}></Col>
          <Col span={8} xs={24} sm={12} lg={12} className="mid-section-left-col">
            {isEditView ? (
              <div>
                <Form.Item label="Signup At">
                  <Input readOnly value={createdAt} />
                </Form.Item>
                <Form.Item label="Location of Signup">
                  <Button
                    type="link"
                    icon={<CustomIcon name="PushpinOutlined" />}
                    className="location-btn"
                    onClick={() => setIsMapVisible(true)}
                  >
                    {locationInput} (Google Map Pin)
                  </Button>
                </Form.Item>
              </div>
            ) : null}
            <Form.Item label="Corporate Subscription Code" name="corporateSubscriptionCode">
              <Input placeholder="Subscription code" />
            </Form.Item>
            <Form.Item label="Corporate Client Employee" name="corporateName">
              <Input placeholder="Corporate client" />
            </Form.Item>
          </Col>
        </Row>
        {/* {isEditView ? (
          <Row>
            <Col span={12} xs={24} sm={12} lg={12}></Col>
            <Col span={12} xs={24} sm={12} lg={12}>
              <Row justify="space-between" className="pad-left-10">
                <Button>Statistics</Button>
                <Button>Purchase History</Button>
                <Button>Deal Redeem History</Button>
              </Row>
            </Col>
          </Row>
        ) : null} */}

        <Divider />

        <Row type="flex">
          <Col span={24} xs={24} sm={24} lg={24}>
            <Form.Item label="Addresses">
              <Table
                bordered
                dataSource={addresses}
                columns={getTableColumns()}
                pagination={false}
                scroll={{ y: 100 }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="fields-row text-right" justify="end" gutter={20} type="flex">
          <Col span={8} sm={8} lg={8}></Col>
          <Col span={8} sm={8} lg={8}></Col>
          <Col span={8} sm={8} lg={8}>
            <Button onClick={() => setIsAddrDrawerVisible(true)}>Manage Address</Button>
          </Col>
        </Row>
        <Divider />

        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={8} lg={8}>
            {isEditView ? (
              <div>
                Created By: {_get(consumer, "createdBy", "")}
                <br />
                Created At: {createdAt}
                <br />
                Last Modify By: {_get(consumer, "updatedBy", "")}
                <br />
                Last Modify At: {updatedAt}
              </div>
            ) : null}
          </Col>

          <Col span={8} xs={24} sm={16} lg={16}>
            <Row className="fields-row" gutter={20} type="flex">
              <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                {isEditView ? (
                  <Form.Item className="bottom-submit-btn">
                    <Popconfirm
                      title={CONFIRM_MESSAGE.DELETE}
                      onConfirm={_deleteConsumer}
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
                <Form.Item>
                  <Button type="info" onClick={() => history.goBack()}>
                    Cancel
                  </Button>
                </Form.Item>
              </Col>
              <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading} disabled={uploadLoader}>
                    {uploadLoader ? (
                      <Progress strokeLinecap="square" strokeColor="#F7931E" percent={downloadPercentage} />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <AddressManagementDrawer
          data={addresses}
          visible={isAddrDrawerVisible}
          onCancel={() => setIsAddrDrawerVisible(false)}
          onSave={_onSave}
          province={province}
          cities={cities}
          getCols={getTableColumns}
        />
        <MapDrawer
          location={_location}
          visible={isMapVisible}
          onCancel={() => setIsMapVisible(false)}
          onSave={() => setIsMapVisible(false)}
          title="Consumer Location"
        />
      </Form>
    </>
  );
};

AddEditConsumerContainer.propTypes = {
  addNewConsumer: PropTypes.func,
  getConsumerById: PropTypes.func,
  consumer: PropTypes.object,
  loading: PropTypes.bool,
  uploadLoader: PropTypes.bool,
  updateConsumer: PropTypes.func,
  deleteConsumer: PropTypes.func,
  history: PropTypes.object,
  province: PropTypes.array,
  cities: PropTypes.array,
};

export default AddEditConsumerContainer;
