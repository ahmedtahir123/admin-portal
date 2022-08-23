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
    title: "Email Address",
    dataIndex: "emailAddress",
    key: "emailAddress",
    sorter: (a, b) => a.emailAddress.length - b.emailAddress.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Contact",
    dataIndex: "cellPhoneNumber",
    key: "cellPhoneNumber",
  },
  {
    title: "Date Of Birth",
    dataIndex: "dob",
    key: "dob",
    sorter: (a, b) => a.emailAddress.length - b.emailAddress.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Document Submission Status",
    dataIndex: "documentSubmissionStatus",
    key: "documentSubmissionStatus",
    sorter: (a, b) => a.emailAddress.length - b.emailAddress.length,
    sortDirections: ["descend", "ascend"],
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

function BaitussalamWebAndAppDonationCategoryManagement(props) {
  const { loading, enableDisableAdmin, pagination, getAdminUsers, deleteAdminUsers, list } = props;
  const getList = async query => {
    await getAdminUsers(query);
  };

  const canAddUser = permissionsUtil.checkAuth({
    category: "Web_AppManagement",
    subCategory: "Donation_Categories",
    action: "Add",
  });
  const canDeleteUser = permissionsUtil.checkAuth({
    category: "Web_AppManagement",
    subCategory: "Donation_Categories",
    action: "Delete",
  });
  const canChangeStatus = permissionsUtil.checkAuth({
    category: "Web_AppManagement",
    subCategory: "Donation_Categories",
    action: "EditStatus",
  });

  const addButton = {
    text: "Add Donation",
    route: ROUTES.ADD_BAITUSSALAM_WEB_AND_APP_DONATION_CATEGORIES.path,
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
      <PageTitle title="All Donations" />
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

BaitussalamWebAndAppDonationCategoryManagement.propTypes = {
  getAdminUsers: PropTypes.func,
  list: PropTypes.array,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
};

export default BaitussalamWebAndAppDonationCategoryManagement;
