import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import _isEmpty from "lodash/isEmpty";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "antd";
import * as moment from "dayjs";
import ROUTES from "../../routes/constant.route";
import ListView from "../../components/ListView/ListView";
import permissionsUtil from "../../utils/permissions.util";
import PageTitle from "../../components/PageTitle/PageTitle";
import { STATUS, DATE_FORMAT_TIME } from "../../utils/constants";

const BookOrdersContainer = props => {
  const {
    loading,
    deleteBookOrders,
    paymentStatus,
    deliveryStatus,
    getBookOrdersList,
    bookSubscription,
    dataSource,
    enableDisableBookSubscription,
    authorize,
    pagination,
  } = props;
  const columns = [
    {
      title: "Order Number",
      dataIndex: "orderCode",
      key: "orderCode",
      render: (text, record) => (
        <Link to={`${ROUTES.EDIT_NEW_REQUEST.path}/${record.purchaseRequestId}`}>{record.orderCode}</Link>
      ),
      fixed: "left",
    },
    {
      title: "Consumer Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Request Time",
      dataIndex: "requestTime",
      key: "requestTime",
      render: value => moment(value).format(DATE_FORMAT_TIME),
    },
    {
      title: "Book Name",
      dataIndex: "bookTitle",
      key: "bookTitle",
    },
    {
      title: "Location Name",
      dataIndex: "bookLocation",
      key: "bookLocation",
    },
    {
      title: "Price",
      dataIndex: "bookPrice",
      key: "bookPrice",
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
    {
      title: "Payment Satus",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Payment transaction ID",
      dataIndex: "paymentTransactionId",
      key: "paymentTransactionId",
    },
    {
      title: "Delivery Status",
      dataIndex: "shippingStatus",
      key: "shippingStatus",
      render: text => text.replace(/_/g, ""),
    },
    {
      title: "Authorization Status",
      dataIndex: "authorizationStatus",
      key: "authorizationStatus",
    },
    {
      title: "Failure / Rejection reason",
      dataIndex: "rejectionReason",
      key: "rejectionReason",
    },
  ];
  const addButton = {
    text: "Add New Request",
    route: ROUTES.NEW_REQUEST.path,
  };

  const onAuthorize = {
    text: "Authorize",
    handler: authorize,
  };

  const deliveryStartButton = {
    text: "Delivery Start",
    handler: deliveryStatus,
  };

  const deliveryCompletedButton = {
    text: "Delivery Completed",
    handler: deliveryStatus,
  };

  const deliveryFailedButton = {
    text: "Delivery Failed",
    handler: deliveryStatus,
  };

  const paymentPaidButton = {
    text: "Payment Paid",
    handler: paymentStatus,
  };

  const deleteAll = selectedRow => deleteBookOrders(selectedRow);

  const getList = async query => {
    await getBookOrdersList(query);
  };

  const canAdd = permissionsUtil.checkAuth({
    category: "BookSubscriptionManagement",
    subCategory: "BookSubscription",
    action: "Add",
  });

  const canDelete = permissionsUtil.checkAuth({
    category: "BookSubscriptionManagement",
    subCategory: "BookSubscription",
    action: "Delete",
  });

  // const delivery = status => {
  //   deliveryStatus(status, selectedRows query);
  // };

  // const payment = status => {
  //   paymentStatus(status, selectedRows,  query);
  // };

  const canChangeStatus = permissionsUtil.checkAuth({
    category: "BookSubscriptionManagement",
    subCategory: "BookSubscription",
    action: "EditStatus",
  });

  // useEffect(() => {
  //   getList();
  // }, []);

  return (
    <Fragment>
      <PageTitle title="Book Order Management" />

      <ListView
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        rowKey="purchaseRequestId"
        addButton={addButton}
        listData={bookSubscription}
        deleteAllData={deleteAll}
        getList={getList}
        enableButton={onAuthorize}
        canChangeStatus={canChangeStatus}
        canAdd={canAdd}
        canDelete={canDelete}
        pagination={pagination}
        deliveryCompletedButton={deliveryCompletedButton}
        deliveryFailedButton={deliveryFailedButton}
        deliveryStartButton={deliveryStartButton}
        paymentPaidButton={paymentPaidButton}
        scroll={{ x: 1500 }}
      ></ListView>
    </Fragment>
  );
};

BookOrdersContainer.defaultProps = {
  dataSource: [],
};

BookOrdersContainer.propTypes = {
  pagination: PropTypes.object,
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  bookSubscription: PropTypes.object,
  deleteBookOrders: PropTypes.func,
  getBookOrdersList: PropTypes.func,
  enableDisableBookSubscription: PropTypes.func,
  paymentStatus: PropTypes.func,
  deliveryStatus: PropTypes.func,
  authorize: PropTypes.func,
};

export default BookOrdersContainer;
