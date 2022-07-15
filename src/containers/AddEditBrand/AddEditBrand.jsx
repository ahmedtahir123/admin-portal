import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, Row, Select, Col, Radio, Upload, Divider, Spin, Popconfirm, Progress } from "antd";
import PropTypes from "prop-types";
import _isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import _get from "lodash/get";
import * as moment from "dayjs";

import "./AddEditBrand.scss";
import GalleryManager from "../GalleryManager";
import GalleryGrid from "../GalleryGrid";
import { galleryImages } from "../../__mocks__/galleryImages";
import ROUTES from "../../routes/constant.route";
import { getBase64, beforeUpload, numberOnly } from "../../utils/utils";
import { STATUS, VALIDATE_FORM_MESSAGES_TEMPLATE, CONFIRM_MESSAGE, DATE_FORMAT_TIME } from "../../utils/constants";

import listingCardImage from "../../images/listing-card.svg";
import PageTitle from "../../components/PageTitle/PageTitle";

const { Option } = Select;

const AddEditBrandContainer = ({
  loading,
  brand,
  getBrandById,
  updateBrand,
  addBrand,
  categoryList,
  categoryLoader,
  history,
  deleteBrand,
  getDealCategoriesList,
  uploadLoader,
}) => {
  const [form] = Form.useForm();
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [downloadPercent, setDownloadPercent] = useState(0);
  const [_galleryImages, _setGalleryImages] = useState(galleryImages);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [logoImage, setLogoImage] = useState({
    type: "listing-logo",
    name: "logo-image",
    uid: 0,
    file: null,
    url: listingCardImage,
  });
  const [cardImage, setCardImage] = useState({
    type: "listing-card",
    name: "card-image",
    uid: 1,
    file: null,
    url: listingCardImage,
  });
  const { id } = useParams();
  const isEditView = !!id;

  const resetStates = () => {
    setUploadedImages([]);
    _setGalleryImages([]);
    setLogoImage({
      type: "listing-logo",
      name: "logo-image",
      uid: 0,
      file: null,
      url: listingCardImage,
    });
    setCardImage({
      type: "listing-card",
      name: "card-image",
      uid: 1,
      file: null,
      url: listingCardImage,
    });
  };

  useEffect(() => {
    if (id) {
      fetchBrandDetail(id);
    }
    getDealCategoriesList({ page: 0, size: 500 });
  }, [id]);

  const getProgress = ({ loaded, total }) => {
    const progress = Math.floor((loaded / total) * 100);
    if (progress !== 100) {
      setDownloadPercent(progress);
      return;
    }
    setDownloadPercent(100);
  };

  useEffect(() => {
    if (categoryList.length && brand.categoryCode && isEditView) {
      const dealCategory = categoryList.find(d => d.code === brand.categoryCode);
      const categoryCode = dealCategory ? dealCategory.code : undefined;
      form.setFieldsValue({ categoryCode });
    }
  }, [categoryList, brand]);

  useEffect(() => {
    if (!_isEmpty(brand) && !loading && isEditView) {
      setFormValues();
    }
  }, [brand, loading]);

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
  const fetchBrandDetail = async () => {
    await getBrandById(id);
  };
  const setFormValues = () => {
    form.setFieldsValue({
      code: brand.code,
      name: brand.name,
      enabled: brand.enabled,
      status: brand.status,
      punchLine: brand.punchLine,
      website: brand.website,
      description: brand.description,
      address: brand.address,
      contacts: brand.contacts,
    });
    if (brand.card) setCardImage({ ...cardImage, file: null, url: brand.card });
    if (brand.logo) setLogoImage({ ...logoImage, file: null, url: brand.logo });
    if (brand.banners && brand.banners.length) {
      _setGalleryImages(brand.banners);
    }
  };

  const _cancelBrand = () => {
    history.goBack();
  };

  const onFormFinish = async fieldsValue => {
    const dealCategory = categoryList.find(d => d.code === fieldsValue.categoryCode);
    const categoryCode = dealCategory ? dealCategory.code : null;
    const categoryName = dealCategory && dealCategory.name ? dealCategory.name : null;
    const values = {
      ...fieldsValue,
      logo: logoImage.file ? logoImage : null,
      card: cardImage.file ? cardImage : null,
      banners: uploadedImages,
      categoryCode,
      categoryName,
    };
    try {
      if (id) {
        await updateBrand(id, { ...brand, ...values }, getProgress);
      } else {
        await addBrand(values, getProgress);
      }
      history.push(ROUTES.BRAND_MANAGEMENT.path);
    } catch (error) {
      console.log("Error", error);
    }
  };
  const handleLogoImageChange = ({ fileList, file }) => {
    getBase64(file, url => {
      const fileObj = {
        type: "listing-logo",
        name: file.name,
        uid: file.uid,
        file,
        url,
      };
      setLogoImage(fileObj);
    });
  };
  const handleCardImageChange = ({ fileList, file }) => {
    getBase64(file, url => {
      const fileObj = {
        type: "listing-card",
        name: file.name,
        uid: file.uid,
        file,
        url,
      };
      setCardImage(fileObj);
    });
  };
  const _deleteBrand = async () => {
    try {
      await deleteBrand(id);
      history.push(ROUTES.BRAND_MANAGEMENT.path);
    } catch (error) {
      console.log("brand del error", error);
    }
  };

  const initialValues = {
    status: STATUS.NON_VERIFIED,
    enabled: true,
  };

  const registeredPartners = 0;
  const createdAt = _get(brand, "createdAt", "") ? moment(brand.createdAt).format(DATE_FORMAT_TIME) : "";
  const updatedAt = _get(brand, "updatedAt", "") ? moment(brand.updatedAt).format(DATE_FORMAT_TIME) : "";

  return (
    <>
      {loading ? (
        <div className="edit-form__spin">
          <Spin size="large" tip="Loading ..." />
        </div>
      ) : null}

      <PageTitle title={isEditView ? "Edit Brand" : "Add Brand"} />
      <Form
        form={form}
        className="AddEditBrand"
        layout="vertical"
        name="nest-messages"
        initialValues={initialValues}
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            {isEditView ? (
              <Form.Item label="Brand Code" name="code">
                <Input readOnly placeholder="Brand Code" />
              </Form.Item>
            ) : null}
            <Form.Item label="Brand Name" name="name" rules={[{ required: true }]}>
              <Input placeholder="Brand Name" />
            </Form.Item>
            <Form.Item label="Category" name="categoryCode" rules={[{ required: true }]}>
              <Select
                className="category-select"
                showSearch
                placeholder="Select Category"
                optionFilterProp="children"
                loading={categoryLoader}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {_map(categoryList, category => (
                  <Option key={category.code} value={category.code}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Marketing Punch Line" name="punchLine">
              <Input placeholder="Marketing Punch Line" />
            </Form.Item>

            <Form.Item label="Main Website" name="website">
              <Input placeholder="Main Website" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea rows={10} maxLength="500" placeholder="Description" />
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
                    <Upload showUploadList={false} beforeUpload={beforeUpload} onChange={handleLogoImageChange}>
                      <Button>Change Logo Image</Button>
                    </Upload>
                  </div>
                </div>
              </div>
            </Form.Item>
            <Divider />
            <Form.Item label="">
              <div className="text-center bg-gray">
                <img src={cardImage.url} alt="avatar" width={250} />
                <div className="upload-container">
                  <Upload showUploadList={false} beforeUpload={beforeUpload} onChange={handleCardImageChange}>
                    <Button>Change Listing Page Card Image</Button>
                  </Upload>
                </div>
              </div>
            </Form.Item>
            <Divider />
            <Form.Item label="">
              <div className="text-center">
                <GalleryGrid images={_galleryImages} gridOnly />
                <div className="upload-container">
                  <Button onClick={openGallery}>Manage Banner Gallery</Button>
                </div>
              </div>
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="Head Office Address" name="address">
              <Input placeholder="Head Office Address" />
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
                  max: 20,
                },
                numberOnly,
              ]}
            >
              <Input className="input-number-full-width" placeholder="Customer Support Number" />
            </Form.Item>
            <Form.Item label="Toll Free Number" name={["contacts", "tollFreeNumber"]} rules={[{ max: 20 }, numberOnly]}>
              <Input className="input-number-full-width" placeholder="Toll Free Number" />
            </Form.Item>
            <Form.Item
              label="Customer Support Email Address"
              name={["contacts", "customerSupportEmail"]}
              rules={[{ type: "email" }]}
            >
              <Input placeholder="Customer Support Email Address" />
            </Form.Item>
          </Col>
          {isEditView ? (
            <Col span={8} xs={24} sm={12} lg={12} className="mg-top-40">
              <div className="registeredPartners">
                <p>Total Numbers of Registered Outlets: {registeredPartners}</p>
              </div>
            </Col>
          ) : null}
        </Row>

        <Divider />

        {isEditView ? (
          <Row className="fields-row" gutter={20}>
            <Col span={8} xs={24} sm={12} lg={12}>
              Created By: {_get(brand, "createdBy", "")}
              <br />
              Created At: {createdAt}
              <br />
              Last Modify By: {_get(brand, "updatedBy", "")}
              <br />
              Last Modify At: {updatedAt}
            </Col>
            <Col span={8} xs={24} sm={12} lg={12}>
              <Row className="fields-row" gutter={24} type="flex">
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  <Form.Item>
                    <Popconfirm
                      title={CONFIRM_MESSAGE.DELETE}
                      onConfirm={_deleteBrand}
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
                    {/* <Popconfirm
                      title={CONFIRM_MESSAGE.CANCEL}
                      onConfirm={_cancelBrand}
                      onCancel={() => {}}
                      okText="Yes"
                      cancelText="No"
                    > */}
                    <Button type="info" onClick={_cancelBrand}>
                      Cancel
                    </Button>
                    {/* </Popconfirm> */}
                  </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} disabled={uploadLoader}>
                      {uploadLoader ? (
                        <Progress strokeLinecap="square" strokeColor="#F7931E" percent={downloadPercent} />
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
              <Button className="action-btn mg-right-50" type="info" onClick={_cancelBrand}>
                Cancel
              </Button>
              <Button loading={loading} disabled={uploadLoader} className="action-btn" type="primary" htmlType="submit">
                {uploadLoader ? (
                  <Progress strokeLinecap="square" strokeColor="#F7931E" percent={downloadPercent} />
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
      </Form>
    </>
  );
};

AddEditBrandContainer.propTypes = {
  getBrandById: PropTypes.func,
  updateBrand: PropTypes.func,
  categoryList: PropTypes.array,
  categoryLoader: PropTypes.bool,
  addBrand: PropTypes.func,
  brand: PropTypes.object,
  loading: PropTypes.bool,
  getDealCategoriesList: PropTypes.func,
  deleteBrand: PropTypes.func,
  history: PropTypes.object,
  uploadLoader: PropTypes.bool,
};
export default AddEditBrandContainer;
