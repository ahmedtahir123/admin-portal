import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import permissionsUtil from "../../utils/permissions.util";
import ROUTES from "../../routes/constant.route";
import ListView from "../../components/ListView/ListView";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomIcon from "../../components/CustomIcon/CustomIcon";

const CorporateCustomerManagement = props => {
  const {
    loading,
    enableDisableClient,
    deleteAllCorporateClient,
    getCorporateClientList,
    dataSource,
    corporateClient,
  } = props;
  const columns = [
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      render: (text, record) => <Link to={`${ROUTES.EDIT_CORPORATE_CUSTOMER.path}/${record.code}`}>{record.name}</Link>,
    },
    {
      title: "POC Name",
      dataIndex: "pointOfContactName",
      key: "pointOfContactName",
    },
    {
      title: "POC Contact",
      dataIndex: "pointOfContactNumber",
      key: "pointOfContactNumber",
    },
    {
      title: "POC Email",
      dataIndex: "pointOfContactEmailAddress",
      key: "pointOfContactEmailAddress",
    },
    {
      title: "Is Enabled",
      dataIndex: "enabled",
      key: "enabled",
      align: "center",
      render: enabled =>
        enabled ? <CustomIcon name="CheckCircleTwoTone" /> : <CustomIcon name="CloseCircleTwoTone" />,
    },
  ];
  const addButton = {
    text: "Add Corporate Client",
    route: ROUTES.ADD_CORPORATE_CUSTOMER.path,
  };

  const getList = async query => {
    await getCorporateClientList(query);
  };

  const deleteAll = async selectedRows => deleteAllCorporateClient(selectedRows);

  // useEffect(() => {
  //   getList();
  // }, []);

  const canAdd = permissionsUtil.checkAuth({
    category: "BookSubscriptionManagement",
    subCategory: "CorporateCustomer",
    action: "Add",
  });

  const canDelete = permissionsUtil.checkAuth({
    category: "BookSubscriptionManagement",
    subCategory: "CorporateCustomer",
    action: "Delete",
  });

  const canChangeStatus = permissionsUtil.checkAuth({
    category: "BookSubscriptionManagement",
    subCategory: "CorporateCustomer",
    action: "EditStatus",
  });

  const onEnable = {
    text: "Enable",
    handler: enableDisableClient,
  };
  const onDisable = {
    text: "Disable",
    handler: enableDisableClient,
  };

  return (
    <>
      <PageTitle title="All Corporate Customers" />
      <ListView
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        rowKey="code"
        addButton={addButton}
        deleteAllData={deleteAll}
        getList={getList}
        enableButton={onEnable}
        disableButton={onDisable}
        canChangeStatus={canChangeStatus}
        canAdd={canAdd}
        canDelete={canDelete}
        pagination={corporateClient}
      ></ListView>
    </>
  );
};

CorporateCustomerManagement.defaultProps = {
  dataSource: [],
};

CorporateCustomerManagement.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  corporateClient: PropTypes.object,
  enableDisableClient: PropTypes.func,
  deleteAllCorporateClient: PropTypes.func,
  getCorporateClientList: PropTypes.func,
};

export default CorporateCustomerManagement;
