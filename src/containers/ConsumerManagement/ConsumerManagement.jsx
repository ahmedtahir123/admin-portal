import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Divider } from "antd";
import ROUTES from "../../routes/constant.route";
import { STATUS } from "../../utils/constants";
import ListView from "../../components/ListView/ListView";
import permissionsUtil from "../../utils/permissions.util";
import { TableConfig } from "../../utils/utils";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomIcon from "../../components/CustomIcon/CustomIcon";

const ConsumerManagement = props => {
  const { getAllConsumers, deleteAllConsumers, enableDisableConsumers, pagination, list, loading } = props;

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: true,
      render: (text, record) => (
        <Link to={`${ROUTES.EDIT_CONSUMER_USER.path}/${record.userId}`}>{record.fullName}</Link>
      ),
    },
    {
      title: "Location",
      dataIndex: "signUpLocation",
      key: "signUpLocation",
      render: (text, record) => <p>{record.signUpLocation && record.signUpLocation.locationName}</p>,
    },
    {
      title: "Email Address",
      dataIndex: "emailAddress",
      key: "emailAddress",
      sorter: true,
    },
    {
      title: "Contact",
      dataIndex: "cellPhoneNumber",
      key: "cellPhoneNumber",
    },
    {
      title: "Status",
      dataIndex: "userMetaData",
      key: "status",
      sorter: true,
      render: d => d.status,
    },
    {
      title: "Is Enabled",
      dataIndex: "userMetaData",
      key: "isEnabled",
      align: "center",
      render: d => (d.isEnabled ? <CustomIcon name="CheckCircleTwoTone" /> : <CustomIcon name="CloseCircleTwoTone" />),
    },
  ];

  // useEffect(() => {
  //   const query = TableConfig("name");
  //   getAllConsumers(query);
  // }, []);

  const addButton = {
    text: "Add Consumer",
    route: ROUTES.ADD_CONSUMER_USER.path,
  };

  const canAdd = permissionsUtil.checkAuth({
    category: "UserManagement",
    subCategory: "Consumer",
    action: "Add",
  });

  const canDelete = permissionsUtil.checkAuth({
    category: "UserManagement",
    subCategory: "Consumer",
    action: "Delete",
  });

  const canChangeStatus = permissionsUtil.checkAuth({
    category: "UserManagement",
    subCategory: "Consumer",
    action: "EditStatus",
  });

  const onEnable = {
    text: "Enable",
    handler: enableDisableConsumers,
  };

  const onDisable = {
    text: "Disable",
    handler: enableDisableConsumers,
  };

  const getList = async query => {
    await getAllConsumers(query);
  };

  return (
    <>
      <PageTitle title="All Consumers" />
      <ListView
        dataSource={list}
        columns={columns}
        loading={loading}
        rowKey="userId"
        addButton={addButton}
        pagination={pagination}
        deleteAllData={deleteAllConsumers}
        getList={getList}
        enableButton={onEnable}
        disableButton={onDisable}
        canChangeStatus={canChangeStatus}
        canDelete={canDelete}
      />
    </>
  );
};

ConsumerManagement.defaultProps = {
  list: [],
};

ConsumerManagement.propTypes = {
  getAllConsumers: PropTypes.func,
  deleteAllConsumers: PropTypes.func,
  enableDisableConsumers: PropTypes.func,
  pagination: PropTypes.object,
  list: PropTypes.array,
  loading: PropTypes.bool,
};

export default ConsumerManagement;
