import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Drawer, Button, Row, Col, Upload, Modal, Input, Form, Checkbox, Divider, Select, Table } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { getBase64, toastMessage } from "../../utils/utils";
import GalleryGrid from "../GalleryGrid";
import AddEditCard from "../AddDelCard/AddEditCard";

function CarouselManager({ visible, close, onSave, images, lppInfo, type, loading }) {
  const [fileList, setFileList] = useState([]);
  const [selectedImage, setSelectedImage] = useState({});
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [childDrawerVisible, setChildDrawerVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [form] = Form.useForm();
  const options = [
    { label: "Swimlane", value: "SWIMLANE" },
    { label: "Carousel", value: "CAROUSEL" },
  ];

  const onSelect = useCallback(
    item => {
      if (item.index === selectedCardIndex) {
        setSelectedImage({});
        setSelectedCardIndex(null);
      } else {
        setSelectedImage(item.item);
        setSelectedCardIndex(item.index);
      }
    },
    [selectedImage, setSelectedImage],
  );

  useEffect(() => {
    if (lppInfo && images && type) {
      form.setFieldsValue({
        ...lppInfo,
        type,
      });
      setFileList(images);
    }
  }, [lppInfo, images, type]);

  const footer = () => (
    <Row justify="space-evenly" align="middle">
      <Col span={6} xs={24} sm={6} lg={6}>
        Total Images: <b>{fileList && fileList.length}</b>
      </Col>
      <Col span={6} xs={24} sm={6} lg={6}>
        <Button disabled={selectedCardIndex === null} type="danger" htmlType="submit" onClick={onRemove}>
          Remove Selected
        </Button>
      </Col>
      <Col span={6} xs={24} sm={6} lg={6} onClick={handleCancel}>
        <Button type="secondary" htmlType="submit">
          Cancel
        </Button>
      </Col>
      <Col span={6} xs={24} sm={6} lg={6}>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Save
        </Button>
      </Col>
    </Row>
  );

  const handleCancel = () => {
    close();
    setSelectedImage({});
    setSelectedCard({});
  };

  const handleSubmit = () => {
    onSave(fileList);
    close();
    setSelectedImage({});
    setSelectedCard({});
  };

  const _onChildClose = () => {
    setSelectedImage({});
    setSelectedCardIndex(null);
    setChildDrawerVisible(false);
  };
  const _onChildSave = newCard => {
    const files = [...fileList];
    if (selectedCardIndex !== null) files[selectedCardIndex] = newCard;
    else files.push(newCard);
    setFileList(files);
    _onChildClose();
  };
  const openChildDrawer = addMode => {
    setSelectedCard(addMode ? null : selectedImage);
    setChildDrawerVisible(true);
  };
  const onRemove = () => {
    if (selectedCardIndex !== null) {
      const files = [...fileList];
      files.splice(selectedCardIndex, 1);
      setSelectedImage({});
      setSelectedCardIndex(null);
      setFileList(files);
    }
  };

  return (
    <Drawer
      title="Manage Carousel"
      width={720}
      onClose={close}
      visible={visible}
      bodyStyle={{ paddingBottom: "100px" }}
      footer={footer()}
      maskClosable={false}
      closable={false}
      keyboard={false}
    >
      <Form id="designer" form={form} layout="vertical">
        <Form.Item required label="LPP ID" name="lppId">
          <Input placeholder="LPP ID" disabled />
        </Form.Item>
        <Form.Item required label="LPP Name" name="lppName">
          <Input placeholder="LPP Nameame" disabled />
        </Form.Item>
        <Form.Item label="Type" name="type">
          <Checkbox.Group options={options} disabled />
        </Form.Item>
      </Form>
      <Row className="fields-row mg-bottom-20" gutter={20} type="flex" justify="end">
        <Col className="text-right" span={6} xs={24} sm={6} lg={6} onClick={() => openChildDrawer(true)}>
          <Button type="primary">Add New</Button>
        </Col>
        <Col className="text-right" span={6} xs={24} sm={6} lg={6}>
          <Button disabled={selectedCardIndex === null} type="primary" onClick={() => openChildDrawer()}>
            Edit
          </Button>
        </Col>
      </Row>
      <Row gutter={20}>
        <div className="clearfix">
          <GalleryGrid images={fileList} onSelect={onSelect} selected={selectedImage} forCarousel />
        </div>
      </Row>
      <AddEditCard
        visible={childDrawerVisible}
        data={selectedCard}
        onSave={_onChildSave}
        onClose={_onChildClose}
        swimLaneId="carousel"
        isUpdate={!!selectedCard}
      />
    </Drawer>
  );
}

CarouselManager.defaultProps = {
  images: [],
  visible: false,
};

CarouselManager.propTypes = {
  visible: PropTypes.bool,
  close: PropTypes.func,
  images: PropTypes.array,
  onSave: PropTypes.func,
  lppInfo: PropTypes.object,
  type: PropTypes.string,
  loading: PropTypes.bool,
};

export default CarouselManager;
