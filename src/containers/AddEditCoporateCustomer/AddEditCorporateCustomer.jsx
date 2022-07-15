import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Input, Button, Radio, Row, Col, Divider, Upload, Progress, Popconfirm } from "antd";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import PropTypes from "prop-types";
import * as moment from "dayjs";
import defaultLogo from "../../images/listing-card.svg";
import "./AddEditCorporateCustomer.scss";
import "../../styles/_helpers.scss";
import { STATUS, VALIDATE_FORM_MESSAGES_TEMPLATE, CONFIRM_MESSAGE, DATE_FORMAT_TIME } from "../../utils/constants";
import { getBase64, numberOnly, beforeUpload, isJSON } from "../../utils/utils";
import ROUTES from "../../routes/constant.route";
import permissionsUtil from "../../utils/permissions.util";
import PageTitle from "../../components/PageTitle/PageTitle";

const AddEditCorporateCustomer = ({
  getCorporateCustomer,
  addCorporateCustomer,
  corporateCustomer,
  loading,
  deleteCorporateCustomer,
  history,
  uploadLoader,
  updateCorporateCustomer,
}) => {
  const [form] = Form.useForm();
  const [downloadPercentage, setDownloadPercent] = useState(0);
  const [logoImage, setLogoImage] = useState({
    type: "corporate-logo",
    name: "logo-image",
    uid: 0,
    file: null,
    url: defaultLogo,
  });
  const { id } = useParams();
  const editMode = !!id;
  const canDelete = permissionsUtil.checkAuth({
    category: "PartnerManagement",
    subCategory: "Partner",
    action: "EditDelete",
  });

  useEffect(() => {
    if (form) {
      form.resetFields();
      window.scrollTo(0, 0);
      // resetStates();
    }
  }, [form]);

  const getProgress = ({ loaded, total }) => {
    const progress = Math.floor((loaded / total) * 100);
    if (progress !== 100) {
      setDownloadPercent(progress);
      return;
    }
    setDownloadPercent(100);
  };

  useEffect(() => {
    if (editMode) {
      getCorporateCustomer(id);
    }
  }, [id]);

  useEffect(() => {
    if (!_isEmpty(corporateCustomer) && !loading && editMode) {
      setFormValues();
    }
  }, [corporateCustomer, loading]);

  const onFormFinish = fieldValues => {
    const contact = fieldValues.contact ? JSON.stringify(fieldValues.contact) : "";
    const values = {
      ...fieldValues,
      logoUrl: logoImage.file ? logoImage : null,
      contact,
    };
    try {
      if (id) {
        updateCorporateCustomer(id, { ...corporateCustomer, ...values }, getProgress).then(() => history.goBack());
      } else {
        addCorporateCustomer(values, getProgress).then(() => history.goBack());
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const setFormValues = () => {
    const contact = isJSON(corporateCustomer.contact)
      ? JSON.parse(corporateCustomer.contact)
      : corporateCustomer.contact;
    form.setFieldsValue({
      code: corporateCustomer.code,
      name: corporateCustomer.name,
      emailAddress: corporateCustomer.emailAddress,
      contact,
      pointOfContactName: corporateCustomer.pointOfContactName,
      pointOfContactDesignation: corporateCustomer.pointOfContactDesignation,
      pointOfContactNumber: corporateCustomer.pointOfContactNumber,
      pointOfContactEmailAddress: corporateCustomer.pointOfContactEmailAddress,
      enabled: corporateCustomer.enabled,
      description: corporateCustomer.description,
    });
    if (corporateCustomer.logoUrl) {
      setLogoImage({ ...logoImage, file: null, url: corporateCustomer.logoUrl });
    }
  };
  const _deleteCorporateCustomer = async () => {
    try {
      await deleteCorporateCustomer(id);
      history.push(ROUTES.CORPORATE_CUSTOMER_MANAGEMENT.path);
    } catch (error) {
      console.log("partner del error", error);
    }
  };

  const handleImageChange = ({ fileList, file }) => {
    getBase64(file, url => {
      const fileObj = {
        type: "corporate-logo",
        name: file.name,
        uid: file.uid,
        file,
        url,
      };
      setLogoImage(fileObj);
    });
  };
  const createdAt = _get(corporateCustomer, "createdAt", "")
    ? moment(corporateCustomer.createdAt).format(DATE_FORMAT_TIME)
    : "";
  const updatedAt = _get(corporateCustomer, "updatedAt", "")
    ? moment(corporateCustomer.updatedAt).format(DATE_FORMAT_TIME)
    : "";
  return (
    <>
      <PageTitle title={editMode ? "Edit Corporate Customer" : "Add Corporate Customer"} />
      <Form
        className="CorporateCustomer"
        form={form}
        initialValues={{ enabled: true }}
        layout="vertical"
        name="nest-messages"
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={50} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            {editMode ? (
              <Form.Item label="Customer Code" name="code">
                <Input placeholder="Customer Code" readOnly />
              </Form.Item>
            ) : null}
            <Form.Item
              label="Corporate Customer Name (Registered Company Name)"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Corporate Customer Name (Registered Company Name)" />
            </Form.Item>
            <Form.Item label="Email" name="emailAddress" rules={[{ required: true, type: "email" }]}>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              label="Land Line Number"
              name={["contact", "landLineNumber"]}
              rules={[{ required: true, max: 20 }, numberOnly]}
            >
              <Input className="input-number-full-width" placeholder="Land Line Number" />
            </Form.Item>
            <Form.Item label="Cell Number" name={["contact", "cellPhoneNumber"]} rules={[{ max: 20 }, numberOnly]}>
              <Input className="input-number-full-width" placeholder="Cell Number" />
            </Form.Item>
            <Form.Item label="Other Email" name={["contact", "workEmailAddress"]} rules={[{ type: "email" }]}>
              <Input placeholder="Other Email" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item className="text-left mg-top-40" name="enabled">
              <Radio.Group>
                <Radio.Button value>Enabled</Radio.Button>
                <Radio.Button value={false}>Disabled</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Divider />
            <Form.Item label=" ">
              <div className="text-center">
                <div className="bg-gray">
                  <img src={logoImage.url} alt="avatar" width={250} />
                  <div className="upload-container">
                    <Upload showUploadList={false} beforeUpload={beforeUpload} onChange={handleImageChange}>
                      <Button>Upload</Button>
                    </Upload>
                  </div>
                </div>
              </div>
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{ max: 500 }]}>
              <Input.TextArea maxLength="500" rows={9} placeholder="Description" />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Row className="fields-row" gutter={50}>
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="POC Full Name" name="pointOfContactName" rules={[{ required: true }]}>
              <Input placeholder="POC Full Name" />
            </Form.Item>
            <Form.Item label="POC Designation" name="pointOfContactDesignation">
              <Input placeholder="POC Designation" />
            </Form.Item>
            <Form.Item
              label="POC Contact Number"
              name="pointOfContactNumber"
              rules={[{ required: true, max: 20 }, numberOnly]}
            >
              <Input className="input-number-full-width" placeholder="POC Contact Number" />
            </Form.Item>
            <Form.Item label="POC Email" name="pointOfContactEmailAddress" rules={[{ required: true, type: "email" }]}>
              <Input placeholder="POC Email" />
            </Form.Item>
          </Col>
          {/* <Col className="mg-top-35" span={8} xs={24} sm={12} lg={12}>
            <div>
              <p>Total Books Subscriptions: 10</p>
              <p>Active Books Subscriptions: 2</p>
              <p>Last Subscriptions Book Name: Karachi 2019</p>
            </div>
          </Col> */}
        </Row>
        <Divider />
        {editMode ? (
          <Row className="fields-row" gutter={20}>
            <Col span={8} xs={24} sm={12} lg={12}>
              Created By: {_get(corporateCustomer, "createdBy", "")}
              <br />
              Created At: {createdAt}
              <br />
              Last Modify By: {_get(corporateCustomer, "updatedBy", "")}
              <br />
              Last Modify At: {updatedAt}
            </Col>
            <Col span={8} xs={24} sm={12} lg={12}>
              <Row className="fields-row" gutter={20} type="flex">
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  {canDelete ? (
                    <Form.Item>
                      <Popconfirm
                        title={CONFIRM_MESSAGE.DELETE}
                        onConfirm={_deleteCorporateCustomer}
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
                    <Button type="primary" htmlType="submit" disabled={loading}>
                      {loading ? (
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
        ) : (
          <Row className="fields-row" justify="end" type="flex">
            <Col>
              <Link to="/partner-management">
                <Button className="action-btn mg-right-50" type="info" onClick={() => history.goBack()}>
                  Cancel
                </Button>
              </Link>
              <Button className="action-btn" type="primary" htmlType="submit" disabled={loading}>
                {loading ? (
                  <Progress strokeLinecap="square" strokeColor="#F7931E" percent={downloadPercentage} />
                ) : (
                  "Create"
                )}
              </Button>
            </Col>
          </Row>
        )}
      </Form>
    </>
  );
};

AddEditCorporateCustomer.propTypes = {
  addCorporateCustomer: PropTypes.func,
  getCorporateCustomer: PropTypes.func,
  corporateCustomer: PropTypes.object,
  loading: PropTypes.bool,
  deleteCorporateCustomer: PropTypes.func,
  history: PropTypes.object,
  uploadLoader: PropTypes.bool,
  updateCorporateCustomer: PropTypes.func,
};

export default AddEditCorporateCustomer;
