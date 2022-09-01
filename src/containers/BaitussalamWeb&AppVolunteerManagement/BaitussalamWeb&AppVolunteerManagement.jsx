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
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
    sorter: true,
  },
  {
    title: "Email Address",
    dataIndex: "emailAddress",
    key: "emailAddress",
  },
  {
    title: "Phone ",
    dataIndex: "cellPhoneNumber",
    key: "cellPhoneNumber",
  },
  {
    title: "Date Created ",
    dataIndex: "createdDate",
    key: "createdDate",
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

function BaitussalamWebAndAppVolunteerManagement(props) {
  const { loading, enableDisableAdmin, pagination, getBaitussalamVolunteers, deleteAdminUsers, list } = props;
  const getList = async query => {
    await getBaitussalamVolunteers(query);
  };

  const canAddUser = permissionsUtil.checkAuth({
    category: "UsersManagement",
    subCategory: "Volunteers",
    action: "Add",
  });
  const canDeleteUser = permissionsUtil.checkAuth({
    category: "UsersManagement",
    subCategory: "Volunteers",
    action: "Delete",
  });
  const canChangeStatus = permissionsUtil.checkAuth({
    category: "UsersManagement",
    subCategory: "Volunteers",
    action: "EditStatus",
  });

  const addButton = {
    text: "Add Volunteer",
    route: ROUTES.BAITUSSALAM_WEB_AND_APP_VOLUNTEERS_MANAGEMENT.path,
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
      <PageTitle title="All Volunteers" />
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

BaitussalamWebAndAppVolunteerManagement.propTypes = {
  getBaitussalamVolunteers: PropTypes.func,
  list: PropTypes.array,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
};

export default BaitussalamWebAndAppVolunteerManagement;
