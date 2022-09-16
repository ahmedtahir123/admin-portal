import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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
import { getBase64, beforeUpload, numberOnly } from "../../utils/utils";
import {
  VALIDATE_FORM_MESSAGES_TEMPLATE,
  CONFIRM_MESSAGE,
  DATE_FORMAT_TIME,
  DATE_FORMAT,
  DATE_FORMAT_TIME_SEC,
} from "../../utils/constants";
import BrandLogo from "../../images/avatar.png";
import listingPageCardImage from "../../images/listing-card.svg";
import PageTitle from "../../components/PageTitle/PageTitle";
import AddRemoveDealProvider from "../../providers/addRemoveDeal.provider";
const { RangePicker } = DatePicker;

const AddEditSession = ({
  loading,
  data,
  getMusalliSessionById,
  updateMusalliSession,
  createMusalliSession,
  resetData,
  // updateCampaign,
  // addCampaign,
  // getVoucherList,
  // vouchers,
}) => {
  const [form] = Form.useForm();
  const [bannerImageUrl, setBannerImageUrl] = useState(listingPageCardImage);
  const [promotionDrawerVisible, setPromotionDrawerVisible] = useState(false);
  const history = useHistory();
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
      // fetchVouchers();
      fetchSessionData();
    }
  }, [id]);

  useEffect(() => {
    if (!_isEmpty(data) && !loading && id) {
      setFormValues();
    }
  }, [data, loading]);

  // const fetchCampaign = async campaignId => {
  //   await getSessionById(campaignId);
  // };
  // const fetchVouchers = async () => {
  //   await getVoucherList();
  // };

  const fetchSessionData = async () => {
    await getMusalliSessionById(id);
  };

  const setFormValues = () => {
    const {
      // eslint-disable-next-line no-shadow
      id,
      costPerCycle,
      percentageToPay,
      paymentPercentageSplitOnFirstDueDate,
      description,
      startDate,
      endDate,
    } = data;
    form.setFieldsValue({
      sessionId: id,
      costPerCycle,
      percentageToPay,
      paymentPercentageSplitOnFirstDueDate,
      description,
      sessionStartAndEndDate: [
        moment(`${startDate.slice(0, 3).join("-")} ${startDate.slice(3, 6).join(":")}`),
        moment(`${endDate.slice(0, 3).join("-")} ${endDate.slice(3, 6).join(":")}`),
      ],
    });
    // * date console.log(endDate.slice(0, 3).join("-"), "startDatestartDate");
    // * time console.log(endDate.slice(3, 6).join(":"), "startDatestartDate");

    // if (data.bannerImage) setBannerImageUrl(data.bannerImage);
  };

  const onFormFinish = fieldsValue => {
    console.log(fieldsValue, "fieldsValuefieldsValue");
    const {
      sessionStartAndEndDate,
      mosqueStartAndEndDate,
      participantStartAndEndDate,
      participantMinAndMaxDOB,
      paymentFirstAndLast,
      compStartAndEndDate,
      costPerCycle,
      percentageToPay,
      paymentPercentageSplitOnFirstDueDate,
    } = fieldsValue;

    const payload = {
      startDate: sessionStartAndEndDate[0].format("YYYY-MM-DD HH:mm:ss"),
      endDate: sessionStartAndEndDate[1].format("YYYY-MM-DD HH:mm:ss"),
      masjidRegistrationStartDate: mosqueStartAndEndDate[0].format("YYYY-MM-DD HH:mm:ss"),
      masjidRegistrationEndDate: mosqueStartAndEndDate[1].format("YYYY-MM-DD HH:mm:ss"),
      participantRegistrationStartDate: participantStartAndEndDate[0].format("YYYY-MM-DD HH:mm:ss"),
      participantRegistrationEndDate: participantStartAndEndDate[1].format("YYYY-MM-DD HH:mm:ss"),

      minimumParticipantDateOfBirth: participantMinAndMaxDOB[0].format("YYYY-MM-DD"),
      maximumParticipantDateOfBirth: participantMinAndMaxDOB[1].format("YYYY-MM-DD"),
      competitionStartDate: compStartAndEndDate[0].format("YYYY-MM-DD"),
      competitionEndDate: compStartAndEndDate[1].format("YYYY-MM-DD"),
      paymentDueDate: paymentFirstAndLast[0].format("YYYY-MM-DD"),
      secondPaymentDueDate: paymentFirstAndLast[1].format("YYYY-MM-DD"),
      costPerCycle,
      percentageToPay,
      paymentPercentageSplitOnFirstDueDate,
    };
    console.log(payload, "payload");

    // if (isEditView) {
    //   updateMusalliSession(id, payload);
    // } else {
    //   createMusalliSession(payload);
    // }
  };

  const handleImageChange = info => {
    if (info.fileList.length >= 0) {
      getBase64(info.fileList[0].originFileObj, imageUrl => setBannerImageUrl(imageUrl));
    }
  };

  // const initialValues = {
  //   isTransferable: !!data.isTransferable,
  //   status: data.status,
  // };

  const onDateChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  const onDateOk = (value, dateString) => {
    console.log("onOk: ", dateString, value);
  };

  const onCancel = () => {
    form.resetFields();
    history.goBack();
    resetData();
  };

  const config = {
    rules: [
      {
        required: true,
      },
    ],
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
        hideRequiredMark
        form={form}
        className="AddSession"
        layout="vertical"
        name="nest-messages"
        // initialValues={initialValues}
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            {isEditView && (
              <Form.Item label="Session Id" name="sessionId">
                <Input readOnly placeholder="Session Id" />
              </Form.Item>
            )}
            <Form.Item
              label="Cost Per Cycle"
              name="costPerCycle"
              rules={[
                {
                  required: true,
                  // max: 20,
                },
                numberOnly,
              ]}
            >
              <Input placeholder="Cost Per Cycle" />
            </Form.Item>
            <Form.Item
              label="Percentage To Pay"
              name="percentageToPay"
              rules={[
                {
                  required: true,
                },
                numberOnly,
              ]}
            >
              <Input placeholder="Percentage To Pay" />
            </Form.Item>
            <Form.Item
              label="Payment Percentage Due Date"
              name="paymentPercentageSplitOnFirstDueDate"
              rules={[
                {
                  required: true,
                  // max: 20,
                },
                numberOnly,
              ]}
            >
              <Input placeholder="Payment Percentage Due Date" />
            </Form.Item>
            <Form.Item label="Description" name="description" {...config}>
              <Input.TextArea maxLength="500" rows={3} placeholder="Description" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="Session Start and End Date" name="sessionStartAndEndDate" {...config}>
              <RangePicker showTime format={DATE_FORMAT_TIME_SEC} onChange={onDateChange} onOk={onDateOk} />
            </Form.Item>
            <Form.Item label="Mosque Registration Start and End Date" name="mosqueStartAndEndDate" {...config}>
              <RangePicker showTime format={DATE_FORMAT_TIME_SEC} onChange={onDateChange} onOk={onDateOk} />
            </Form.Item>
            <Form.Item
              label="Participant Registration Start and End Date"
              name="participantStartAndEndDate"
              {...config}
            >
              <RangePicker showTime format={DATE_FORMAT_TIME_SEC} onChange={onDateChange} onOk={onDateOk} />
            </Form.Item>
            <Form.Item label="Participant Minimum and Maximum DOB" name="participantMinAndMaxDOB" {...config}>
              <RangePicker
                placeholder={["Minimum", "Maximum"]}
                format={DATE_FORMAT}
                onChange={onDateChange}
                onOk={onDateOk}
              />
            </Form.Item>
            <Form.Item label="Competition Start and End Date" name="compStartAndEndDate" {...config}>
              <RangePicker format={DATE_FORMAT} onChange={onDateChange} onOk={onDateOk} />
            </Form.Item>
            <Form.Item label="Paymennt First and Last Due Date" name="paymentFirstAndLast" {...config}>
              <RangePicker
                placeholder={["First", "Last"]}
                format={DATE_FORMAT}
                onChange={onDateChange}
                onOk={onDateOk}
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        {isEditView ? (
          <Row className="fields-row" gutter={20}>
            <Col span={8} xs={24} sm={12} lg={12}>
              {/* Created By: {_get(data, "createdBy", "")}
              <br />
              Created At: {_get(data, "createdAt", "")}
              <br />
              Last Modify By: {_get(data, "lastModifiedBy", "")}
              <br />
              Last Modify At: {_get(data, "lastModifiedAt", "")} */}
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

AddEditSession.propTypes = {
  getCampaignById: PropTypes.func,
  updateCampaign: PropTypes.func,
  addCampaign: PropTypes.func,
  getVoucherList: PropTypes.func,
  data: PropTypes.object,
  loading: PropTypes.bool,
  vouchers: PropTypes.array,
  getMusalliSessionById: PropTypes.func,
  updateMusalliSession: PropTypes.func,
  createMusalliSession: PropTypes.func,
  resetData: PropTypes.func,
};
export default AddEditSession;
