import React from "react";
import PropTypes from "prop-types";
import { Divider } from "antd";

const PageTitle = ({ title }) => (
  <Divider orientation="left" className="form-divider first">
    <span className="page-title">{title}</span>
  </Divider>
);

PageTitle.propTypes = {
  title: PropTypes.string,
};

export default PageTitle;
