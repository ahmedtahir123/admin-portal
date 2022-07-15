import React from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import "./AppFooter.scss";
const { Footer } = Layout;

const AppFooter = ({ isFixedLayout }) => (
  <Footer className={`app-footer text-center ${isFixedLayout ? " app-footer__fixed" : ""}`}>
    BOGO © 2020 - All Rights Reserved
  </Footer>
);

AppFooter.propTypes = {
  isFixedLayout: PropTypes.bool,
};

export default AppFooter;
