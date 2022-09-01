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
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: 50,
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    width: 150,
  },
  {
    title: "Transaction No",
    dataIndex: "transactionNumber",
    key: "transactionNumber",
    width: 150,
  },
  {
    title: "Transaction Date",
    dataIndex: "transactionDate",
    key: "transactionDate",
    width: 150,
  },
  {
    title: "Customer Name",
    dataIndex: "customerFullName",
    key: "customerFullName",
    width: 150,
  },
  {
    title: "Payment Methhod",
    dataIndex: "paymentMethodName",
    key: "paymentMethodName",
    width: 150,
  },
  {
    title: "Total Amount",
    dataIndex: "totalAmount",
    key: "totalAmount",
    width: 150,
  },
  {
    title: "Currency",
    dataIndex: "currName",
    key: "currName",
    width: 150,
  },
  {
    title: "Platform",
    dataIndex: "platform",
    key: "platform",
    sortDirections: ["descend", "ascend"],
    width: 150,
  },
  {
    title: "QMS Booking Id",
    dataIndex: "QMS_Id",
    key: "QMS_Id",
    width: 150,
  },
  {
    title: "Transaction Status",
    dataIndex: "tranStatus",
    key: "tranStatus",
    sorter: true,
    width: 150,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 150,
    sorter: true,
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 150,
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
  },
  {
    title: "Updated By",
    dataIndex: "updatedBy",
    key: "updatedBy",
    width: 150,
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

function BaitussalamWebAndAppOnlineCharityManagement(props) {
  const { loading, enableDisableAdmin, pagination, getOnlineCharity, deleteAdminUsers, list } = props;
  const getList = async query => {
    await getOnlineCharity(query);
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

  console.log(list, "listlistlistlist");
  return (
    <>
      <PageTitle title="All Online Charity" />
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
        scroll={{ x: 1350, y: 600 }}
      />
    </>
  );
}

BaitussalamWebAndAppOnlineCharityManagement.propTypes = {
  getOnlineCharity: PropTypes.func,
  list: PropTypes.array,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
};

export default BaitussalamWebAndAppOnlineCharityManagement;
