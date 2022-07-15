import React from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";

const AppModal = props => {
  const bodyStyle = { maxHeight: props.maxHeight || "auto", overflowY: props.overFlowY || "none" };
  return (
    <Modal {...props} bodyStyle={bodyStyle}>
      {props.children}
    </Modal>
  );
};

AppModal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.any,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  centered: PropTypes.bool,
  footer: PropTypes.array,
  afterClose: PropTypes.func,
  children: PropTypes.any,
  maxHeight: PropTypes.string,
  overFlowY: PropTypes.string,
};

export default AppModal;
