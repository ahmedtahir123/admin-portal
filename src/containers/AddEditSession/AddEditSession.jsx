import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Radio,
  DatePicker,
  Upload,
  message,
  Divider,
  Spin,
  Switch,
  Popconfirm,
} from "antd";
import PropTypes from "prop-types";
import * as moment from "dayjs";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import _map from "lodash/map";
import "./AddEditSession.scss";
import { getBase64, beforeUpload } from "../../utils/utils";
import { VALIDATE_FORM_MESSAGES_TEMPLATE, CONFIRM_MESSAGE, DATE_FORMAT_TIME } from "../../utils/constants";
import BrandLogo from "../../images/avatar.png";
import listingPageCardImage from "../../images/listing-card.svg";
import PageTitle from "../../components/PageTitle/PageTitle";
import AddRemoveDealProvider from "../../providers/addRemoveDeal.provider";
const { RangePicker } = DatePicker;

const AddEditSession = ({
  loading,
  campaign,
  getCampaignById,
  updateCampaign,
  addCampaign,
  getVoucherList,
  vouchers,
}) => {
  const [form] = Form.useForm();
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
      fetchCampaign(id);
      fetchVouchers();
    }
  }, [id]);

  useEffect(() => {
    if (!_isEmpty(campaign) && !loading) {
      setFormValues();
    }
  }, [campaign, loading]);

  const fetchCampaign = async campaignId => {
    await getCampaignById(campaignId);
  };
  const fetchVouchers = async () => {
    await getVoucherList();
  };

  const setFormValues = () => {
    form.setFieldsValue({
      campaignId: campaign.campaignId,
      campaignName: campaign.campaignName,
      description: campaign.description,
      eventName: campaign.eventName,
      startDate: moment(campaign.startDate),
      endDate: moment(campaign.endDate),
      price: campaign.price,
      locationName: campaign.locationName,
      areaSegment: campaign.areaSegment,
      location: campaign.location,
      isTransferable: campaign.isTransferable,
      categoriesCount: campaign.categoriesCount,
      brandsCount: campaign.brandsCount,
      vouchersCount: campaign.vouchersCount,
    });
    if (campaign.bannerImage) setBannerImageUrl(campaign.bannerImage);
  };

  const onFormFinish = fieldsValue => {
    const rangeTimeValue = fieldsValue.date;
    const values = {
      ...fieldsValue,
      startDate: rangeTimeValue[0].valueOf(),
      endDate: rangeTimeValue[1].valueOf(),
    };
    if (isEditView) {
      updateCampaign(id, values);
    } else {
      addCampaign(values);
    }
  };

  const handleImageChange = info => {
    if (info.fileList.length >= 0) {
      getBase64(info.fileList[0].originFileObj, imageUrl => setBannerImageUrl(imageUrl));
    }
  };

  const initialValues = {
    isTransferable: !!campaign.isTransferable,
    status: campaign.status,
  };

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

  return (
    <>
      {loading ? (
        <div className="edit-form__spin">
          <Spin size="large" tip="Loading ..." />
        </div>
      ) : null}
      <PageTitle title={isEditView ? "Edit Session" : "Add Session"} />
      <Form
        form={form}
        className="AddSession"
        layout="vertical"
        name="nest-messages"
        initialValues={initialValues}
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="Session Id" name="sessionId">
              <Input readOnly placeholder="Session Id" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea maxLength="500" rows={3} placeholder="Description" />
            </Form.Item>
            <Form.Item label="Session Start and End Date" name="date" rules={[{ required: true }]}>
              <RangePicker showTime format={DATE_FORMAT_TIME} onChange={onDateChange} onOk={onDateOk} />
            </Form.Item>
            <Form.Item label="Mosque Start and End Date" name="date" rules={[{ required: true }]}>
              <RangePicker showTime format={DATE_FORMAT_TIME} onChange={onDateChange} onOk={onDateOk} />
            </Form.Item>
            <Form.Item label="Participant Registration Start and End Date" name="date" rules={[{ required: true }]}>
              <RangePicker showTime format={DATE_FORMAT_TIME} onChange={onDateChange} onOk={onDateOk} />
            </Form.Item>
            <Form.Item label="Participant Minimum and Maximum DOB" name="date" rules={[{ required: true }]}>
              <RangePicker showTime format={DATE_FORMAT_TIME} onChange={onDateChange} onOk={onDateOk} />
            </Form.Item>
            <Form.Item label="Competition Start and End Date" name="date" rules={[{ required: true }]}>
              <RangePicker showTime format={DATE_FORMAT_TIME} onChange={onDateChange} onOk={onDateOk} />
            </Form.Item>
            <Form.Item label="Paymennt First and Last Due Date" name="date" rules={[{ required: true }]}>
              <RangePicker showTime format={DATE_FORMAT_TIME} onChange={onDateChange} onOk={onDateOk} />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={12} className="mg-top-40">
            <Form.Item className="text-left" name="enabled">
              <Radio.Group>
                <Radio.Button value>Enabled</Radio.Button>
                <Radio.Button value={false}>Disabled</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Cost Per Cycle" name="costPerCycle">
              <Input readOnly placeholder="Cost Per Cycle" />
            </Form.Item>
            <Form.Item label="Percentage To Pay" name="percentageToPay">
              <Input readOnly placeholder="Percentage To Pay" />
            </Form.Item>
            <Form.Item label="Payment Percentage Due Date" name="paymentPercentageDueDate">
              <Input readOnly placeholder="Payment Percentage Due Date" />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        {isEditView ? (
          <Row className="fields-row" gutter={20}>
            <Col span={8} xs={24} sm={12} lg={12}>
              Created By: {_get(campaign, "createdBy", "")}
              <br />
              Created At: {_get(campaign, "createdAt", "")}
              <br />
              Last Modify By: {_get(campaign, "lastModifiedBy", "")}
              <br />
              Last Modify At: {_get(campaign, "lastModifiedAt", "")}
            </Col>
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
                    <Button type="info" onClick={() => form.resetFields()}>
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
              <Button className="action-btn mg-right-50" type="info" onClick={() => form.resetFields()}>
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

AddEditSession.propTypes = {
  getCampaignById: PropTypes.func,
  updateCampaign: PropTypes.func,
  addCampaign: PropTypes.func,
  getVoucherList: PropTypes.func,
  campaign: PropTypes.object,
  loading: PropTypes.bool,
  vouchers: PropTypes.array,
};
export default AddEditSession;
