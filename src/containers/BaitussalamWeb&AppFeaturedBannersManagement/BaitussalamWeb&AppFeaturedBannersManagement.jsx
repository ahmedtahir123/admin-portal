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
    title: "Title",
    dataIndex: "title",
    key: "title",
    sorter: true,
    render: (text, record) => <Link to={`${ROUTES.EDIT_ADMIN_USER.path}/${record.userId}`}>{record.fullName}</Link>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    sorter: true,
    render: (text, record) => <Link to={`${ROUTES.EDIT_ADMIN_USER.path}/${record.userId}`}>{record.fullName}</Link>,
  },
  {
    title: "Banner Image",
    dataIndex: "bannerImage",
    key: "bannerImage",
  },
  {
    title: "Display Order",
    dataIndex: "displayOrder",
    key: "displayOrder",
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
    dataIndex: "updatedAt",
    key: "updatedAt",
  },
  {
    title: "Updated By",
    dataIndex: "updatedBy",
    key: "updatedBy",
  },
  {
    title: "Status",
    dataIndex: "userMetaData",
    key: "status",
    sorter: true,
    render: d => d.status,
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
        <Col span={12} xs={24} sm={12} lg={12}>
          <Link to={`/swim-lane-manager/${record.id}`}>
            <Button type="link">
              <CustomIcon name="UsergroupAddOutlined" />
            </Button>
          </Link>
        </Col>
      </Row>
    ),
  },
];

function BaitussalamWebAndAppFeaturedVideosManagement(props) {
  const { loading, enableDisableAdmin, pagination, getAdminUsers, deleteAdminUsers, list } = props;
  const getList = async query => {
    await getAdminUsers(query);
  };

  const canAddUser = permissionsUtil.checkAuth({
    category: "ContentManagement",
    subCategory: "Featured_Banners",
    action: "Add",
  });
  const canDeleteUser = permissionsUtil.checkAuth({
    category: "ContentManagement",
    subCategory: "Featured_Banners",
    action: "Delete",
  });
  const canChangeStatus = permissionsUtil.checkAuth({
    category: "ContentManagement",
    subCategory: "Featured_Banners",
    action: "EditStatus",
  });

  const addButton = {
    text: "Add Featured Banner",
    route: ROUTES.ADD_BAITUSSALAM_WEB_AND_APP_FEATURED_BANNERS.path,
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
      <PageTitle title="All Featured Banner" />
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

BaitussalamWebAndAppFeaturedVideosManagement.propTypes = {
  getAdminUsers: PropTypes.func,
  list: PropTypes.array,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
};

export default BaitussalamWebAndAppFeaturedVideosManagement;
