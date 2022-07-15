import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Radio,
  Row,
  Select,
  Spin,
  TimePicker,
  Upload,
} from "antd";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import * as moment from "dayjs";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BillingPlanDrawer from "../../components/BillingPlanDrawer";
import CustomIcon from "../../components/CustomIcon/CustomIcon";
import FileManager from "../../components/FileManager/FileManager";
import MapDrawer from "../../components/MapDrawer";
import { StatusRadioButtons } from "../../components/StatusRadioButtons/StatusRadioButtons";
import listingPageCardImage from "../../images/listing-card.svg";
import ROUTES from "../../routes/constant.route";
import "../../styles/_helpers.scss";
import {
  CONFIRM_MESSAGE,
  STATUS,
  VALIDATE_FORM_MESSAGES_TEMPLATE,
  USER_ROLES,
  TIME_FORMAT,
  REDEMPTION_TYPE,
  RedemptionType,
  SEARCH_QUERY,
} from "../../utils/constants";
import permissionsUtil from "../../utils/permissions.util";
import { beforeUpload, getBase64, numberOnly } from "../../utils/utils";
import { documents } from "../../__mocks__/documents";
import { galleryImages } from "../../__mocks__/galleryImages";
import GalleryGrid from "../GalleryGrid";
import GalleryManager from "../GalleryManager";
import "./PartnerProfile.scss";
import { setUser, getUser } from "../../utils/auth.utils";

const { RangePicker } = TimePicker;
const { Option } = Select;

