import React, { Component } from "react";
import PropTypes from "prop-types";
import ErrorState from "../components/ErrorState/ErrorState";

class ErrorBoundary extends Component {
  state = { error: null, errorInfo: null };

  static propTypes = {
    children: PropTypes.object,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { error, errorInfo } = this.state;
    const { children } = this.props;
    if (errorInfo) return <ErrorState dataC="error-state-container" errorHeader={error} errorInfo={errorInfo} />;
    return children;
  }
}

export default ErrorBoundary;
