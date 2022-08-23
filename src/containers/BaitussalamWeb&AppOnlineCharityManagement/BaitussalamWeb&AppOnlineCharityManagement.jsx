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
    title: "Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Transaction No",
    dataIndex: "transactionNo",
    key: "transactionNo",
  },
  {
    title: "Transaction Date",
    dataIndex: "transactionDate",
    key: "transactionDate",
  },
  {
    title: "Customer Name",
    dataIndex: "customerName",
    key: "customerName",
  },
  {
    title: "Payment Methhod",
    dataIndex: "paymentMethod",
    key: "paymentMethod",
  },
  {
    title: "Total Amount",
    dataIndex: "totalAmount",
    key: "totalAmount",
  },
  {
    title: "Currency",
    dataIndex: "Currency",
    key: "Currency",
  },
  {
    title: "Platform",
    dataIndex: "Platform",
    key: "Platform",
    sorter: (a, b) => a.emailAddress.length - b.emailAddress.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "QMS Booking Id",
    dataIndex: "QMS_Id",
    key: "QMS_Id",
  },
  {
    title: "Transaction Status",
    dataIndex: "transactionStatus",
    key: "transactionStatus",
    sorter: true,
    render: d => d.status,
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
    dataIndex: "updatedAt",
    key: "updatedAt",
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

function BaitussalamWebAndAppOnlineCharityManagement(props) {
  const { loading, enableDisableAdmin, pagination, getAdminUsers, deleteAdminUsers, list } = props;
  const getList = async query => {
    await getAdminUsers(query);
  };

  const canAddUser = permissionsUtil.checkAuth({
    category: "Web_AppManagement",
    subCategory: "Online_Charities",
    action: "Add",
  });
  const canDeleteUser = permissionsUtil.checkAuth({
    category: "Web_AppManagement",
    subCategory: "Online_Charities",
    action: "Delete",
  });
  const canChangeStatus = permissionsUtil.checkAuth({
    category: "Web_AppManagement",
    subCategory: "Online_Charities",
    action: "EditStatus",
  });

  const addButton = {
    text: "Add Participants",
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
      <PageTitle title="All Online Charity" />
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

BaitussalamWebAndAppOnlineCharityManagement.propTypes = {
  getAdminUsers: PropTypes.func,
  list: PropTypes.array,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
};

export default BaitussalamWebAndAppOnlineCharityManagement;
