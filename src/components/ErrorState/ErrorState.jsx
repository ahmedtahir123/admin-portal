/* eslint-disable react/prefer-stateless-function */
import PropTypes from "prop-types";
import React, { Component } from "react";
import "./ErrorState.scss";

class ErrorState extends Component {
  static propTypes = {
    dataC: PropTypes.string,
    errorHeader: PropTypes.string,
    errorInfo: PropTypes.string,
  };

  static defaultProps = {
    dataC: "",
    errorHeader: "Error Header",
    errorInfo: "Error State Info",
  };

  render() {
    const { dataC, errorHeader, errorInfo } = this.props;
    return (
      <div className="error-state" data-c={dataC}>
        <div className="error-state__body">
          <h1>{errorHeader && errorHeader.toString()}</h1>
          <p>{errorInfo.componentStack}</p>
        </div>
      </div>
    );
  }
}

export default ErrorState;
