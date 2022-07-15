/* eslint-disable jsx-a11y/anchor-is-valid */
import * as moment from "dayjs";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import ListView from "../../components/ListView/ListView";
import PageTitle from "../../components/PageTitle/PageTitle";
import ROUTES from "../../routes/constant.route";
import "./VoucherRedemptionManagement.scss";
import { DATE_FORMAT_TIME, STATUS } from "../../utils/constants";

const VoucherRedemptionManagement = props => {
  const { loading, getVoucherRedemptionsList, list, pagination, addVoucherRedemption, history } = props;
  const redeemStatus = {
    [STATUS.REDEEMED_WITH_CODE]: "Redeemed With Code",
    [STATUS.REDEEMED_WITH_QR]: "Redeemed With QR",
    INPROGRESS: "In Progress",
    COMPLETED: "Completed",
    WITHDRAWED: "With Drawed",
    REJECTED: "Rejected",
    VERIFIED: "Verified",
  };

  const columns = [
    {
      title: "Ticket #",
      dataIndex: "voucherRedeemedTicketId",
      key: "voucherRedeemedTicketId",
      width: 50,
      render: (text, record) => (
        <Link to={`${ROUTES.EDIT_VOUCHER_REDEMPTION.path}/${record.voucherRedeemedTicketId}`}>
          {record.voucherRedeemedTicketId}
        </Link>
      ),
    },
    {
      title: "Voucher #",
      dataIndex: "voucherNumber",
      key: "voucherNumber",
      width: 50,
    },

    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 50,
      sorter: true,
      render: record => (record ? moment(record).format(DATE_FORMAT_TIME) : "N/A"),
    },
    {
      title: "Updated By",
      dataIndex: "updatedBy",
      key: "updatedBy",
      width: 50,
    },
    {
      title: "Status",
      dataIndex: "redeemedTicketStatus",
      key: "redeemedTicketStatus",
      width: 25,
      render: record => redeemStatus[record],
    },
    {
      title: "Redeemed At",
      dataIndex: "voucherRedeemedDateTime",
      key: "voucherRedeemedDateTime",
      width: 50,
      sorter: true,
      render: record => (record ? moment(record).format(DATE_FORMAT_TIME) : "N/A"),
    },
    {
      title: "Type",
      dataIndex: "redemptionType",
      key: "redemptionType",
      width: 25,
      render: record => redeemStatus[record],
    },
    {
      title: "Rejection Reason",
      dataIndex: "reason",
      key: "reason",
      width: 150,
    },
  ];
  const customButton = {
    text: "Create Ticket",
    handler: () => addVoucherRedemption(history),
    type: "primary",
    loading,
  };

  const getList = async query => {
    await getVoucherRedemptionsList(query);
  };

  return (
    <>
      <PageTitle title="All Voucher Redemptions" />
      <ListView
        dataSource={list}
        columns={columns}
        loading={loading}
        rowKey="voucherRedeemedTicketId"
        customButton={customButton}
        getList={getList}
        scroll={{ x: 1500 }}
        pagination={pagination}
      ></ListView>
    </>
  );
};

VoucherRedemptionManagement.defaultProps = {
  list: [],
};

VoucherRedemptionManagement.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool,
  getVoucherRedemptionsList: PropTypes.func,
  pagination: PropTypes.object,
  addVoucherRedemption: PropTypes.func,
  history: PropTypes.object,
};

export default VoucherRedemptionManagement;
