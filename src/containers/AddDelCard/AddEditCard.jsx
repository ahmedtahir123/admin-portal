import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import _isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import _get from "lodash/get";
import { Button, Row, Col, Input, Form, Select, Upload, Drawer } from "antd";
import defaultLogo from "../../images/listing-card.svg";
import { beforeUpload, getBase64 } from "../../utils/utils";
import { CardTypes } from "../../utils/constants";
const { Option } = Select;
const labels = {
  [CardTypes.BRAND.name]: "Brand Code",
  [CardTypes.OUTLET.name]: "Outlet Code",
  [CardTypes.CATEGORY.name]: "Category Code",
  [CardTypes.INTERNAL_WEBPAGE.name]: "Webpage URL",
  [CardTypes.EXTERNAL_WEBPAGE.name]: "Webpage URL",
};
function AddEditCard({ onClose, onSave, data, visible, swimLaneId, isUpdate }) {
  const [form] = Form.useForm();
  const [codeLabel, setCodeLabel] = useState(labels[CardTypes.BRAND.name]);
  const [image, setImage] = useState({
    type: "lane-card-images",
    name: "card-image",
    uid: 0,
    file: null,
    url: defaultLogo,
  });
  const [swimlaneId, setSwimlaneId] = useState(null);
  const footer = () => (
    <Row className="fields-row" gutter={20} type="flex" justify="space-around">
      <Col span={8} xs={24} sm={8} lg={8} onClick={handleCancel}>
        <Button type="secondary" htmlType="submit">
          Cancel
        </Button>
      </Col>
      <Col span={8} xs={24} sm={8} lg={8}>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Save
        </Button>
      </Col>
    </Row>
  );
  const handleCancel = () => {
    form.resetFields();
    setImage({
      type: "lane-card-images",
      name: "card-image",
      uid: 0,
      file: null,
      url: defaultLogo,
    });
    // setSwimlaneId(null);
    onClose();
    setSwimlaneId(null);
  };
  const handleSubmit = () => {
    form.validateFields().then(formValues => {
      let imageUrl = null;
      if (image.file) imageUrl = { ...image, type: `lane-card-images-${swimLaneId}` };
      else if (image.url === defaultLogo) imageUrl = null;
      else imageUrl = image.url;
      const values = {
        ...formValues,
        imageUrl,
      };
      onSave(values);
      handleCancel();
    });
  };
  useEffect(() => {
    if (!_isEmpty(data)) {
      setFormValues();
      setSwimlaneId(swimLaneId);
      if (_get(data, "cardType")) setCodeLabel(labels[data.cardType]);
    }
  }, [data]);
  // useEffect(()=>{
  //   setSwimlaneId(swimLaneId);
  // },[swimLaneId])
  const setFormValues = () => {
    form.setFieldsValue({
      redirectUrl: data.redirectUrl,
      minorText1: data.minorText1,
      minorText2: data.minorText2,
      minorText3: data.minorText3,
      cardType: data.cardType,
      title: data.title,
    });
    if (data.imageUrl) {
      setImage({ ...image, file: data.imageUrl.file || null, url: data.imageUrl.url || data.imageUrl });
    }
  };
  const handleImageChange = ({ fileList, file }) => {
    getBase64(file, url => {
      const fileObj = {
        type: "lane-card-images",
        name: file.name,
        uid: file.uid,
        file,
        url,
      };
      setImage(fileObj);
    });
  };
  const onCardTypeChange = value => setCodeLabel(labels[value]);

  return (
    <Drawer
      title={isUpdate ? "Update Card" : "Add Card"}
      width={450}
      maskClosable={false}
      closable={false}
      keyboard={false}
      visible={visible}
      footer={footer()}
    >
      <Form id="cards" form={form} layout="vertical">
        <Form.Item>
          <div className="text-center">
            <div className="bg-gray">
              <img src={image.url} alt="avatar" width={250} />
              <div className="upload-container">
                <Upload showUploadList={false} beforeUpload={beforeUpload} onChange={handleImageChange}>
                  <Button>Change Image</Button>
                </Upload>
              </div>
            </div>
          </div>
        </Form.Item>
        <Form.Item label="Title" name="title">
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item rules={[{ max: 30 }]} label="Minor Text 1" name="minorText1">
          <Input placeholder="Minor Text 1" />
        </Form.Item>
        <Form.Item rules={[{ max: 30 }]} label="Minor Text 2" name="minorText2">
          <Input placeholder="Minor Text 2" />
        </Form.Item>
        <Form.Item rules={[{ max: 30 }]} label="Minor Text 3" name="minorText3">
          <Input placeholder="Minor Text 3" />
        </Form.Item>
        <Form.Item label="Select Card Type" name="cardType" rules={[{ required: true }]}>
          <Select placeholder="Select Card Type" onChange={onCardTypeChange}>
            {Object.keys(CardTypes).map(item => (
              <Option value={CardTypes[item].name}>{CardTypes[item].value}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={codeLabel} name="redirectUrl">
          <Input placeholder={codeLabel} />
        </Form.Item>
      </Form>
    </Drawer>
  );
}

AddEditCard.defaultProps = {
  visible: false,
};

AddEditCard.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  data: PropTypes.object,
  swimLaneId: PropTypes.string,
  isUpdate: PropTypes.bool,
};

export default AddEditCard;
