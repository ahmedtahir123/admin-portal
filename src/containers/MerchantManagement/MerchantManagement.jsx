import React, { useEffect } from "react";
import { Divider } from "antd";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ROUTES from "../../routes/constant.route";
import ListView from "../../components/ListView/ListView";
import permissionsUtil from "../../utils/permissions.util";
import { STATUS } from "../../utils/constants";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomIcon from "../../components/CustomIcon/CustomIcon";

function MerchantManagement(props) {
  const { loading, merchant, enableDisableMerchant, getAllMerchantUsers, list, deleteAllUsers, pagination } = props;
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",

      render: (text, record) => (
        <Link to={`${ROUTES.EDIT_MERCHANT_USER.path}/${record.userId}`}>{record.fullName}</Link>
      ),
    },

    {
      title: "Email Address",
      dataIndex: "emailAddress",
      key: "emailAddress",
    },
    {
      title: "Cell Number",
      dataIndex: "cellPhoneNumber",
      key: "cellPhoneNumber",
    },
    {
      title: "Merchant Type",
      dataIndex: "userMetaData",
      key: "userMetaData",

      render: record => record.userType,
    },
    {
      title: "Verification Status",
      dataIndex: "userMetaData",
      key: "userMetaData",
      align: "center",
      render: record =>
        record.status === STATUS.VERIFIED ? (
          <CustomIcon name="CheckCircleTwoTone" />
        ) : (
          <CustomIcon name="CloseCircleTwoTone" />
        ),
    },
    {
      title: "Is Enabled",
      dataIndex: "userMetaData",
      key: "userMetaData",
      align: "center",
      render: record =>
        record.isEnabled ? <CustomIcon name="CheckCircleTwoTone" /> : <CustomIcon name="CloseCircleTwoTone" />,
    },
  ];

  // useEffect(() => {
  //   getList();
  // }, []);

  const addButton = {
    text: "Add Merchant",
    route: ROUTES.ADD_MERCHANT_USER.path,
  };

  const canAdd = permissionsUtil.checkAuth({
    category: "UserManagement",
    subCategory: "Merchant",
    action: "Add",
  });

  const canDelete = permissionsUtil.checkAuth({
    category: "UserManagement",
    subCategory: "Merchant",
    action: "Delete",
  });

  const canChangeStatus = permissionsUtil.checkAuth({
    category: "UserManagement",
    subCategory: "Merchant",
    action: "EditStatus",
  });

  const onEnable = {
    text: "Enable",
    handler: enableDisableMerchant,
  };

  const onDisable = {
    text: "Disable",
    handler: enableDisableMerchant,
  };

  const getList = async query => {
    await getAllMerchantUsers(query);
  };

  return (
    <>
      {/* <Divider orientation="left" className="form-divider first">
        All Merchants
      </Divider> */}
      <PageTitle title="All Merchants" />
      <ListView
        dataSource={list}
        columns={columns}
        loading={loading}
        rowKey="userId"
        addButton={addButton}
        listData={merchant}
        deleteAllData={deleteAllUsers}
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
}

MerchantManagement.propTypes = {
  getAllMerchantUsers: PropTypes.func,
  enableDisableMerchant: PropTypes.func,
  list: PropTypes.array,
  deleteAllUsers: PropTypes.func,
  loading: PropTypes.bool,
  merchant: PropTypes.object,
  pagination: PropTypes.object,
};

export default MerchantManagement;
