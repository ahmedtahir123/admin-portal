/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as moment from "dayjs";

import ROUTES from "../../routes/constant.route";
import { DATE_FORMAT_TIME } from "../../utils/constants";
import "./DealManagement.scss";
import ListView from "../../components/ListView/ListView";
import permissionsUtil from "../../utils/permissions.util";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomIcon from "../../components/CustomIcon/CustomIcon";

const DealManagement = props => {
  const { loading, enableDisableDeal, deleteAllDeals, getDealsList, list, pagination } = props;

  const columns = [
    // {
    //   title: "Code",
    //   dataIndex: "code",
    //   key: "code",
    //   render: (text, record) => <Link to={`${ROUTES.EDIT_DEAL.path}/${record.code}`}>{record.code}</Link>,
    // },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: true,
      render: (text, record) => <Link to={`${ROUTES.EDIT_DEAL.path}/${record.code}`}>{record.title}</Link>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "dealCatName",
      sorter: true,
      render: deal => (deal ? deal.name : ""),
    },
    {
      title: "Brand",
      dataIndex: ["brand", "name"],
      key: "BrandName",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: true,
    },
    {
      title: "Expiry",
      dataIndex: "endDate",
      key: "endDate",
      width: 80,
      render: date => moment(date).format(DATE_FORMAT_TIME),
    },
    {
      title: "Is Enabled",
      dataIndex: "enabled",
      key: "enabled",
      align: "center",
      render: d => (d ? <CustomIcon name="CheckCircleTwoTone" /> : <CustomIcon name="CloseCircleTwoTone" />),
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    // },
  ];

  const addButton = {
    text: "Add Deal",
    route: ROUTES.ADD_DEAL.path,
  };

  const canAdd = permissionsUtil.checkAuth({
    category: "VoucherManagement",
    subCategory: "Voucher",
    action: "Add",
  });

  const canDelete = permissionsUtil.checkAuth({
    category: "VoucherManagement",
    subCategory: "Voucher",
    action: "Delete",
  });

  const canChangeStatus = permissionsUtil.checkAuth({
    category: "VoucherManagement",
    subCategory: "Voucher",
    action: "EditStatus",
  });

  const onEnable = {
    text: "Enable",
    handler: enableDisableDeal,
  };

  const onDisable = {
    text: "Disable",
    handler: enableDisableDeal,
  };

  const getList = async query => {
    await getDealsList(query);
  };

  // useEffect(() => {
  //   getList();
  // }, []);
  return (
    <>
      <PageTitle title="All DEALS" />

      <ListView
        dataSource={list}
        columns={columns}
        loading={loading}
        rowKey="code"
        addButton={addButton}
        deleteAllData={deleteAllDeals}
        getList={getList}
        enableButton={onEnable}
        disableButton={onDisable}
        canChangeStatus={canChangeStatus}
        canAdd={canAdd}
        canDelete={canDelete}
        pagination={pagination}
      ></ListView>
    </>
  );
};

DealManagement.defaultProps = {
  list: [],
};

DealManagement.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool,
  enableDisableDeal: PropTypes.func,
  deleteAllDeals: PropTypes.func,
  getDealsList: PropTypes.func,
  pagination: PropTypes.object,
};

export default DealManagement;
