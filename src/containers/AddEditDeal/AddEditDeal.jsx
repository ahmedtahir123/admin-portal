import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Popconfirm,
  Radio,
  Row,
  Select,
  Spin,
  Table,
  Upload,
  InputNumber,
  Progress,
} from "antd";
import PropTypes from "prop-types";
import * as moment from "dayjs";
import _isEmpty from "lodash/isEmpty";
import _debounce from "lodash/debounce";
import _get from "lodash/get";
import "./AddEditDeal.scss";
import _map from "lodash/map";
import GalleryManager from "../GalleryManager";
import GalleryGrid from "../GalleryGrid";
import { galleryImages } from "../../__mocks__/galleryImages";
import { beforeUpload, getBase64, isJSON } from "../../utils/utils";
import {
  SELECTED_PARTNER_COL,
  CONFIRM_MESSAGE,
  STATUS,
  VALIDATE_FORM_MESSAGES_TEMPLATE,
  DATE_FORMAT_TIME,
  DATE_FORMAT,
  SEARCH_QUERY,
} from "../../utils/constants";
import ChangePartnerProvider from "../../providers/changePartner.provider";
import { dealTypeList } from "../../__mocks__/deal";
import listingPageCardImage from "../../images/listing-card.svg";
import PageTitle from "../../components/PageTitle/PageTitle";

const { Option } = Select;
const { RangePicker } = DatePicker;

