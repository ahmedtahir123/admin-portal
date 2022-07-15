import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Popconfirm,
  Radio,
  Row,
  Select,
  Spin,
  TimePicker,
  Upload,
  Progress,
} from "antd";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import _debounce from "lodash/debounce";
import * as moment from "dayjs";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BillingPlanDrawer from "../../providers/billingPlanDrawer.provider";
import CustomIcon from "../../components/CustomIcon/CustomIcon";
import FileManager from "../../components/FileManager/FileManager";
import MapDrawer from "../../components/MapDrawer";
import { StatusRadioButtons } from "../../components/StatusRadioButtons/StatusRadioButtons";
import logo from "../../images/listing-card.svg";
import ROUTES from "../../routes/constant.route";
import "../../styles/_helpers.scss";
import BillingHoursPlanDrawer from "../../components/BillingHoursPlanDrawer";

import {
  CONFIRM_MESSAGE,
  STATUS,
  VALIDATE_FORM_MESSAGES_TEMPLATE,
  DATE_FORMAT_TIME,
  TIME_FORMAT,
  RedemptionType,
  REDEMPTION_TYPE,
  SEARCH_QUERY,
} from "../../utils/constants";
import permissionsUtil from "../../utils/permissions.util";
import { beforeUpload, getBase64, numberOnly } from "../../utils/utils";
import { documents } from "../../__mocks__/documents";
import { galleryImages } from "../../__mocks__/galleryImages";
import GalleryGrid from "../GalleryGrid";
import GalleryManager from "../GalleryManager";
import "./AddEditPartner.scss";
import PageTitle from "../../components/PageTitle/PageTitle";
import { getUser } from "../../utils/auth.utils";

const { RangePicker } = TimePicker;
const { Option } = Select;

