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
    // render: (text, record) => <Link to={`${ROUTES.EDIT_ADMIN_USER.path}/${record.userId}`}>{record.fullName}</Link>,
  },
  {
    title: "Slug",
    dataIndex: "Slug",
    key: "Slug",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Parent Category",
    dataIndex: "parentCategoryId",
    key: "parentCategoryId",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    sorter: true,
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

function BaitussalamWebAndAppPublicationCategoryManagement(props) {
  const { loading, enableDisableAdmin, pagination, getPublicationCategory, deleteAdminUsers, list } = props;
  const getList = async query => {
    await getPublicationCategory(query);
  };

  const canAddUser = permissionsUtil.checkAuth({
    category: "ContentManagement",
    subCategory: "Publication_Category",
    action: "Add",
  });
  const canDeleteUser = permissionsUtil.checkAuth({
    category: "ContentManagement",
    subCategory: "Publication_Category",
    action: "Delete",
  });
  const canChangeStatus = permissionsUtil.checkAuth({
    category: "ContentManagement",
    subCategory: "Publication_Category",
    action: "EditStatus",
  });

  const addButton = {
    text: "Add Publication Category",
    route: ROUTES.ADD_BAITUSSALAM_WEB_AND_APP_PUBLICATION_CATEGORY.path,
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
      <PageTitle title="All Publication Category" />
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

BaitussalamWebAndAppPublicationCategoryManagement.propTypes = {
  getPublicationCategory: PropTypes.func,
  list: PropTypes.array,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
};

export default BaitussalamWebAndAppPublicationCategoryManagement;
