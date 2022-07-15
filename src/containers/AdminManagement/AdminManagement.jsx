/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ROUTES from "../../routes/constant.route";
import ListView from "../../components/ListView/ListView";
import permissionsUtil from "../../utils/permissions.util";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomIcon from "../../components/CustomIcon/CustomIcon";

const columns = [
  {
    title: "Full Name",
    dataIndex: "fullName",
    key: "fullName",
    sorter: true,
    render: (text, record) => <Link to={`${ROUTES.EDIT_ADMIN_USER.path}/${record.userId}`}>{record.fullName}</Link>,
  },
  {
    title: "Email Address",
    dataIndex: "emailAddress",
    key: "emailAddress",
    sorter: (a, b) => a.emailAddress.length - b.emailAddress.length,
    sortDirections: ["descend", "ascend"],
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

function AdminManagement(props) {
  const { loading, enableDisableAdmin, pagination, getAdminUsers, deleteAdminUsers, list } = props;
  const getList = async query => {
    await getAdminUsers(query);
  };

  const canAddUser = permissionsUtil.checkAuth({
    category: "UserManagement",
    subCategory: "Admin",
    action: "Add",
  });
  const canDeleteUser = permissionsUtil.checkAuth({
    category: "UserManagement",
    subCategory: "Admin",
    action: "Delete",
  });
  const canChangeStatus = permissionsUtil.checkAuth({
    category: "UserManagement",
    subCategory: "Admin",
    action: "EditStatus",
  });

  const addButton = {
    text: "Add Admin",
    route: ROUTES.ADD_ADMIN_USER.path,
  };

  // useEffect(() => {
  //   if (pagination.pageable) {
  //     {
  //       const query = { size: pagination.pageable.pageSize };
  //       getList(query);
  //     }
  //   } else getList();
  // }, []);

  const onEnable = {
    handler: enableDisableAdmin,
    text: "Enable",
  };

  const onDisable = {
    handler: enableDisableAdmin,
    text: "Disable",
  };

  return (
    <>
      <PageTitle title="All Admins" />
      <ListView
        dataSource={list}
        columns={columns}
        loading={loading}
        rowKey="userId"
        addButton={addButton}
        pagination={pagination}
        deleteAllData={deleteAdminUsers}
        getList={getList}
        enableButton={onEnable}
        disableButton={onDisable}
        canChangeStatus={canChangeStatus}
        canAdd={canAddUser}
        canDelete={canDeleteUser}
      />
    </>
  );
}

AdminManagement.propTypes = {
  getAdminUsers: PropTypes.func,
  list: PropTypes.array,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
};

export default AdminManagement;