const AddEditPartnerContainer = ({
  getPartnerById,
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
  brandFilterListSuccess,
}) => {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [logoImage, setLogoImage] = useState({
    type: "listing-card",
    name: "logo-image",
    uid: 0,
    file: null,
    url: logo,
  });
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [fileManagerVisible, setFileManagerVisible] = useState(false);
  const [documentFiles, setDocumentFiles] = useState(documents);
  const [_galleryImages, _setGalleryImages] = useState(galleryImages);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [BussinessHours, setBussinessHours] = useState([]);

  const [downloadPercentage, setDownloadPercent] = useState(0);
  const [_location, _setLocation] = useState(null);
  // const [_brand, _setBrand] = useState(null);
  const [_redemptionType, _setRedemptionType] = useState(REDEMPTION_TYPE.BOTH);

  const [billingPlanDrawerVisibility, setBillingPlanDrawerVisibility] = useState(false);
  const [billingHoursPlanDrawerVisibility, setBillingHoursPlanDrawerVisibility] = useState(false);

  const [form] = Form.useForm();
  const { id } = useParams();
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

  const brandArr = filteredBrands.length ? filteredBrands : [];
  const areaSegmentArr = areaSegments.length ? areaSegments : [];
  const createdAt = _get(partner, "createdAt", "") ? moment(partner.createdAt).format(DATE_FORMAT_TIME) : "";
  const updatedAt = _get(partner, "updatedAt", "") ? moment(partner.updatedAt).format(DATE_FORMAT_TIME) : "";
  // const _place = `${_get(_location, "name", "")} ${
  //   _get(_location, "latitude") ? `(${_get(_location, "latitude")}, ${_get(_location, "longitude")})` : "Place Name"
  // }`;

  const canEditBrand = permissionsUtil.checkAuth({
    category: "PartnerManagement",
    subCategory: "Partner",
    action: "EditBrand",
  });
  const canEditAreaSegment = permissionsUtil.checkAuth({
    category: "PartnerManagement",
    subCategory: "Partner",
    action: "EditAreaSegment",
  });
  const canEditStatus = permissionsUtil.checkAuth({
    category: "PartnerManagement",
    subCategory: "Partner",
    action: "EditStatus",
  });
  const canViewBillingPlan = permissionsUtil.checkAuth({
    category: "PartnerManagement",
    subCategory: "Partner",
    action: "ViewBillingPlan",
  });
  const canEditBillingPlan = permissionsUtil.checkAuth({
    category: "PartnerManagement",
    subCategory: "Partner",
    action: "EditBillingPlan",
  });
  const canDelete = permissionsUtil.checkAuth({
    category: "PartnerManagement",
    subCategory: "Partner",
    action: "EditDelete",
  });
  const canCancel = permissionsUtil.checkAuth({
    category: "PartnerManagement",
    subCategory: "Partner",
    action: "EditCancel",
  });
  const canApproveContract = permissionsUtil.checkAuth({
    category: "PartnerManagement",
    subCategory: "Partner",
    action: "ApproveContract",
  });
  const canApprovePartner = permissionsUtil.checkAuth({
    category: "PartnerManagement",
    subCategory: "Partner",
    action: "ApprovePartner",
  });

  const partnerStatus = STATUS[partner.partnerStatus];
  const userRole = getUser("userRole") || "";
  const showContractApproveBtn =
    userRole === "ADMIN" || (partnerStatus === STATUS.CONTRACT_READY && canApproveContract);

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
      url: logo,
    });
    brandFilterListSuccess([]);
  };

  const getProgress = ({ loaded, total }) => {
    const progress = Math.floor((loaded / total) * 100);
    if (progress !== 100) {
      setDownloadPercent(progress);
      return;
    }
    setDownloadPercent(100);
  };

  const onSave = weeklyBussinessHours => {
    setBussinessHours(weeklyBussinessHours);
  };

  useEffect(() => {
    if (editMode) {
      getPartnerById(id);
    }
    const query = { page: 0, size: 500 };
    // getBrandNamesList(SEARCH_QUERY);
    getSegmentList(query);
  }, [id]);

  useEffect(() => {
    if (!_isEmpty(partner) && !loading && editMode) {
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
    if (areaSegments.length && partner.areaSegment && editMode) {
      const areaObj = areaSegments.find(d => d.code === partner.areaSegment.code);
      const areaSegment = areaObj ? partner.areaSegment.code : undefined;
      form.setFieldsValue({ areaSegment });
    }
  }, [areaSegments, partner]);

  // useEffect(() => {
  //   if (brands.length && partner.brand && editMode) {
  //     const brandObj = brandArr.find(d => d.code === partner.brand.code);
  //     const brand = brandObj ? partner.brand.code : undefined;
  //     form.setFieldsValue({ brand });
  //     // _setBrand(brandObj);
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
      openingTime: rangeTimeValue[0].format(TIME_FORMAT), // .valueOf(),
      closingTime: rangeTimeValue[1].format(TIME_FORMAT), // .valueOf(),
      card: logoImage.file ? logoImage : null,
      documents: uploadedFiles.length ? uploadedFiles : null,
      banners: uploadedImages,
      longitude: _location ? _location.longitude : null,
      latitude: _location ? _location.latitude : null,
      location: _location ? _location.name : null,
      weeklyBussinessHours: BussinessHours,
      pin: parseInt(fieldsValue.pin, 10),
      partnerStatus: editMode ? partner.partnerStatus : STATUS.NOT_READY,
    };
    delete values.period;

    try {
      if (id) {
        await updatePartner(id, { ...partner, ...values }, getProgress);
      } else {
        await addPartner(values, getProgress);
      }
      if (canDelete) {
        history.push(ROUTES.PARTNER_MANAGEMENT.path);
      }
    } catch (error) {
      console.log("Error", error);
    }

    // if (editMode) {
    //   updatePartner(id, { ...partner, ...values });
    // } else {
    //   addPartner(values);
    // }
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
    const openingTime = partner.openingTime ? moment(partner.openingTime, TIME_FORMAT).toDate() : undefined;
    const closingTime = partner.closingTime ? moment(partner.closingTime, TIME_FORMAT).toDate() : undefined;
    const period = [moment(openingTime), moment(closingTime)];
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
      location: partner.location,
      redemptionType: partner.redemptionType,
      pin: partner.pin,
      period,
      availibilityNote: partner.availibilityNote,
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
      const { longitude, latitude, location } = partner;
      _setLocation({ longitude, latitude, name: location });
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
  const showBillingHoursPlan = () => {
    setBillingHoursPlanDrawerVisibility(true);
  };
  const closeBillingPlan = () => {
    setBillingPlanDrawerVisibility(false);
  };
  const closeBillingHoursPlan = () => {
    setBillingHoursPlanDrawerVisibility(false);
  };
  const createBillingPlan = value => {
    updatePartnerStatus(id, STATUS.CONTRACT_READY_API);
    console.log(value);
  };
  const onLocationChange = place => {
    if (!_isEmpty(place)) {
      _setLocation(place);
      form.setFieldsValue({ location: place.name });
    }
    setIsMapVisible(false);
  };

  const _deletePartner = async () => {
    try {
      await deletePartner(id);
      history.push(ROUTES.PARTNER_MANAGEMENT.path);
    } catch (error) {
      console.log("partner del error", error);
    }
  };

  const onBrandChange = code => {
    const brandObj = brandArr.find(d => d.code === code);
    form.setFieldsValue({ website: brandObj.website });
  };

  const redemptionChange = value => {
    _setRedemptionType(value);
  };

  const handleBrandSearch = value => {
    if (value) {
      let query = { ...SEARCH_QUERY, name: value };
      const code = form.getFieldValue("categoryCode");
      if (code) {
        query = { ...SEARCH_QUERY, name: value, categoryCode: code };
      }
      getBrandNamesList(query);
    } else {
      form.resetFields(["brandCode"]);
      console.log("else condition of search text");
    }
  };

  const delayBrandSearch = _debounce(handleBrandSearch, 300);

  return (
    <Fragment>
      {loading ? (
        <div className="edit-form__spin">
          <Spin size="large" tip="Loading ..." />
        </div>
      ) : null}

      <PageTitle title={editMode ? "Edit Outlet" : "Add Outlet"} />
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
            {editMode ? (
              <Form.Item label="Outlet Code" name="code">
                <Input placeholder="Outlet Code" readOnly />
              </Form.Item>
            ) : null}
            <Form.Item label="Outlet Name" name="name" rules={[{ required: true }]}>
              <Input placeholder="Outlet Name" />
            </Form.Item>
            <Form.Item label="Brand" name="brand" rules={[{ required: true }]}>
              <Select
                className="category-select"
                showSearch
                placeholder="Select Brand"
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                value={brandArr}
                disabled={!canEditBrand}
                onChange={onBrandChange}
                onSearch={delayBrandSearch}
              >
                {_map(brandArr, brand => (
                  <Option key={brand.code} value={brand.code}>
                    {brand.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Marketing Punch Line" name="punchLine">
              <Input placeholder="Marketing Punch Line" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea maxLength="500" rows={9} placeholder="Description" />
            </Form.Item>
            <Form.Item label="Main Website" name="website">
              <Input placeholder="Main Website" />
            </Form.Item>

            {editMode && (canViewBillingPlan || canEditBillingPlan) ? (
              <>
                <Row type="flex" justify="space-between">
                  <h3>Billing Plan</h3>
                  <h3 className="color-orange">ACTIVE</h3>
                </Row>
                <Row type="flex" justify="space-between">
                  <Form.Item className="text-left mg-top-40">
                    <Button onClick={showBillingPlan}>{canEditBillingPlan ? "Edit" : "View"} Billing Plan</Button>
                  </Form.Item>
                  <Form.Item className="text-left mg-top-40">
                    <Button>Manage Billing Plan</Button>
                  </Form.Item>
                </Row>
              </>
            ) : null}
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
          <Col span={8} xs={24} sm={12} lg={12} className="mg-top-40">
            <Form.Item className="text-left" name="enabled">
              <Radio.Group disabled={!canEditStatus}>
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
            <Divider />
            <Form.Item label="">
              <div className="text-center">
                <div className="bg-gray">
                  <img src={logoImage.url} alt="avatar" width={250} />
                  <div className="upload-container">
                    <Upload showUploadList={false} beforeUpload={beforeUpload} onChange={handleImageChange}>
                      <Button>Change Listing Page Card Image</Button>
                    </Upload>
                  </div>
                </div>
              </div>
            </Form.Item>
            <Divider />
            <Form.Item label="">
              <div className="text-center">
                <div className="bg-gray">
                  <GalleryGrid images={_galleryImages} gridOnly />
                  <div className="upload-container">
                    <Button onClick={openGallery}>Manage Banner Gallery</Button>
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
                disabled={!canEditAreaSegment}
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
                    Add / Edit Location
                  </Button>
                </div>
              }
              rules={[{ required: true }]}
              name="location"
            >
              <Input placeholder="Place Name" disabled />
            </Form.Item>
            <Form.Item
              label="Corporate Number"
              name={["contacts", "corporateNumber"]}
              rules={[
                {
                  required: true,
                  max: 20,
                },
                numberOnly,
              ]}
            >
              <Input className="input-number-full-width" placeholder="Corporate Number" />
            </Form.Item>

            <Form.Item
              label="Customer Support Number"
              name={["contacts", "customerSupportNumber"]}
              rules={[
                {
                  required: true,
                  max: 20,
                },
                numberOnly,
              ]}
            >
              <Input className="input-number-full-width" placeholder="Customer Support Number" />
            </Form.Item>
            {/* <Form.Item label="Opening / Closing Time" name="period" rules={[{ required: true }]}>
              <RangePicker format={TIME_FORMAT} />
            </Form.Item> */}
            <Form.Item label="Availibility Note" name="availibilityNote">
              <Input.TextArea maxLength="500" rows={5} placeholder="Availibility Note" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={12}>
            <h3>Today Bussiness Hours Plan</h3>
            <Form.Item name="period" rules={[{ required: true }]}>
              <RangePicker style={{ width: "100%" }} format={TIME_FORMAT} />
            </Form.Item>
            <Form.Item name="availibilityNote">
              <Input.TextArea maxLength="500" rows={1} placeholder="Availibility Note" />
            </Form.Item>
            <Form.Item>
              <Row type="flex" justify="space-between">
                <Button>Open Business Now</Button>
                <Button>Close Business Now</Button>
              </Row>
            </Form.Item>
            <Row>
              <Button onClick={showBillingHoursPlan} style={{ width: "100%" }}>
                Manage Weekly Business Hours Plan
              </Button>
            </Row>
            <Divider />
            <Form.Item label="">
              <div className="text-center">
                <div className="bg-gray">
                  <GalleryGrid images={documentFiles} gridOnly type="file" />
                  <div className="upload-container">
                    <Button onClick={openFileManager}>Manage File Documents</Button>
                  </div>
                </div>
              </div>
            </Form.Item>
            <Divider />

            {editMode ? (
              <div className="text-right">
                {/* {showContractApproveBtn ? ( */}
                <Form.Item>
                  <Button
                    disabled={!showContractApproveBtn}
                    type="secondary"
                    onClick={() => updatePartnerStatus(id, STATUS.MERCHANT_APPROVED_API)}
                  >
                    Approve Contract
                  </Button>
                </Form.Item>
                {/* ) : null} */}
                {canApprovePartner ? (
                  <Form.Item>
                    <Button type="secondary" onClick={() => updatePartnerStatus(id, STATUS.ADMIN_APPROVED_API)}>
                      Approve Outlet
                    </Button>
                  </Form.Item>
                ) : null}
              </div>
            ) : null}
          </Col>
        </Row>

        <Divider />
        {editMode ? (
          <Row className="fields-row" gutter={20}>
            <Col span={8} xs={24} sm={12} lg={12}>
              Created By: {_get(partner, "createdBy", "")}
              <br />
              Created At: {createdAt}
              <br />
              Last Modify By: {_get(partner, "updatedBy", "")}
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
                        onConfirm={_deletePartner}
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
                      <Button type="info" onClick={() => history.goBack()}>
                        Cancel
                      </Button>
                    </Form.Item>
                  ) : null}
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
        ) : (
          <Row className="fields-row" justify="end" type="flex">
            <Col>
              <Link to="/partner-management">
                <Button className="action-btn mg-right-50" type="info" onClick={() => history.goBack()}>
                  Cancel
                </Button>
              </Link>
              <Button className="action-btn" type="primary" htmlType="submit" loading={loading} disabled={uploadLoader}>
                {uploadLoader ? (
                  <Progress strokeLinecap="square" strokeColor="#F7931E" percent={downloadPercentage} />
                ) : (
                  "Create"
                )}
              </Button>
            </Col>
          </Row>
        )}
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
      {editMode && (canViewBillingPlan || canEditBillingPlan) ? (
        <BillingPlanDrawer
          createBillingPlan={createBillingPlan}
          visibility={billingPlanDrawerVisibility}
          close={closeBillingPlan}
          _readOnly={!canEditBillingPlan && canViewBillingPlan}
        />
      ) : null}
      <MapDrawer
        location={_location}
        visible={isMapVisible}
        onCancel={() => setIsMapVisible(false)}
        onSave={onLocationChange}
        title="Outlet Location"
        showSearchBox
      />
      <BillingHoursPlanDrawer
        onSave={onSave}
        visibility={billingHoursPlanDrawerVisibility}
        close={closeBillingHoursPlan}
        BussinessHours={BussinessHours}
      />
    </Fragment>
  );
};

AddEditPartnerContainer.propTypes = {
  addPartner: PropTypes.func,
  getPartnerById: PropTypes.func,
  updatePartner: PropTypes.func,
  partner: PropTypes.object,
  loading: PropTypes.bool,
  uploadLoader: PropTypes.bool,
  getSegmentList: PropTypes.func,
  getBrandNamesList: PropTypes.func,
  filteredBrands: PropTypes.array,
  areaSegments: PropTypes.array,
  deletePartner: PropTypes.func,
  history: PropTypes.object,
  updatePartnerStatus: PropTypes.func,
  brandFilterListSuccess: PropTypes.func,
};

export default AddEditPartnerContainer;
