import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Form, Input, Button, Row, Divider, Col, DatePicker, Spin } from "antd";
import PropTypes from "prop-types";
import * as moment from "dayjs";
import _isEmpty from "lodash/isEmpty";
import { STATUS, VALIDATE_FORM_MESSAGES_TEMPLATE, DATE_FORMAT } from "../../utils/constants";
import PageTitle from "../../components/PageTitle/PageTitle";

const ViewCampaignStatisticsContainer = ({
  loading,
  campaignStatus,
  getCampaignStatusById,
  addCampaignStatus,
  updateCampaignStatus,
}) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const isEditView = !!id;

  useEffect(() => {
    if (id) {
      fetchCampaignStatusDetail(id);
    }
  }, [id]);

  useEffect(() => {
    if (!_isEmpty(campaignStatus) && !loading) {
      setFormValues();
    }
  }, [campaignStatus, loading]);

  const fetchCampaignStatusDetail = async ID => {
    await getCampaignStatusById(ID);
  };
  const setFormValues = () => {
    form.setFieldsValue({
      campaignId: campaignStatus.campaignId,
      title: campaignStatus.title,
      eventName: campaignStatus.eventName,
      price: campaignStatus.price,

      startDate: moment(campaignStatus.startDate),
      endDate: moment(campaignStatus.endDate),
      currentStatus: campaignStatus.status,
      promotions: campaignStatus.locationName,
      brands: campaignStatus.campaignName,
      numberOfvouchers: campaignStatus.numberOfvouchers,
      receivingPromotions: campaignStatus.maximumdisburselimit,
      other: campaignStatus.maximumdisburselimit,
      purchasingPromotions: campaignStatus.maximumdisburselimit,
    });
  };

  const onFormFinish = fieldsValue => {
    const values = {
      ...fieldsValue,
    };
    if (isEditView) {
      updateCampaignStatus(id, values);
    } else {
      addCampaignStatus(values);
    }
  };

  return (
    <>
      {loading ? (
        <div className="edit-form__spin">
          <Spin size="large" tip="Loading ..." />
        </div>
      ) : null}

      <PageTitle title="View Campaign Status" />
      <Form
        form={form}
        layout="vertical"
        name="nest-messages"
        initialValues={{ status: STATUS.NON_VERIFIED }}
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="Campaign Code" name="campaignId">
              <Input readOnly placeholder="Campaign Code" />
            </Form.Item>
            <Form.Item label="Campaign Title" name="title">
              <Input readOnly placeholder="Campaign Title" />
            </Form.Item>
            <Form.Item label="Event Name" name="eventName">
              <Input readOnly placeholder="Event Name" />
            </Form.Item>
            <Form.Item label="Price" name="price">
              <Input readOnly placeholder="Price" />
            </Form.Item>
            <Form.Item label="Start Date" name="startDate">
              <DatePicker disabled format={DATE_FORMAT} />
            </Form.Item>
            <Form.Item label="End Date" name="endDate">
              <DatePicker disabled format={DATE_FORMAT} />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={12} className="mg-top-40">
            <Form.Item label="Current Status" name="currentStatus">
              <Input readOnly placeholder="Current Status" />
            </Form.Item>
            <Form.Item label="Categories in the promotions" name="promotions">
              <Input readOnly placeholder="Categories in the promotions" />
            </Form.Item>

            <Form.Item label="Brands in Promotions" name="brands">
              <Input readOnly placeholder="Brands in Promotions" />
            </Form.Item>
            <Form.Item label="Number of Vouchers in promotion" name="numberOfvouchers">
              <Input readOnly placeholder="Number of Vouchers in promotion" />
            </Form.Item>
          </Col>
        </Row>

        <Divider />
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12} className="mg-top-40">
            <Form.Item
              label="Total Number of users Receiving Promotions"
              name="receivingPromotions"
              rules={[{ required: true }]}
            >
              <Input readOnly placeholder="Total Number of users Receiving Promotions" />
            </Form.Item>
            <Form.Item
              label="Total Number of users Purchasing Promotions"
              name="purchasingPromotions"
              rules={[{ required: true }]}
            >
              <Input readOnly placeholder="Total Number of users Purchasing Promotions" />
            </Form.Item>
            <Form.Item label="Others" name="other" rules={[{ required: true }]}>
              <Input readOnly placeholder="Others" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={12} className="mg-top-40">
            <Row className="fields-row" justify="space-around" type="flex">
              <Col span={8} xs={24} sm={8} lg={8}>
                <Form.Item name="close">
                  <Link to="/campaign-status-console">
                    <Button className="action-btn" type="secondary">
                      Close
                    </Button>
                  </Link>
                </Form.Item>
              </Col>
              <Col span={8} xs={24} sm={8} lg={8}>
                <Form.Item name="refresh">
                  <Button onClick={() => window.document.reload()} className="action-btn" type="primary">
                    Refresh
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  );
};

ViewCampaignStatisticsContainer.propTypes = {
  getCampaignStatusById: PropTypes.func,
  updateCampaignStatus: PropTypes.func,
  addCampaignStatus: PropTypes.func,
  campaignStatus: PropTypes.object,
  loading: PropTypes.bool,
};
export default ViewCampaignStatisticsContainer;
