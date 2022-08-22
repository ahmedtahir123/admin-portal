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
    dataIndex: "Name",
    key: "Name",
    sorter: true,
    render: (text, record) => <Link to={`${ROUTES.EDIT_ADMIN_USER.path}/${record.userId}`}>{record.fullName}</Link>,
  },
  {
    title: "Father Name",
    dataIndex: "fatherName",
    key: "fatherName",
    sorter: true,
    render: (text, record) => <Link to={`${ROUTES.EDIT_ADMIN_USER.path}/${record.userId}`}>{record.fullName}</Link>,
  },
  {
    title: "Contact",
    dataIndex: "cellPhoneNumber",
    key: "cellPhoneNumber",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Date Of Birth",
    dataIndex: "dob",
    key: "dob",
    sorter: (a, b) => a.emailAddress.length - b.emailAddress.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Province",
    dataIndex: "province",
    key: "province",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Tehseel",
    dataIndex: "Tehseel",
    key: "Tehseel",
  },
  {
    title: "Zila",
    dataIndex: "zila",
    key: "zila",
  },
  {
    title: "Is International",
    dataIndex: "is_International",
    key: "is_International",
  },
  {
    title: "Competition Name",
    dataIndex: "competitionName",
    key: "competitionName",
  },
  {
    title: "ShortList Status",
    dataIndex: "shortListStatus",
    key: "shortListStatus",
    sorter: true,
    render: d => d.status,
  },
  {
    title: "ShortList Date",
    dataIndex: "shortListDate",
    key: "shortListDate",
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

function BaitussalamWebAndAppNaatUsersManagement(props) {
  const { loading, enableDisableAdmin, pagination, getAdminUsers, deleteAdminUsers, list } = props;
  const getList = async query => {
    await getAdminUsers(query);
  };

  const canAddUser = permissionsUtil.checkAuth({
    category: "Web_AppManagement",
    subCategory: "Baitussalam-Web&App",
    action: "Add",
  });
  const canDeleteUser = permissionsUtil.checkAuth({
    category: "Web_AppManagement",
    subCategory: "Baitussalam-Web&App",
    action: "Delete",
  });
  const canChangeStatus = permissionsUtil.checkAuth({
    category: "Web_AppManagement",
    subCategory: "Baitussalam-Web&App",
    action: "EditStatus",
  });

  const addButton = {
    text: "Add Naat User",
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
      <PageTitle title="All Naat Competition Users" />
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

BaitussalamWebAndAppNaatUsersManagement.propTypes = {
  getAdminUsers: PropTypes.func,
  list: PropTypes.array,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
};

export default BaitussalamWebAndAppNaatUsersManagement;
