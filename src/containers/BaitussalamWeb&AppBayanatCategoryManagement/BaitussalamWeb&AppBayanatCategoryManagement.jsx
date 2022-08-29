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
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: true,
    fixed: "left",
    // render: (text, record) => <Link to={`${ROUTES.EDIT_ADMIN_USER.path}/${record.userId}`}>{record.fullName}</Link>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Parent Id",
    dataIndex: "parentCategoryId",
    key: "parentCategoryId",
  },
  {
    title: "Order No",
    dataIndex: "orderNo",
    key: "orderNo",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sorter: true,
    render: d => d.status,
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
    key: "createdBy",
  },
  {
    title: "Updated At",
    dataIndex: "lastUpdatedAt",
    key: "lastUpdatedAt",
  },
  {
    title: "Updated By",
    dataIndex: "updatedBy",
    key: "updatedBy",
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
              <CustomIcon name="UserOutlined" />
            </Button>
          </Link>
        </Col>
      </Row>
    ),
  },
];

function BaitussalamWebAndAppBayanatCategoryManagement(props) {
  const { loading, enableDisableAdmin, pagination, getBayanatCategory, deleteAdminUsers, list } = props;
  const getList = async query => {
    await getBayanatCategory(query);
  };

  const canAddUser = permissionsUtil.checkAuth({
    category: "ContentManagement",
    subCategory: "Bayanat_Category",
    action: "Add",
  });
  const canDeleteUser = permissionsUtil.checkAuth({
    category: "ContentManagement",
    subCategory: "Bayanat_Category",
    action: "Delete",
  });
  const canChangeStatus = permissionsUtil.checkAuth({
    category: "ContentManagement",
    subCategory: "Bayanat_Category",
    action: "EditStatus",
  });

  const addButton = {
    text: "Add Bayanaat Category",
    route: ROUTES.ADD_BAITUSSALAM_WEB_AND_APP_BAYANAT_CATEGORY.path,
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
      <PageTitle title="All Bayanaaat Category" />
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
        scroll={{ x: 2000 }}
      />
    </>
  );
}

BaitussalamWebAndAppBayanatCategoryManagement.propTypes = {
  getBayanatCategory: PropTypes.func,
  list: PropTypes.array,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
};

export default BaitussalamWebAndAppBayanatCategoryManagement;