const AddEditPartnerContainer = ({
  getPartner,
  getBrandNamesList,
  getSegmentList,
  addPartner,
  updatePartner,
  deletePartner,
  partner,
  filteredBrands,
  areaSegments,
  loading,
  uploadLoader,
  history,
  updatePartnerStatus,
  user,
}) => {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [logoImage, setLogoImage] = useState({
    type: "listing-card",
    name: "logo-image",
    uid: 0,
    file: null,
    url: listingPageCardImage,
  });
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [fileManagerVisible, setFileManagerVisible] = useState(false);
  const [documentFiles, setDocumentFiles] = useState(documents);
  const [_galleryImages, _setGalleryImages] = useState(galleryImages);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [_location, _setLocation] = useState(null);

  const [billingPlanDrawerVisibility, setBillingPlanDrawerVisibility] = useState(false);
  const [form] = Form.useForm();
  const id = user.partnerId;
  const editMode = !!id;
  const statusRadioButtonProps = {
    currentStatus: [
      { code: STATUS.NOT_READY, name: "NOT READY" },
      { code: STATUS.CONTRACT_READY, name: "CONTRACT READY" },
      { code: STATUS.MERCHANT_APPROVED, name: "MERCHANT APPROVED" },
      { code: STATUS.ADMIN_APPROVED, name: "ADMIN APPROVED" },
    ],
    defaultValue: editMode ? STATUS[partner.partnerStatus] : STATUS.NOT_READY,
  };
  const [_redemptionType, _setRedemptionType] = useState(REDEMPTION_TYPE.BOTH);

  const brandArr = filteredBrands.length ? filteredBrands : [];
  const areaSegmentArr = areaSegments.length ? areaSegments : [];
  const documentsArr = _get(partner, "documents") ? partner.documents : documentFiles;

  // const canDelete = permissionsUtil.checkAuth({
  //   category: "PartnerManagement",
  //   subCategory: "Partner",
  //   action: "EditDelete",
  // });
  // const canCancel = permissionsUtil.checkAuth({
  //   category: "PartnerManagement",
  //   subCategory: "Partner",
  //   action: "EditCancel",
  // });
  const canApproveContract = permissionsUtil.checkAuth({
    category: "PartnerManagement",
    subCategory: "Partner",
    action: "ApproveContract",
  });
  // const canApprovePartner = permissionsUtil.checkAuth({
  //   category: "PartnerManagement",
  //   subCategory: "Partner",
  //   action: "ApprovePartner",
  // });

  const resetStates = () => {
    setUploadedFiles([]);
    setUploadedImages([]);
    setDocumentFiles([]);
    _setGalleryImages([]);
    _setLocation(null);
    setLogoImage({
      type: "listing-card",
      name: "logo-image",
      uid: 0,
      file: null,
      url: listingPageCardImage,
    });
  };

  useEffect(() => {
    if (editMode) {
      getPartner(id);
    }
    const query = { page: 0, size: 500 };
    getSegmentList(query);
  }, [id]);

  useEffect(() => {
    if (!_isEmpty(partner) && !loading) {
      setFormValues();
      const brandName = _get(partner, "brand.name", "");
      getBrandNamesList({ ...SEARCH_QUERY, name: brandName }).then(_brands => {
        const testCode = _get(partner, "brand.code", "");
        const brandObj = _brands.find(d => d.code === testCode);
        const brand = brandObj ? brandObj.code : undefined;
        form.setFieldsValue({ brand });
      });
    }
  }, [partner, loading]);

  useEffect(() => {
    if (areaSegments.length && partner.areaSegment) {
      const areaObj = areaSegments.find(d => d.code === partner.areaSegment.code);
      const areaSegment = areaObj ? partner.areaSegment.code : undefined;
      form.setFieldsValue({ areaSegment });
    }
  }, [areaSegments, partner]);

  // useEffect(() => {
  //   if (brands.length && partner.brand) {
  //     const brandObj = brandArr.find(d => d.code === partner.brand.code);
  //     const brand = brandObj ? partner.brand.code : undefined;
  //     form.setFieldsValue({ brand });
  //   }
  // }, [brands, partner]);

  // on Component did mount
  useEffect(() => {
    if (form) {
      form.resetFields();
      resetStates();
    }
    // return () => { TODO: should work on Component unMount
    //   if (form) {
    //     form.resetFields();
    //   }
    // };
  }, [form]);

  const onFormFinish = async fieldsValue => {
    const brandObj = brandArr.find(d => d.code === fieldsValue.brand);
    const areaObj = areaSegmentArr.find(d => d.code === fieldsValue.areaSegment);
    const rangeTimeValue = fieldsValue.period;

    const values = {
      ...fieldsValue,
      brand: brandObj,
      areaSegment: areaObj,
      openingTime: rangeTimeValue[0], // .valueOf(),
      closingTime: rangeTimeValue[1], // .valueOf(),
      card: logoImage.file ? logoImage : null,
      documents: uploadedFiles.length ? uploadedFiles : null,
      banners: uploadedImages,
      longitude: _location ? _location.longitude : null,
      latitude: _location ? _location.latitude : null,
      pin: parseInt(fieldsValue.pin, 10),
    };
    delete values.period;

    try {
      const payload = { ...partner, ...values };
      await updatePartner(id, payload);

      const _payload = { ...getUser(), partner: payload };
      // const _partner = { payload };

      setUser(_payload);
      // await updateUserInStore(_payload);
      history.push(ROUTES.DASHBOARD.path);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const openGallery = () => {
    setGalleryVisible(true);
  };

  const closeGallery = () => {
    setGalleryVisible(false);
  };

  const openFileManager = () => {
    setFileManagerVisible(true);
  };

  const closeFileManager = () => {
    setFileManagerVisible(false);
  };

  const uploadImages = newFiles => {
    if (newFiles && newFiles.length) {
      setUploadedImages(newFiles);
      _setGalleryImages(newFiles);
    } else {
      setUploadedImages([]);
      _setGalleryImages([]);
    }
  };

  const redemptionChange = value => {
    _setRedemptionType(value);
  };

  const _uploadFiles = newFiles => {
    if (newFiles && newFiles.length) {
      setUploadedFiles(newFiles);
      setDocumentFiles(newFiles);
    } else {
      setUploadedFiles([]);
      setDocumentFiles([]);
    }
  };

  const setFormValues = () => {
    const openingTime = partner.openingTime ? moment(partner.openingTime) : undefined;
    const closingTime = partner.closingTime ? moment(partner.closingTime) : undefined;
    const period = [openingTime, closingTime];
    form.setFieldsValue({
      code: partner.code,
      name: partner.name,
      punchLine: partner.punchLine,
      description: partner.description,
      enabled: partner.enabled,
      website: partner.website,
      card: partner.card,
      address: partner.address,
      contacts: partner.contacts,
      pin: partner.pin,
      redemptionType: partner.redemptionType,
      period,
    });
    if (partner.card) {
      setLogoImage({ ...logoImage, file: null, url: partner.card });
    }
    if (partner.banners && partner.banners.length) {
      _setGalleryImages(partner.banners);
      setUploadedImages(partner.banners);
    }
    if (partner.documents && partner.documents.length) {
      setDocumentFiles(partner.documents);
      setUploadedFiles(partner.documents);
    }
    if (partner.longitude && partner.latitude) {
      const { longitude, latitude } = partner;
      _setLocation({ longitude, latitude });
    }
    if (partner.redemptionType) {
      _setRedemptionType(partner.redemptionType);
    }
  };

  const handleImageChange = ({ fileList, file }) => {
    getBase64(file, url => {
      const fileObj = {
        type: "listing-card",
        name: file.name,
        uid: file.uid,
        file,
        url,
      };
      setLogoImage(fileObj);
    });
  };

  const showBillingPlan = () => {
    setBillingPlanDrawerVisibility(true);
  };
  const closeBillingPlan = () => {
    setBillingPlanDrawerVisibility(false);
  };
  // const createBillingPlan = value => {
  //   updatePartnerStatus(id, STATUS.CONTRACT_READY);
  //   console.log(value);
  // };
  // const onLocationChange = place => {
  //   if (!_isEmpty(place)) _setLocation(place);
  //   setIsMapVisible(false);
  // };

  // const _deletePartner = async () => {
  //   try {
  //     await deletePartner(id);
  //     history.push(ROUTES.PARTNER_MANAGEMENT.path);
  //   } catch (error) {
  //     console.log("partner del error", error);
  //   }
  // };

  // const createdAt = _get(partner, "createdAt", "") ? moment(partner.createdAt).format("DD/MM/YYYY hh:mm") : "";
  // const updatedAt = _get(partner, "updatedAt", "") ? moment(partner.updatedAt).format("DD/MM/YYYY hh:mm") : "";
  const _place = `${_get(_location, "name", "")} ${
    _get(_location, "latitude") ? `(${_get(_location, "latitude")}, ${_get(_location, "longitude")})` : "Place Name"
  }`;
  const isAssociate = user.userRole === USER_ROLES.MERCHANT_ASSOCIATE;

  return (
    <Fragment>
      {loading ? (
        <div className="edit-form__spin">
          <Spin size="large" tip="Loading ..." />
        </div>
      ) : null}
      <Divider orientation="left" className="form-divider first">
        Outlet Profile
      </Divider>
      <Form
        className="Partner"
        form={form}
        initialValues={{ enabled: true, redemptionType: REDEMPTION_TYPE.BOTH }}
        layout="vertical"
        name="nest-messages"
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={50} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="Outlet Code" name="code">
              <Input placeholder="Outlet Code" readOnly />
            </Form.Item>
            <Form.Item label="Outlet Name" name="name" rules={[{ required: true }]}>
              <Input placeholder="Outlet Name" />
            </Form.Item>
            <Form.Item label="Brand" name="brand" rules={[{ required: true }]}>
              <Select
                className="category-select"
                showSearch
                placeholder="Select Brand"
                optionFilterProp="children"
                // onChange={onChange}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                disabled
              >
                {_map(brandArr, brand => (
                  <Option key={brand.code} value={brand.code}>
                    {brand.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Marketing Punch Line" name="punchLine" rules={[{ required: true }]}>
              <Input placeholder="Marketing Punch Line" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea maxLength="500" rows={9} placeholder="Description" />
            </Form.Item>
            <Form.Item label="Main Website" name="website" rules={[{ required: true }]}>
              <Input placeholder="Main Website" />
            </Form.Item>
            <Form.Item className="text-left mg-top-40">
              <Button type="primary" onClick={showBillingPlan} disabled={isAssociate}>
                View Billing Plan
              </Button>
            </Form.Item>
            <Form.Item name="redemptionType" label="Redemption Type" rules={[{ required: true }]}>
              <Select placeholder="Redemption Type" onChange={redemptionChange}>
                {RedemptionType.map(item => (
                  <Option value={item.code}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
            {_redemptionType !== REDEMPTION_TYPE.DIGITAL ? (
              <Form.Item label="Merchant Pin" name="pin" rules={[{ required: true, len: 4 }, numberOnly]}>
                <Input placeholder="Merchant Pin" autoComplete="off" />
              </Form.Item>
            ) : null}
          </Col>
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item className="text-left" name="enabled">
              <Radio.Group>
                <Radio.Button value>Enabled</Radio.Button>
                <Radio.Button value={false}>Disabled</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Current Status" className="text-left" name="status">
              <StatusRadioButtons
                currentStatus={statusRadioButtonProps.currentStatus}
                defaultValue={statusRadioButtonProps.defaultValue}
              />
            </Form.Item>
            <Form.Item label="Listing Page Card Image">
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
            <Form.Item label="Banner Image Gallery">
              <div className="text-center">
                <div className="bg-gray">
                  <GalleryGrid images={_galleryImages} gridOnly />
                  <div className="upload-container">
                    <Button onClick={openGallery}>Manage Gallery</Button>
                  </div>
                </div>
              </div>
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Row className="fields-row" gutter={50}>
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="Area Segment" name="areaSegment" rules={[{ required: true }]}>
              <Select
                className="category-select"
                showSearch
                placeholder="Select Area Segment"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                disabled
              >
                {_map(areaSegmentArr, area => (
                  <Option key={area.code} value={area.code}>
                    {area.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Business Address" name="address" rules={[{ required: true }]}>
              <Input placeholder="Business Address" />
            </Form.Item>
            <Form.Item
              label={
                <div>
                  <label htmlFor="nest-messages_location" className="" title="Location Co-ordinates">
                    Location Co-ordinates
                  </label>
                  <Button
                    type="link"
                    className="location-btn"
                    icon={<CustomIcon name="PushpinOutlined" />}
                    onClick={() => setIsMapVisible(true)}
                  >
                    View Location
                  </Button>
                </div>
              }
            >
              <Input placeholder="Place Name" readOnly value={_place} />
            </Form.Item>
            <Form.Item
              label="Corporate Number"
              name={["contacts", "corporateNumber"]}
              rules={[{ required: true, max: 20 }]}
            >
              <InputNumber className="input-number-full-width" placeholder="Corporate Number" />
            </Form.Item>

            <Form.Item
              label="Customer Support Number"
              name={["contacts", "customerSupportNumber"]}
              rules={[{ required: true, max: 20 }]}
            >
              <InputNumber className="input-number-full-width" placeholder="Customer Support Number" />
            </Form.Item>
            <Form.Item label="Opening / Closing Time" name="period" rules={[{ required: true }]}>
              <RangePicker format={TIME_FORMAT} />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="Documents Manager">
              <div className="text-center">
                <div className="bg-gray">
                  <GalleryGrid images={documentFiles} gridOnly type="file" />
                  <div className="upload-container">
                    <Button onClick={openFileManager}>Manage Documents</Button>
                  </div>
                </div>
              </div>
            </Form.Item>
            {canApproveContract && statusRadioButtonProps.defaultValue === STATUS.ADMIN_APPROVED ? (
              <Form.Item>
                <Button type="secondary" onClick={() => updatePartnerStatus(id, STATUS.MERCHANT_APPROVED_API)}>
                  Approve Contract
                </Button>
              </Form.Item>
            ) : null}
            {/* {canApprovePartner ? (
              <Form.Item>
                <Button type="secondary" onClick={() => updatePartnerStatus(id, STATUS.ADMIN_APPROVED_API)}>
                  Approve Outlet
                </Button>
              </Form.Item>
            ) : null} */}
          </Col>
        </Row>

        <Divider />

        <Row className="fields-row" gutter={20}>
          {/* <Col span={8} xs={24} sm={12} lg={12}>
            Created By: {_get(partner, "createdBy", "")}
            <br />
            Created At: {createdAt}
            <br />
            Last Modify By: {_get(partner, "updatedBy", "")}
            <br />
            Last Modify At: {updatedAt}
          </Col> */}
          <Col span={8} xs={24} sm={24} lg={24}>
            <Row className="fields-row" gutter={20} type="flex">
              <Col span={8} xs={24} sm={8} lg={20} className="text-right">
                <Form.Item>
                  <Button type="info" onClick={() => history.push(ROUTES.DASHBOARD.path)}>
                    Cancel
                  </Button>
                </Form.Item>
              </Col>
              <Col span={8} xs={24} sm={8} lg={4} className="text-right">
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    {uploadLoader ? "Uploading Files ..." : "Save"}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <GalleryManager
          images={_galleryImages}
          visible={galleryVisible}
          close={closeGallery}
          uploadImages={uploadImages}
        />
        <FileManager
          files={documentFiles}
          visible={fileManagerVisible}
          close={closeFileManager}
          upload={_uploadFiles}
        />
      </Form>

      <BillingPlanDrawer
        // createBillingPlan={createBillingPlan}
        visibility={billingPlanDrawerVisibility}
        close={closeBillingPlan}
      />

      <MapDrawer
        location={_location}
        visible={isMapVisible}
        onCancel={() => setIsMapVisible(false)}
        // onSave={onLocationChange}
        title="Outlet Location"
      />
    </Fragment>
  );
};

AddEditPartnerContainer.propTypes = {
  addPartner: PropTypes.func,
  getPartner: PropTypes.func,
  updatePartner: PropTypes.func,
  partner: PropTypes.object,
  user: PropTypes.object,
  loading: PropTypes.bool,
  uploadLoader: PropTypes.bool,
  getSegmentList: PropTypes.func,
  getBrandNamesList: PropTypes.func,
  filteredBrands: PropTypes.array,
  areaSegments: PropTypes.array,
  deletePartner: PropTypes.func,
  history: PropTypes.object,
  updatePartnerStatus: PropTypes.func,
};

export default AddEditPartnerContainer;
