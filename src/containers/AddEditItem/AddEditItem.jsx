import React, { useState } from "react";
import "./AddEditItem.scss";
import { useParams } from "react-router-dom";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Popconfirm,
  Radio,
  Row,
  Select,
  Table,
  Upload,
  InputNumber,
} from "antd";
import PropTypes from "prop-types";
import PageTitle from "../../components/PageTitle/PageTitle";
import { VALIDATE_FORM_MESSAGES_TEMPLATE, ITEM_VARIATION_QUESTIONS_COL, CONFIRM_MESSAGE } from "../../utils/constants";
import { beforeUpload, getBase64, isJSON } from "../../utils/utils";
import listingPageCardImage from "../../images/listing-card.svg";
import { galleryImages } from "../../__mocks__/galleryImages";
import GalleryGrid from "../GalleryGrid";
import GalleryManager from "../GalleryManager";
import AddVariationQuestionProvider from "../../providers/addVariationQuestion.provider";

const { Option } = Select;

const AddEditItemContainer = () => {
  const { id } = useParams();
  const isEditView = !!id;
  const [form] = Form.useForm();
  const savedTags = ["Beef", "Chicken"];
  const promotionalTagOptions = [
    { label: "New", value: "new" },
    { label: "Hot", value: "hot" },
    { label: "Recommended", value: "recommended" },
    { label: "Awesome Deal", value: "awesomeDeal" },
    { label: "Must Try", value: "mustTry" },
    { label: "Mast Offer", value: "mastOffer" },
    { label: "BOGO Offer", value: "bogoOffer" },
  ];

  const [itemIcon, setItemIcon] = useState({
    type: "item-icon",
    name: "item-icon",
    uid: 0,
    file: null,
    url: listingPageCardImage,
  });
  const [itemBanner, setItemBanner] = useState({
    type: "item-icon",
    name: "item-icon",
    uid: 0,
    file: null,
    url: listingPageCardImage,
  });
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [_galleryImages, _setGalleryImages] = useState(galleryImages);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [questionsDrawerVisible, setQuestionsDrawerVisible] = useState(false);
  const [itemVarQuestions, setItemVarQuestions] = useState([]);

  const onFormFinish = values => {
    console.log("onFormFinish add item", values);
  };

  const handleImageChange = (file, type) => {
    getBase64(file, url => {
      const fileObj = {
        type: "item-icon",
        name: file.name,
        uid: file.uid,
        file,
        url,
      };
      if (type === "icon") setItemIcon(fileObj);
      else setItemBanner(fileObj);
    });
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

  const renderTagOptions = () => savedTags.map((tag, i) => <Option key={tag}>{tag}</Option>);

  const renderPromotionalTagOptions = () =>
    promotionalTagOptions.map((tag, i) => (
      <Col span={12} key={tag.value} className="mg-bottom-10">
        <Checkbox value={tag.value}>{tag.label}</Checkbox>
      </Col>
    ));

  const deleteItem = async () => {
    try {
      // history.goBack();
    } catch (error) {
      console.log("deleteItem error", error);
    }
  };

  return (
    <>
      {/* {loading ? (
        <div className="edit-form__spin">
          <Spin size="large" tip="Loading ..." />
        </div>
      ) : null} */}
      <PageTitle title={isEditView ? "Edit Item" : "Add Item"} />
      <Form
        form={form}
        className="AddItem"
        layout="vertical"
        name="addItemForm"
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={20}>
          <Col xs={24} sm={12}>
            {isEditView ? (
              <Form.Item label="Item Id" name="itemId">
                <Input readOnly placeholder="Item Id" />
              </Form.Item>
            ) : null}

            <Form.Item label="Brand Name" name="brandName">
              <Input readOnly placeholder="Brand Name" />
            </Form.Item>

            <Form.Item label="Created By Outlet" name="outlet">
              <Input readOnly placeholder="Outlet" />
            </Form.Item>

            <Divider />

            <Form.Item label="Name" name="itemName" rules={[{ required: true }]}>
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item label="Marketing Name" name="itemMarketingName">
              <Input placeholder="Marketing Name" />
            </Form.Item>

            {isEditView ? (
              <Form.Item label="SKU" name="itemSKU">
                <Input readOnly placeholder="SKU" />
              </Form.Item>
            ) : null}

            <Form.Item label="Description" name="itemDescription">
              <Input.TextArea maxLength="500" rows={5} placeholder="Description" />
            </Form.Item>

            <Row gutter={20}>
              <Col span={8}>
                <Form.Item label="Original Price" name="itemOriginalPrice" rules={[{ required: true, type: "number" }]}>
                  <InputNumber className="input-number-full-width" placeholder="Original Price" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Discount %" name="itemDiscountPercent" rules={[{ required: true, type: "number" }]}>
                  <InputNumber className="input-number-full-width" placeholder="Discount %" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Discount Price" name="itemDiscountPrice" rules={[{ required: true, type: "number" }]}>
                  <InputNumber className="input-number-full-width" placeholder="Discount Price" />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col xs={24} sm={12} lg={12} className="mg-top-40">
            <Form.Item className="text-left" name="enabled">
              <Radio.Group>
                <Radio.Button value>Enabled</Radio.Button>
                <Radio.Button value={false}>Disabled</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Tags" name="itemTags">
              <Select mode="tags" placeholder="Tags">
                {renderTagOptions()}
              </Select>
            </Form.Item>

            <Divider />

            <Form.Item>
              <Row gutter={20} align="middle">
                <Col sm={12} className="text-center">
                  <img src={itemIcon.url} alt="icon" width={100} />
                </Col>
                <Col sm={12} className="text-right">
                  <Upload
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={({ file }) => handleImageChange(file, "icon")}
                  >
                    <Button>Upload Item Icon</Button>
                  </Upload>
                </Col>
              </Row>
            </Form.Item>

            <Divider />

            <Form.Item label="">
              <div className="text-center">
                <img src={itemBanner.url} alt="banner" height={150} />
                <div className="addItem__uploadContainer">
                  <Upload
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={({ file }) => handleImageChange(file, "banner")}
                  >
                    <Button>Upload Banner Image</Button>
                  </Upload>
                </div>
              </div>
            </Form.Item>

            <Divider />

            <Form.Item label="">
              <div className="text-center">
                <GalleryGrid images={_galleryImages} gridOnly />
                <div className="addItem__uploadContainer">
                  <Button onClick={() => setGalleryVisible(true)}>Manage Banner Gallery</Button>
                </div>
              </div>
            </Form.Item>
          </Col>

          <Divider />
        </Row>

        <Row className="fields-row" gutter={20}>
          <Col xs={24} sm={12}>
            <Form.Item label="Variation Questions" name="itemVariationQuestions">
              <Table
                bordered
                dataSource={itemVarQuestions}
                columns={ITEM_VARIATION_QUESTIONS_COL}
                rowKey="code"
                pagination={false}
                size="small"
                scroll={{ y: 100 }}
              />
            </Form.Item>

            <Row gutter={10}>
              <Col xs={12}>
                <Button onClick={() => {}} disabled={!itemVarQuestions} block>
                  Delete Selected
                </Button>
              </Col>

              <Col xs={12}>
                <Button onClick={() => setQuestionsDrawerVisible(true)} block>
                  Add New Question
                </Button>
              </Col>
            </Row>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item name="itemPromotionalTags" label="Promotional Tags">
              <Checkbox.Group>
                <Row>{renderPromotionalTagOptions()}</Row>
              </Checkbox.Group>
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        {isEditView ? (
          <Row gutter={20}>
            {/* <Col xs={24} sm={12}>
              <div>
                Created By: <span>""</span>
              </div>
              <div>
                Created At: <span>""</span>
              </div>
              <div>
                Last Modify By: <span>""</span>
              </div>
              <div>
                Last Modify At: <span>""</span>
              </div>
            </Col> */}
            <Col xs={24} sm={12}>
              <Row gutter={24}>
                <Col xs={24} sm={8} className="text-right">
                  <Form.Item>
                    <Popconfirm
                      title={CONFIRM_MESSAGE.DELETE}
                      onConfirm={deleteItem}
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
                <Col xs={24} sm={8} className="text-right">
                  <Form.Item>
                    <Button type="info">Cancel</Button>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8} className="text-right">
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Save Changes
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <Row justify="end" type="flex">
            <Col>
              <Button className="action-btn mg-right-5" type="info">
                Cancel
              </Button>
              <Button className="action-btn" type="primary" htmlType="submit">
                Create
              </Button>
            </Col>
          </Row>
        )}

        <AddVariationQuestionProvider visible={questionsDrawerVisible} close={() => setQuestionsDrawerVisible(false)} />

        <GalleryManager
          images={_galleryImages}
          visible={galleryVisible}
          close={() => setGalleryVisible(false)}
          uploadImages={uploadImages}
        />
      </Form>
    </>
  );
};

export default AddEditItemContainer;
