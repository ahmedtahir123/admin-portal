import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Drawer, Button, Row, Col, Upload, Modal } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import _get from "lodash/get";
import { getBase64, toastMessage } from "../../utils/utils";
import GalleryGrid from "../GalleryGrid";
import "./GalleryManager.scss";

function GalleryManager({ visible, close, uploadImages, images }) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(new Map());

  const onSelect = useCallback(
    uid => {
      // for multi select
      const newSelected = new Map(selectedImage);
      if (selectedImage.has(uid)) {
        newSelected.delete(uid);
      } else {
        newSelected.set(uid, true);
      }
      setSelectedImage(newSelected);
    },
    [selectedImage, setSelectedImage],
  );

  useEffect(() => {
    setFileList(images);
  }, [images]);

  const removeSelected = () => {
    const allSelected = new Map(selectedImage);
    const newFileList = fileList.filter(d => {
      if (allSelected.has(d.uid)) {
        allSelected.delete(d.uid);
        return false;
      }
      return true;
    });
    setSelectedImage(new Map());
    setFileList(newFileList);
  };

  const footer = () => (
    <Row justify="space-evenly" align="middle">
      <Col span={6} xs={24} sm={6} lg={6}>
        Total Images: <b>{fileList && fileList.length}</b>
      </Col>
      <Col span={6} xs={24} sm={6} lg={6}>
        <Button type="danger" htmlType="submit" onClick={removeSelected}>
          Remove Selected: {selectedImage.size}
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
    setSelectedImage(new Map());
  };

  const handleSubmit = () => {
    uploadImages(fileList);
    close();
    setSelectedImage(new Map());
  };

  // const handlePreview = async file => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setPreviewImage(file.url || file.preview);
  //   setPreviewVisible(true);
  // };

  // const handleChange = ({ file, fileList: myList }) => {
  //   switch (file.status) {
  //     case "uploading": {
  //       setLoading(true);
  //       break;
  //     }
  //     case "done": {
  //       // Get this url from response in real world.
  //       getBase64(file.originFileObj, imageUrl => {
  //         setLoading(false);
  //         const newList = [...fileList];
  //         newList.unshift({ uid: file.uid, name: file.name, url: imageUrl });
  //         setFileList(newList);
  //       });
  //       break;
  //     }
  //     case "error": {
  //       toastMessage("error", file.error);
  //       break;
  //     }
  //     default: {
  //       toastMessage("error", "something went wrong at our end");
  //       break;
  //     }
  //   }
  // };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const uploadProps = {
    multiple: true,
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: file => {
      if (!file) {
        toastMessage("info", "This file is not supported");
        return false;
      }
      const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        toastMessage("info", "You can only upload JPG/PNG file!");
        return Promise.reject(new Error(true));
      }
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        toastMessage("info", "Image must smaller than 10MB!");
        return Promise.reject(new Error(true));
      }
      if (isJpgOrPng && isLt2M) {
        getBase64(file, url => {
          const fileObj = {
            type: "image-gallery",
            name: file.name,
            uid: file.uid,
            file,
            url,
          };
          setFileList(previousList => {
            const newList = [...previousList];
            if (newList.length >= 5) {
              toastMessage("info", "Image upload limit exceed, you can only upload 5 images");
              return newList;
            }
            newList.unshift(fileObj);
            return newList;
          });
        });
      }
      return false;
    },
    fileList,
  };

  return (
    <div>
      <Drawer
        title="Gallery Manager"
        width={720}
        onClose={close}
        visible={visible}
        bodyStyle={{ paddingBottom: "100px" }}
        footer={footer()}
        maskClosable={false}
        closable={false}
        keyboard={false}
      >
        <Row gutter={20}>
          <div className="clearfix">
            <Upload
              {...uploadProps}
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              // beforeUpload={beforeUpload}
              // onChange={handleChange}
            >
              {fileList.length >= 5 ? null : uploadButton}
              {/* {uploadButton} */}
            </Upload>
            <GalleryGrid images={fileList} onSelect={onSelect} selected={selectedImage} />
            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
              <img alt="example" className="gallery__img-preview" src={previewImage} />
            </Modal>
          </div>
        </Row>
      </Drawer>
    </div>
  );
}

GalleryManager.defaultProps = {
  images: [],
  visible: false,
};

GalleryManager.propTypes = {
  visible: PropTypes.bool,
  close: PropTypes.func,
  uploadImages: PropTypes.func,
  images: PropTypes.array,
};

export default GalleryManager;
