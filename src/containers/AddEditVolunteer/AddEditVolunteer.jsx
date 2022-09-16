import { Button, Col, DatePicker, Divider, Form, Input, Popconfirm, Row, Select, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import * as moment from "dayjs";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import listingPageCardImage from "../../images/listing-card.svg";
import { CONFIRM_MESSAGE, DATE_FORMAT, VALIDATE_FORM_MESSAGES_TEMPLATE } from "../../utils/constants";
import { getBase64, numberOnly } from "../../utils/utils";
import "./AddEditVolunteer.scss";

const cityList = [
  { name: "Karachi", id: 1, code: 10 },
  { name: "Lahore", id: 2, code: 20 },
  { name: "Islamabad", id: 3, code: 30 },
  { name: "Peshawar", id: 4, code: 40 },
  { name: "Faisalabad", id: 5, code: 50 },
  { name: "Quetta", id: 6, code: 60 },
  { name: "Mirpur khas", id: 7, code: 70 },
];

const AddEditVolunteer = ({
  loading,
  campaign,
  data,
  resetData,
  updateCampaign,
  addCampaign,
  getVoucherList,
  vouchers,
  getMusalliVolunteerById,

  mosqueOptionLoading,
  mosqueOptionlist,
}) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [bannerImageUrl, setBannerImageUrl] = useState(listingPageCardImage);
  const [promotionDrawerVisible, setPromotionDrawerVisible] = useState(false);
  const { id } = useParams();
  const isEditView = !!id;
  const currentStatus = ["Planned", "Scheduled", "In-Execution", "Completed", "Terminated"];
  const filters = {
    categories: ["Cat1", "Cat2", "Cat3"],
    brands: ["Brand1", "Brand2", "Brand3"],
    locations: ["Loc1", "Loc2", "Loc3"],
  };

  useEffect(() => {
    if (id) {
      fetchVolunteerDataById();
    }
  }, [id]);

  const fetchVolunteerDataById = async () => {
    await getMusalliVolunteerById(id);
  };

  useEffect(() => {
    if (!_isEmpty(data) && !loading && id) {
      setFormValues();
    }
  }, [data, loading]);

  // const fetchCampaign = async campaignId => {
  //   await getCampaignById(campaignId);
  // };
  // const fetchVouchers = async () => {
  //   await getVoucherList();
  // };

  const setFormValues = () => {
    form.setFieldsValue({
      volunteerName: data.name,
      cellPhoneNumber: data.contact,
      status: data.status,
    });
  };

  const onFormFinish = fieldsValue => {
    console.log(fieldsValue, "fieldsValue");
    // const rangeTimeValue = fieldsValue.date;
    // const values = {
    //   ...fieldsValue,
    //   startDate: rangeTimeValue[0].valueOf(),
    //   endDate: rangeTimeValue[1].valueOf(),
    // };
    // if (isEditView) {
    //   updateCampaign(id, values);
    // } else {
    //   addCampaign(values);
    // }
  };

  // const handleImageChange = info => {
  //   if (info.fileList.length >= 0) {
  //     getBase64(info.fileList[0].originFileObj, imageUrl => setBannerImageUrl(imageUrl));
  //   }
  // };

  // const initialValues = {
  //   isTransferable: !!campaign.isTransferable,
  //   status: campaign.status,
  // };

  const onDateChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  const onDateOk = value => {
    console.log("onOk: ", value);
  };

  const onPromotionDrawerClose = () => {
    setPromotionDrawerVisible(false);
  };

  const onCancel = () => {
    form.resetFields();
    history.goBack();
    resetData();
  };

  return (
    <>
      {loading ? (
        <div className="edit-form__spin">
          <Spin size="large" tip="Loading ..." />
        </div>
      ) : null}
      <PageTitle title={isEditView ? "Edit Volunteer" : "Add Volunteer"} />
      <Form
        form={form}
        className="AddVolunteer"
        layout="vertical"
        name="nest-messages"
        // initialValues={initialValues}
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            {/* {isEditView && (
              <Form.Item label="Volunteer Code" name="volunteerId">
                <Input readOnly placeholder="Volunteer Code" />
              </Form.Item>
            )} */}
            <Form.Item label="Volunteer Name" name="volunteerName" rules={[{ required: true }]}>
              <Input placeholder="Volunteer Name" />
            </Form.Item>
            {!isEditView && (
              <>
                <Form.Item label="Email" name="emailAddress" rules={[{ required: true, type: "email" }]}>
                  <Input placeholder="Email" readOnly={isEditView} />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                  <Input.Password placeholder="Password" />
                </Form.Item>
              </>
            )}
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
            {isEditView && (
              <Form.Item
                label="Status"
                name="status"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select allowClear placeholder="Select Status">
                  <Select.Option value="ACTIVE">ACTIVE</Select.Option>
                  <Select.Option value="IN_ACTIVE">IN_ACTIVE</Select.Option>
                </Select>
              </Form.Item>
            )}
            {!isEditView && (
              <>
                <Form.Item label="Date Of Birth" name="dateOfBirth" rules={[{ required: true }]}>
                  <DatePicker style={{ width: "100%" }} format={DATE_FORMAT} />
                </Form.Item>
                <Form.Item label="Address" name="address" rules={[{}]}>
                  <TextArea rows={4} placeholder="Address" maxLength={6} />
                </Form.Item>
              </>
            )}
          </Col>
          {!isEditView && (
            <Col span={8} xs={24} sm={12} lg={12}>
              <Form.Item label="Select Mosque" name="mosque" rules={[{ required: false }]}>
                <Select
                  showSearch
                  allowClear
                  placeholder="Select Mosque"
                  optionFilterProp="children"
                  loading={mosqueOptionLoading}
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {mosqueOptionlist?.length > 0 &&
                    mosqueOptionlist?.map(item => (
                      <Select.Option key={item.code} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item label="Select City" name="city" rules={[{ required: false }]}>
                <Select
                  showSearch
                  allowClear
                  placeholder="Select City"
                  optionFilterProp="children"
                  loading={mosqueOptionLoading}
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {cityList?.length > 0 &&
                    cityList?.map(item => <Select.Option key={item.code}>{item.name}</Select.Option>)}
                </Select>
              </Form.Item>
              <Form.Item
                label="NIC"
                name="nic"
                rules={[
                  {
                    required: false,
                  },
                  numberOnly,
                ]}
              >
                <Input placeholder="42400-1111111-1" />
              </Form.Item>
              <Form.Item
                label="Age"
                name="age"
                rules={[
                  {
                    required: false,
                  },
                  numberOnly,
                ]}
              >
                <Input placeholder="Age" readOnly={isEditView} />
              </Form.Item>
              <Form.Item label="Location" name="location">
                <Row className="fields-row" gutter={20} type="flex">
                  <Col span={8} xs={24} sm={12} lg={12}>
                    <Form.Item
                      name="Lang"
                      rules={[
                        {
                          required: false,
                        },
                        numberOnly,
                      ]}
                    >
                      <Input placeholder="Long" />
                    </Form.Item>
                  </Col>
                  <Col span={8} xs={24} sm={12} lg={12}>
                    <Form.Item
                      name="Long"
                      rules={[
                        {
                          required: false,
                        },
                        numberOnly,
                      ]}
                    >
                      <Input placeholder="Lang" />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          )}
        </Row>
        <Divider />
        {isEditView ? (
          <Row className="fields-row" gutter={20}>
            {/* <Col span={8} xs={24} sm={12} lg={12}>
              Created By: {_get(campaign, "createdBy", "")}
              <br />
              Created At: {_get(campaign, "createdAt", "")}
              <br />
              Last Modify By: {_get(campaign, "lastModifiedBy", "")}
              <br />
              Last Modify At: {_get(campaign, "lastModifiedAt", "")}
            </Col> */}
            <Col span={8} xs={24} sm={12} lg={12}>
              <Row className="fields-row" gutter={24} type="flex">
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  <Form.Item>
                    <Popconfirm
                      title={CONFIRM_MESSAGE.DELETE}
                      onConfirm={() => {}}
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
                </Col>
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  <Form.Item>
                    <Button type="info" onClick={onCancel}>
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
              <Button className="action-btn mg-right-50" type="info" onClick={onCancel}>
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

AddEditVolunteer.propTypes = {
  // getCampaignById: PropTypes.func,
  updateCampaign: PropTypes.func,
  addCampaign: PropTypes.func,
  getVoucherList: PropTypes.func,
  campaign: PropTypes.object,
  loading: PropTypes.bool,
  vouchers: PropTypes.array,

  data: PropTypes.object,
  resetData: PropTypes.func,
  getMusalliVolunteerById: PropTypes.func,
  mosqueOptionLoading: PropTypes.bool,
  mosqueOptionlist: PropTypes.array,
};
export default AddEditVolunteer;