const AddEditDealContainer = ({
  loading,
  uploadLoader,
  brandLoader,
  deal,
  addDeal,
  getDealById,
  updateDeal,
  getDealCategoriesList,
  getBrandNamesList,
  filteredBrands,
  categories,
  deleteAllDeals,
  getPartnerList,
  partners,
  history,
}) => {
  const [form] = Form.useForm();
  const [isPartnerDrawerVisible, setIsPartnerDrawerVisible] = useState(false);
  const [dealPartners, setSelectedPartners] = useState([]);
  const [downloadPercentage, setDownloadPercent] = useState(0);

  // const [_brand, _setBrand] = useState(null);
  const [brandCode, setBrandCode] = useState(null);
  const [categoryCode, setCategoryCode] = useState(null);
  // --------- Image Upload States -------
  const [logoImage, setLogoImage] = useState({
    type: "listing-card",
    name: "logo-image",
    uid: 0,
    file: null,
    url: listingPageCardImage,
  });
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [_galleryImages, _setGalleryImages] = useState(galleryImages);
  const [uploadedImages, setUploadedImages] = useState([]);

  const resetStates = () => {
    setUploadedImages([]);
    _setGalleryImages([]);
    setLogoImage({
      type: "listing-card",
      name: "logo-image",
      uid: 0,
      file: null,
      url: listingPageCardImage,
    });
    setBrandCode(null);
    setCategoryCode(null);
    // _setBrand({
    //   name: "",
    //   logo: NoLogo,
    //   code: null,
    // });
  };

  // ------------- Upload states end ------------------
  const { id } = useParams();
  const isEditView = !!id;

  const createdAt = _get(deal, "createdAt", "") ? moment(deal.createdAt).format(DATE_FORMAT_TIME) : "";
  const updatedAt = _get(deal, "updatedAt", "") ? moment(deal.updatedAt).format(DATE_FORMAT_TIME) : "";

  useEffect(() => {
    if (id) {
      fetchDealDetail(id);
    }
  }, [id]);

  useEffect(() => {
    const query = { page: 0, size: 500 };
    getDealCategoriesList(query);
    getPartnerList(query);
  }, []);

  useEffect(() => {
    if (!_isEmpty(deal) && !loading && isEditView) {
      setFormValues();
      const brandName = _get(deal, "brand.name", "");
      const _categoryCode = _get(deal, "category.code", "");
      getBrandNamesList({ ...SEARCH_QUERY, name: brandName, categoryCode: _categoryCode }).then(brands => {
        const testCode = _get(deal, "brand.code", "");
        const brandObj = brands.find(d => d.code === testCode);
        const _brandCode = brandObj ? brandObj.code : undefined;
        form.setFieldsValue({ brandCode: _brandCode });
        setBrandCode(_brandCode);
      });
    }
  }, [deal, loading]);

  const getProgress = ({ loaded, total }) => {
    const progress = Math.floor((loaded / total) * 100);
    if (progress !== 100) {
      setDownloadPercent(progress);
      return;
    }
    setDownloadPercent(100);
  };

  // useEffect(() => {
  //   if (!_isEmpty(deal) && filteredBrands.length && isEditView) {
  //     const testCode = _get(deal, "brand.code", "");
  //     const brandObj = filteredBrands.find(d => d.code === testCode);
  //     const _brandCode = brandObj ? brandObj.code : undefined;
  //     form.setFieldsValue({ brandCode: _brandCode });
  //     setBrandCode(_brandCode);
  //   }
  // }, [deal, filteredBrands]);

  useEffect(() => {
    if (!_isEmpty(deal) && categories.length && isEditView) {
      const testCode = _get(deal, "category.code", "");
      const categoryObj = categories.find(d => d.code === testCode);
      const _categoryCode = categoryObj ? categoryObj.code : undefined;
      form.setFieldsValue({ categoryCode: _categoryCode });
    }
  }, [deal, categories]);

  // useEffect(() => {
  //   if (!_isEmpty(deal) && partners.length && isEditView) {
  //     const partnersMap = _get(deal, "partnersMap") || {};
  //     const _selectedPartners = partners.filter(d => partnersMap[d.code]);
  //     setSelectedPartners(_selectedPartners);
  //     setPartnerBrandCode(deal.brandCode);
  //   }
  // }, [deal, partners]);

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

  const openGallery = () => {
    setGalleryVisible(true);
  };
  const closeGallery = () => {
    setGalleryVisible(false);
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

  const fetchDealDetail = async dealId => {
    await getDealById(dealId);
  };

  const _deleteDeal = async () => {
    try {
      await deleteAllDeals(id);
      history.goBack();
    } catch (error) {
      console.log("area del error", error);
    }
  };

  const checkBoxOptions = [
    { label: "Is Transferable", value: "transferable" },
    { label: "Is Redeemable on store", value: "onOutlet" },
    { label: "Is Redeemable on delivery", value: "deliverable" },
  ];

  const setFormValues = () => {
    const dealOptions = [];
    const startDate = deal.startDate ? moment(deal.startDate) : moment();
    const endDate = deal.endDate ? moment(deal.endDate) : moment();
    const date = [startDate, endDate];

    if (deal.transferable) {
      dealOptions.push("transferable");
    }
    if (deal.onOutlet) {
      dealOptions.push("onOutlet");
    }
    if (deal.deliverable) {
      dealOptions.push("deliverable");
    }

    form.setFieldsValue({
      id: deal.id,
      code: deal.code,
      title: deal.title,
      detail: deal.detail,
      type: deal.type,
      description: deal.description,
      termsAndConditions: deal.termsAndConditions,
      enabled: deal.enabled,
      status: deal.status,
      categoryCode: _get(deal, "category.code", null),
      categoryName: _get(deal, "category.name", null),
      saving: deal.saving,
      date,
      dealOptions,
    });
    if (deal.partners && deal.partners.length) {
      _selectedPartners(deal.partners);
    }
    if (deal.bannerImageUrl) {
      setLogoImage({ ...logoImage, file: null, url: deal.bannerImageUrl });
    }
    if (deal.imageUrls && deal.imageUrls.length) {
      const imagesArr = isJSON(deal.imageUrls) ? JSON.parse(deal.imageUrls) : deal.imageUrls;
      _setGalleryImages(imagesArr);
      setUploadedImages(imagesArr);
    }
  };

  const onFormFinish = async fieldsValue => {
    console.log("form values ===", fieldsValue);
    const dealOptions = fieldsValue.dealOptions ? fieldsValue.dealOptions : [];
    let transferable = false,
      onOutlet = false,
      deliverable = false;

    // const _partners = dealPartners.map(d => {
    //   const areaSegment = d.areaSegment
    //     ? { code: d.areaSegment.code, name: d.areaSegment.name, city: d.areaSegment.city }
    //     : null;
    //   const brand = d.brand ? { code: d.brand.code, name: d.brand.name } : null;
    //   return {
    //     code: d.code,
    //     name: d.name,
    //     location: areaSegment ? areaSegment.city : "",
    //     brandCode: brand ? brand.code : "",
    //     brandName: brand ? brand.name : "",
    //   };
    // });
    const _dealBrands = fieldsValue.brandCode ? filteredBrands.find(d => d.code === fieldsValue.brandCode) : null; // dealPartners.map(d => d.brand.code);

    dealOptions.forEach(element => {
      switch (element) {
        case "transferable": {
          transferable = true;
          break;
        }
        case "onOutlet": {
          onOutlet = true;
          break;
        }
        case "deliverable": {
          deliverable = true;
          break;
        }
        default: {
          break;
        }
      }
    });
    const rangeTimeValue = fieldsValue.date;
    const categoryObj = categories.find(d => d.code === fieldsValue.categoryCode);
    const _categoryName = categoryObj ? categoryObj.name : null;
    const category = { code: fieldsValue.categoryCode, name: _categoryName };
    const status = "UNPUBLISHED";
    const values = {
      ...fieldsValue,
      startDate: rangeTimeValue[0].valueOf(),
      endDate: rangeTimeValue[1].valueOf(),
      transferable,
      onOutlet,
      deliverable,
      partners: dealPartners,
      brand: _dealBrands,
      status,
      category,
      bannerImageUrl: logoImage.file ? logoImage : null,
      imageUrls: uploadedImages.length ? uploadedImages : null,
    };
    console.log("form final values ===", values);
    try {
      if (isEditView) {
        await updateDeal(id, { ...deal, ...values }, getProgress);
      } else {
        await addDeal(values, getProgress);
      }
      history.goBack();
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleImageChange = ({ file }) => {
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

  const initialValues = {
    status: STATUS.UNPUBLISHED,
    enabled: true,
  };

  const onPartnerDrawerClose = () => {
    setIsPartnerDrawerVisible(false);
  };

  const _selectedPartners = param => {
    // if (param.length) {
    // const _brandCode = _get(param[0], "brand.code", "");
    // const _brandData = _get(param, "brand", null);
    // _setBrand(_brandData);
    // setPartnerBrandCode(_brandCode);
    setSelectedPartners(param);
    // }
  };

  const handleCategoryChange = value => {
    if (value) {
      form.resetFields(["brandCode"]);
      setBrandCode(null);
      const query = { ...SEARCH_QUERY, categoryCode: value };
      getBrandNamesList(query);
      setCategoryCode(value);
    } else {
      getBrandNamesList(SEARCH_QUERY);
      setCategoryCode(null);
    }
  };

  const handleBrandChange = value => {
    setBrandCode(value);
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
    <>
      {loading ? (
        <div className="edit-form__spin">
          <Spin size="large" tip="Loading ..." />
        </div>
      ) : null}
      <PageTitle title={isEditView ? "Edit Deal" : "Add Deal"} />
      <Form
        form={form}
        className="AddDeal"
        layout="vertical"
        name="nest-messages"
        initialValues={initialValues}
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            {isEditView ? (
              <Form.Item label="Deal Code" name="code">
                <Input readOnly placeholder="Deal Code" />
              </Form.Item>
            ) : null}
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item label="Sub Title" name="subTitle">
              <Input maxLength="100" placeholder="Sub Title" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea maxLength="500" rows={5} placeholder="Description" />
            </Form.Item>
            <Form.Item label="Terms and Conditions" name="termsAndConditions">
              <Input.TextArea maxLength="500" rows={5} placeholder="Terms and Conditions" />
            </Form.Item>
            <Form.Item label="Category" name="categoryCode" rules={[{ required: true }]}>
              <Select
                className="category-select"
                showSearch
                placeholder="Select category"
                optionFilterProp="children"
                allowClear
                onChange={handleCategoryChange}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {_map(categories, category => (
                  <Option key={category.code}>{category.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Brand" name="brandCode" rules={[{ required: true }]}>
              <Select
                showSearch
                placeholder="Select brand"
                loading={brandLoader}
                onChange={handleBrandChange}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={delayBrandSearch}
                value={filteredBrands}
              >
                {_map(filteredBrands, brand => (
                  <Option key={brand.code}>{brand.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Deal Type" name="type" rules={[{ required: true }]}>
              <Select placeholder="Select deal type" className="category-select">
                {_map(dealTypeList, type => (
                  <Option key={type.code} value={type.code}>
                    {type.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Gift Item Description" name="detail">
              <Input.TextArea
                maxLength="500"
                rows={3}
                placeholder="Gift Item Description or Discount value or Other description"
              />
            </Form.Item>
            <Form.Item label="Savings" name="saving" rules={[{ required: true, type: "number" }]}>
              <InputNumber className="input-number-full-width" placeholder="Savings" />
            </Form.Item>
            <Form.Item label="Start and End Date" name="date" rules={[{ required: true }]}>
              <RangePicker format={DATE_FORMAT} />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={12} className="mg-top-40">
            <Form.Item className="text-left" name="enabled">
              <Radio.Group>
                <Radio.Button value>Enabled</Radio.Button>
                <Radio.Button value={false}>Disabled</Radio.Button>
              </Radio.Group>
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
            <Divider />
          </Col>
        </Row>
        <Divider />
        <Row className="fields-row" type="flex">
          <Col span={8} xs={24} sm={24} lg={24}>
            <Form.Item label="Outlets" name="selectedPartners">
              <Table
                bordered
                dataSource={dealPartners}
                columns={SELECTED_PARTNER_COL}
                rowKey="code"
                pagination={false}
                size="small"
                scroll={{ y: 100 }}
              />
            </Form.Item>
          </Col>
          {/* <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="Brand (From Selected Partners)">
              {brandLoader ? (
                <Skeleton active avatar />
              ) : (
                <Row align="middle" justify="start">
                  <Col className="edit-deal__brand-logo" span={8} xs={24} sm={6} lg={6}>
                    <img src={_brandLogo} alt="avatar" />
                  </Col>
                  <Col span={8} xs={24} sm={18} lg={18}>
                    <Input placeholder="Brand Name" value={_brand.name} disabled />
                  </Col>
                </Row>
              )}
            </Form.Item>
          </Col> */}
        </Row>
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={12}>
            <Button onClick={() => setIsPartnerDrawerVisible(true)} disabled={!brandCode}>
              Add/Remove Outlet
            </Button>
          </Col>
        </Row>
        <Row className="fields-row" gutter={20} type="flex" align="middle">
          <Col span={8} xs={24} sm={12} lg={12} className="pad-top-20 pad-bottom-20">
            <Form.Item name="dealOptions" label="">
              <Checkbox.Group options={checkBoxOptions} />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={12}>
            {isEditView ? (
              <div className="deal__usage-details">
                <p>Total number of purchased: {_get(deal, "totalNoOfPurchaseCount", "0")}</p>
                <p>Total number of redemptions: {_get(deal, "totalNoOfRedeemedCount", "0")}</p>
              </div>
            ) : null}
          </Col>
        </Row>
        <Divider />
        {isEditView ? (
          <Row className="fields-row" gutter={20}>
            <Col span={8} xs={24} sm={12} lg={12}>
              Created By: {_get(deal, "createdBy", "")}
              <br />
              Created At: {createdAt}
              <br />
              Last Modify By: {_get(deal, "updatedBy", "")}
              <br />
              Last Modify At: {updatedAt}
            </Col>
            <Col span={8} xs={24} sm={12} lg={12}>
              <Row className="fields-row" gutter={24} type="flex">
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  <Form.Item>
                    <Popconfirm
                      title={CONFIRM_MESSAGE.DELETE}
                      onConfirm={_deleteDeal}
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
        ) : (
          <Row className="fields-row" justify="end" type="flex">
            <Col>
              <Button className="action-btn mg-right-50" type="info" onClick={() => history.goBack()}>
                Cancel
              </Button>
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
        <ChangePartnerProvider
          visible={isPartnerDrawerVisible}
          close={onPartnerDrawerClose}
          partners={partners}
          defaultBrandCode={brandCode}
          defaultCategoryCode={categoryCode}
          isShowSelectedPartners
          onSave={_selectedPartners}
          dealSelectedPartners={dealPartners}
        />
        <GalleryManager
          images={_galleryImages}
          visible={galleryVisible}
          close={closeGallery}
          uploadImages={uploadImages}
        />
      </Form>
    </>
  );
};
AddEditDealContainer.propTypes = {
  getDealById: PropTypes.func,
  updateDeal: PropTypes.func,
  addDeal: PropTypes.func,
  deal: PropTypes.object,
  loading: PropTypes.bool,
  brandLoader: PropTypes.bool,
  filteredBrands: PropTypes.array,
  uploadLoader: PropTypes.bool,
  getBrandNamesList: PropTypes.func,
  getDealCategoriesList: PropTypes.func,
  deleteAllDeals: PropTypes.func,
  getPartnerList: PropTypes.func,
  categories: PropTypes.array,
  partners: PropTypes.array,
  history: PropTypes.object,
};
export default AddEditDealContainer;
