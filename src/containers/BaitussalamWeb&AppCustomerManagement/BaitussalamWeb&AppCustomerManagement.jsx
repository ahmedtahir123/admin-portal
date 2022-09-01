/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "antd";
import ROUTES from "../../routes/constant.route";
import ListView from "../../components/ListView/ListView";
import permissionsUtil from "../../utils/permissions.util";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomIcon from "../../components/CustomIcon/CustomIcon";

const columns = [
  {
    title: "ID",
    dataIndex: "customerIdPk",
    key: "customerIdPk",
  },
  {
    title: "Customer Code",
    dataIndex: "customerCode",
    key: "customerCode",
  },
  {
    title: "Full Name",
    dataIndex: "fullName",
    key: "fullName",
    sorter: true,
  },
  {
    title: "Email Address",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "contact",
    key: "contact",
  },
  {
    title: "Created At",
    dataIndex: "dateCreated",
    key: "dateCreated",
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
    key: "createdBy",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sorter: true,
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    render: record => (
      <Row>
        <Col span={12} xs={24} sm={12} lg={12}>
          <Link to={`/landing-designer/${record.id}`}>
            <Button type="link">
              <CustomIcon name="EditOutlined" />
            </Button>
          </Link>
        </Col>
      </Row>
    ),
  },
];

function BaitussalamWebAndAppCustomerManagement(props) {
  const { loading, enableDisableAdmin, pagination, getCustomer, deleteAdminUsers, list } = props;
  const getList = async query => {
    await getCustomer(query);
  };

  const canAddUser = permissionsUtil.checkAuth({
    category: "UsersManagement",
    subCategory: "Customers",
    action: "Add",
  });
  const canDeleteUser = permissionsUtil.checkAuth({
    category: "UsersManagement",
    subCategory: "Customers",
    action: "Delete",
  });
  const canChangeStatus = permissionsUtil.checkAuth({
    category: "UsersManagement",
    subCategory: "Customers",
    action: "EditStatus",
  });

  const addButton = {
    text: "Add Customer",
    route: ROUTES.ADD_MUSALLI_PARTICIPANT_USER.path,
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
      <PageTitle title="All Customers" />
      <ListView
        dataSource={list}
        columns={columns}
        loading={loading}
        rowKey="customerIdPk"
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

BaitussalamWebAndAppCustomerManagement.propTypes = {
  getCustomer: PropTypes.func,
  list: PropTypes.array,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
};

export default BaitussalamWebAndAppCustomerManagement;
