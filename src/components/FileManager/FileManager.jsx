import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Drawer, Button, Row, Col, Upload, Modal } from "antd";
import _get from "lodash/get";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { getBase64, toastMessage, isValidDocumentType } from "../../utils/utils";
import "./FileManager.scss";
import GalleryGrid from "../../containers/GalleryGrid";

function FileManager({ visible, close, upload, files }) {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(new Map());
  const onSelect = useCallback(
    uid => {
      // for multi select
      const newSelected = new Map(selectedFile);
      if (selectedFile.has(uid)) {
        newSelected.delete(uid);
      } else {
        newSelected.set(uid, true);
      }
      console.log(" newSelected images id", newSelected);
      setSelectedFile(newSelected);
    },
    [selectedFile, setSelectedFile],
  );
  useEffect(() => {
    setFileList(files);
  }, [files]);

  const removeSelected = () => {
    const allSelected = new Map(selectedFile);
    const newFileList = fileList.filter(d => {
      if (allSelected.has(d.uid)) {
        allSelected.delete(d.uid);
        return false;
      }
      return true;
    });
    console.log("newFileList ===>", newFileList);
    setSelectedFile(new Map());
    setFileList(newFileList);
  };

  const downloadFile = url => {
    window.open(url, "_blank");
  };

  const footer = () => (
    <Row justify="space-evenly" align="middle">
      <Col span={6} xs={24} sm={6} lg={6}>
        Total: <b>{fileList && fileList.length}</b>
      </Col>
      <Col span={6} xs={24} sm={6} lg={6}>
        <Button type="danger" onClick={removeSelected}>
          Remove Selected: {selectedFile.size}
        </Button>
      </Col>
      <Col span={6} xs={24} sm={6} lg={6} onClick={onCancel}>
        <Button type="secondary">Cancel</Button>
      </Col>
      <Col span={6} xs={24} sm={6} lg={6}>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Save
        </Button>
      </Col>
    </Row>
  );

  const handleSubmit = () => {
    console.log({ fileList });
    upload(fileList);
    close();
    setSelectedFile(new Map());
  };

  const onCancel = () => {
    close();
    setSelectedFile(new Map());
  };

  // const handleChange = ({ file, fileList: myList }) => {
  //   switch (file.status) {
  //     case "uploading": {
  //       setLoading(true);
  //       break;
  //     }
  //     case "done": {
  //       // Get this url from response in real world.
  //       getBase64(file.originFileObj, fileURL => {
  //         setLoading(false);
  //         const newList = [...fileList];
  //         newList.unshift({ uid: file.uid, name: file.name, url: fileURL });
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
  //   console.log("files from images => ", fileList);
  // };

  // const beforeUpload = file => {
  //   if (!file) {
  //     toastMessage("info", "This file is not supported");
  //     return false;
  //   }
  //   const isValidFormat = isValidDocumentType(file.type);
  //   if (!isValidFormat) {
  //     toastMessage("info", "This file is not supported");
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     toastMessage("info", "File must smaller than 2MB!");
  //   }
  //   return isValidFormat && isLt2M;
  // };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const uploadProps = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      console.log("after remove", newFileList);
    },
    beforeUpload: file => {
      if (!file) {
        toastMessage("info", "This file is not supported");
        return false;
      }
      const isValidFormat = isValidDocumentType(file.type);
      if (!isValidFormat) {
        toastMessage("info", "This file is not supported");
        return Promise.reject(new Error(true));
      }
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        toastMessage("info", "File must smaller than 10MB!");
        return Promise.reject(new Error(true));
      }

      if (isValidFormat && isLt2M) {
        getBase64(file, url => {
          const fileObj = {
            type: "files-gallery",
            name: file.name,
            uid: file.uid,
            file,
            url,
          };
          setFileList(previousList => {
            const newList = [...previousList];
            newList.unshift(fileObj);
            console.log("before upload=>", fileList);
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
        title="File Manager"
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
          <div className="w-full">
            <Upload
              {...uploadProps}
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              // beforeUpload={beforeUpload}
              // onChange={handleChange}
              // multiple
            >
              {fileList.length >= 5 ? null : uploadButton}
              {/* {uploadButton} */}
            </Upload>
            <GalleryGrid
              images={fileList}
              onSelect={onSelect}
              selected={selectedFile}
              type="file"
              downloadFile={downloadFile}
              isDownloadAble
            />
          </div>
        </Row>
      </Drawer>
    </div>
  );
}

FileManager.defaultProps = {
  files: [],
  visible: false,
};

FileManager.propTypes = {
  visible: PropTypes.bool,
  close: PropTypes.func,
  upload: PropTypes.func,
  files: PropTypes.array,
};

export default FileManager;
