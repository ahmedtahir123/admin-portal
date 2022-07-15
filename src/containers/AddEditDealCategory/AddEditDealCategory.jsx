import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Divider, Form, Input, Popconfirm, Radio, Row, Spin, Upload, Progress } from "antd";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import PropTypes from "prop-types";
import * as moment from "dayjs";
import listingPageCardImage from "../../images/listing-card.svg";
import { CONFIRM_MESSAGE, VALIDATE_FORM_MESSAGES_TEMPLATE, DATE_FORMAT_TIME } from "../../utils/constants";
import "../../styles/_helpers.scss";
import { beforeUpload, getBase64, isJSON } from "../../utils/utils";
import GalleryGrid from "../GalleryGrid";
import { galleryImages } from "../../__mocks__/galleryImages";
import GalleryManager from "../GalleryManager";
import PageTitle from "../../components/PageTitle/PageTitle";

const AddEditDealCategoryContainer = ({
  getDealCategoryById,
  dealCategoryData,
  updateDealCategory,
  deleteDealsCategory,
  addDealCategory,
  loading,
  history,
  uploadLoader,
}) => {
  const [userImageUrl, setUserImageUrl] = useState({
    type: "listing-card",
    name: "logo-image",
    uid: 0,
    file: null,
    url: listingPageCardImage,
  });
  const [_galleryImages, _setGalleryImages] = useState(galleryImages);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [downloadPercentage, setDownloadPercent] = useState(0);
  const { id } = useParams();
  const [form] = Form.useForm();
  const isEditView = !!id;

  const createdAt = _get(dealCategoryData, "createdAt", "")
    ? moment(dealCategoryData.createdAt).format(DATE_FORMAT_TIME)
    : "N/A";
  const updatedAt = _get(dealCategoryData, "updatedAt", "")
    ? moment(dealCategoryData.updatedAt).format(DATE_FORMAT_TIME)
    : "N/A";

  useEffect(() => {
    if (id) {
      getDealCategory(id);
    }
  }, [id]);

  useEffect(() => {
    if (!_isEmpty(dealCategoryData) && !loading && isEditView) {
      setFormValues();
    }
  }, [dealCategoryData, loading]);

  const resetStates = () => {
    setUploadedImages([]);
    _setGalleryImages([]);
    setUserImageUrl({
      type: "listing-card",
      name: "logo-image",
      uid: 0,
      file: null,
      url: listingPageCardImage,
    });
  };

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

  const _deleteDealCategory = async () => {
    try {
      await deleteDealsCategory(id);
      history.goBack();
    } catch (error) {
      console.log("area del error", error);
    }
  };

  const getDealCategory = async dealId => {
    await getDealCategoryById(dealId);
  };

  const setFormValues = () => {
    form.setFieldsValue({
      code: dealCategoryData.code,
      name: dealCategoryData.name,
      enabled: dealCategoryData.enabled,
      description: dealCategoryData.description,
      logoUrl: dealCategoryData.logoUrl,
    });
    if (dealCategoryData.logoUrl) setUserImageUrl({ ...userImageUrl, file: null, url: dealCategoryData.logoUrl });
    if (dealCategoryData.imageUrls && dealCategoryData.imageUrls.length) {
      const imagesArr = isJSON(dealCategoryData.imageUrls)
        ? JSON.parse(dealCategoryData.imageUrls)
        : dealCategoryData.imageUrls;
      _setGalleryImages(imagesArr);
      setUploadedImages(imagesArr);
    }
  };

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

  const onFormFinish = async fieldsValue => {
    const values = {
      logoUrl: userImageUrl.file ? userImageUrl : null,
      imageUrls: uploadedImages.length ? uploadedImages : null,
      ...fieldsValue,
    };
    try {
      if (isEditView) {
        await updateDealCategory(id, { ...getDealCategoryById, ...values }, getProgress);
      } else {
        await addDealCategory(values, getProgress);
      }
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };
  const getProgress = ({ loaded, total }) => {
    const progress = Math.floor((loaded / total) * 100);
    if (progress !== 100) {
      setDownloadPercent(progress);
      return;
    }
    setDownloadPercent(100);
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
      setUserImageUrl(fileObj);
    });
  };

  const initialValues = {
    enabled: true,
  };

  return (
    <>
      {loading ? (
        <div className="edit-form__spin">
          <Spin size="large" tip="Loading..." />
        </div>
      ) : null}
      <PageTitle title={isEditView ? "Edit Deal Category" : "Add Deal Category"} />
      <Form
        className="EditDealCategory"
        form={form}
        layout="vertical"
        name="nest-messages"
        initialValues={initialValues}
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            {isEditView ? (
              <Form.Item label="Category Code" name="code">
                <Input placeholder="Category Code" readOnly />
              </Form.Item>
            ) : null}
            <Form.Item label="Category Name" name="name" rules={[{ required: true }]}>
              <Input placeholder="Category Name" />
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{ required: false }]}>
              <Input.TextArea maxLength="500" rows={5} placeholder="Description" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item name="enabled" className="text-left mg-top-40">
              <Radio.Group>
                <Radio.Button value>Enabled</Radio.Button>
                <Radio.Button value={false}>Disabled</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Divider />

            <Form.Item label="">
              <div className="text-center">
                <div className="bg-gray">
                  <img src={userImageUrl.url} alt="avatar" width={250} />
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
                    <Button onClick={openGallery}>Manage Gallery</Button>
                  </div>
                </div>
              </div>
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        {isEditView ? (
          <Row className="fields-row" gutter={20}>
            <Col span={8} xs={24} sm={12} lg={12}>
              Created By: {_get(dealCategoryData, "createdBy", "")}
              <br />
              Created At: {createdAt}
              <br />
              Last Modify By: {_get(dealCategoryData, "updatedBy", "")}
              <br />
              Last Modify At: {updatedAt}
            </Col>
            <Col span={8} xs={24} sm={12} lg={12}>
              <Row className="fields-row" gutter={24} type="flex">
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  <Popconfirm
                    title={CONFIRM_MESSAGE.DELETE}
                    onConfirm={_deleteDealCategory}
                    onCancel={() => {}}
                    okText="Yes"
                    cancelText="No"
                    disabled
                  >
                    <Button type="danger" disabled>
                      Delete
                    </Button>
                  </Popconfirm>
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
                    <Button type="primary" htmlType="submit" disabled={uploadLoader} loading={loading}>
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

AddEditDealCategoryContainer.propTypes = {
  getDealCategoryById: PropTypes.func,
  dealCategoryData: PropTypes.object,
  updateDealCategory: PropTypes.func,
  loading: PropTypes.bool,
  uploadLoader: PropTypes.bool,
  addDealCategory: PropTypes.func,
  deleteDealsCategory: PropTypes.func,
  history: PropTypes.object,
};

export default AddEditDealCategoryContainer;
