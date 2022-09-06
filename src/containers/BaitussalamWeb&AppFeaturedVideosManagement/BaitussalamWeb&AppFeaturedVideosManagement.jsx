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
    dataIndex: "nameEn",
    key: "nameEn",
    width: 150,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 150,
  },
  {
    title: "Video Link",
    dataIndex: "videoLink",
    key: "videoLink",
    width: 150,
  },
  {
    title: "Thumbnail",
    dataIndex: "thumbnailLink",
    key: "thumbnailLink",
    width: 150,

    render: record => <img src={`https://dev.baitussalam.org/storage/${record}`} alt="thumbnail" width={200} />,
  },
  {
    title: "Display At Home Screen",
    dataIndex: "displayAtHome",
    key: "displayAtHome",
    width: 150,

    render: record => <div>{`${record}`}</div>,
  },
  {
    title: "Sort Order",
    dataIndex: "sortOrder",
    key: "sortOrder",
    width: 150,
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 150,
    render: (text, record) => (
      <>
        {text?.slice(0, 3)?.join(`-`)} T {text?.slice(3, 6)?.join(`:`)}
      </>
    ),
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
    key: "createdBy",
    width: 150,
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: 150,
    render: (text, record) => (
      <>
        {text?.slice(0, 3)?.join(`-`)} T {text?.slice(3, 6)?.join(`:`)}
      </>
    ),
  },
  {
    title: "Updated By",
    dataIndex: "updatedBy",
    key: "updatedBy",
    width: 150,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 150,
  },
  {
    title: "Action",
    key: "action",
    width: 150,

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

function BaitussalamWebAndAppFeaturedVideosManagement(props) {
  const { loading, enableDisableAdmin, pagination, getFeaturedVideos, deleteAdminUsers, list } = props;
  const getList = async query => {
    await getFeaturedVideos(query);
  };

  const canAddUser = permissionsUtil.checkAuth({
    category: "ContentManagement",
    subCategory: "Videos",
    action: "Add",
  });
  const canDeleteUser = permissionsUtil.checkAuth({
    category: "ContentManagement",
    subCategory: "Videos",
    action: "Delete",
  });
  const canChangeStatus = permissionsUtil.checkAuth({
    category: "ContentManagement",
    subCategory: "Videos",
    action: "EditStatus",
  });

  const addButton = {
    text: "Add Featured Videos",
    route: ROUTES.ADD_BAITUSSALAM_WEB_AND_APP_VIDEOS.path,
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
      <PageTitle title="All Featured Videos" />
      <ListView
        dataSource={list}
        columns={columns}
        loading={loading}
        rowKey="id"
        addButton={addButton}
        pagination={pagination}
        deleteAllData={deleteAdminUsers}
        getList={getList}
        enableButton={onEnable}
        disableButton={onDisable}
        canChangeStatus={canChangeStatus}
        canAdd={canAddUser}
        canDelete={canDeleteUser}
        scroll={{ x: 1200 }}
      />
    </>
  );
}

BaitussalamWebAndAppFeaturedVideosManagement.propTypes = {
  getFeaturedVideos: PropTypes.func,
  list: PropTypes.array,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
};

export default BaitussalamWebAndAppFeaturedVideosManagement;
