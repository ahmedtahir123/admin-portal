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
    dataIndex: "id",
    key: "id",
    sorter: true,
    width: 50,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: 150,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 300,
  },
  {
    title: "Order No",
    dataIndex: "orderNumber",
    key: "orderNumber",
    width: 150,
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    width: 150,
    render: image => (
      <img
        className="card-img"
        width={200}
        src={`https://dev.baitussalam.org/storage/images/projects/${image}`}
        alt="pic1"
      />
    ),
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    width: 150,
    render: record => (
      <Row>
        <Col span={4} xs={24} sm={12} lg={4}>
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

function BaitussalamWebAndAppProjectManagement(props) {
  const { loading, enableDisableAdmin, pagination, getProjects, deleteAdminUsers, list } = props;
  const getList = async query => {
    await getProjects(query);
  };

  const canAddUser = permissionsUtil.checkAuth({
    category: "Web_AppManagement",
    subCategory: "Projects",
    action: "Add",
  });
  const canDeleteUser = permissionsUtil.checkAuth({
    category: "Web_AppManagement",
    subCategory: "Projects",
    action: "Delete",
  });
  const canChangeStatus = permissionsUtil.checkAuth({
    category: "Web_AppManagement",
    subCategory: "Projects",
    action: "EditStatus",
  });

  const addButton = {
    text: "Add Projects",
    route: ROUTES.ADD_BAITUSSALAM_WEB_AND_APP_PROJECT.path,
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
      <PageTitle title="All Projects" />
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
        scroll={{ x: 200 }}
      />
    </>
  );
}

BaitussalamWebAndAppProjectManagement.propTypes = {
  getProjects: PropTypes.func,
  list: PropTypes.array,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
};

export default BaitussalamWebAndAppProjectManagement;
