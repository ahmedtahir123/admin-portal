import { Skeleton } from "antd";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addVoucherRedemption } from "../../store/actions/voucherRedemption.actions";

class CreateVoucherTicket extends Component {
  static propTypes = {
    addVoucherRedemption: PropTypes.func,
    history: PropTypes.object,
  };

  state = {};

  componentDidMount() {
    this.props.addVoucherRedemption(this.props.history);
  }

  render() {
    return <Skeleton active />;
  }
}

export default connect(
  state => ({}),
  dispatch => ({ addVoucherRedemption: d => dispatch(addVoucherRedemption(d)) }),
)(CreateVoucherTicket);
