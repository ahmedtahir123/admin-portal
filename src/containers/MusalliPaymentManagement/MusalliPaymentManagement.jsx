/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
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
    title: "Volunteer Name",
    dataIndex: "volunteer",
    key: "volunteer",
    sorter: true,
    render: (text, record) => text?.name,
    width: 150,
  },
  {
    title: "Volunteer CNIC",
    dataIndex: "volunteer",
    key: "volunteer",
    width: 150,
    sorter: true,
    render: (text, record) => text?.nic,
  },
  {
    title: "Volunteer Email Address",
    dataIndex: "volunteer",
    key: "volunteer",
    width: 150,
    render: (text, record) => text?.email,
  },
  {
    title: "Mosque",
    dataIndex: "volunteer",
    key: "volunteer",
    width: 150,
    render: (text, record) => text?.mosque?.name,
  },
  {
    title: "City",
    dataIndex: "volunteer",
    key: "volunteer",
    width: 150,
    render: (text, record) => text?.address?.city,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    width: 150,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 150,
  },
  {
    title: "Comment",
    dataIndex: "comment",
    key: "comment",
    width: 150,
  },
  {
    title: "Request Status",
    dataIndex: "requestStatus",
    key: "requestStatus",
    width: 150,
  },
  {
    title: "Created Date",
    dataIndex: "dateCreated",
    key: "dateCreated",
    width: 150,
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    width: 150,

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

function MusalliPaymentManagement(props) {
  const {
    loading,
    enableDisableAdmin,
    pagination,
    getMusalliPayment,
    deleteAdminUsers,
    list,
    activeSessionLoading,
    activeSessionList,
  } = props;

  function sessionId() {
    if (activeSessionList?.length > 0) {
      return activeSessionList[0]?.id;
    }
    return null;
  }
  const sessionIdValue = sessionId();

  const getList = async query => {
    await getMusalliPayment(query);
  };

  console.log(sessionIdValue, "sessionIdValue");

  const canAddUser = permissionsUtil.checkAuth({
    category: "MusalliManagement",
    subCategory: "Musalli",
    action: "Add",
  });
  const canDeleteUser = permissionsUtil.checkAuth({
    category: "MusalliManagement",
    subCategory: "Musalli",
    action: "Delete",
  });
  const canChangeStatus = permissionsUtil.checkAuth({
    category: "MusalliManagement",
    subCategory: "Musalli",
    action: "EditStatus",
  });

  const addButton = {
    text: "Add Payment",
    route: ROUTES.ADD_MUSALLI_PAYMENT_USER.path,
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

  console.log(activeSessionList, "activeSessionListpay");

  return (
    <>
      <PageTitle title="All Payments" />
      {sessionIdValue && (
        <ListView
          dataSource={list}
          columns={columns}
          loading={loading}
          rowKey="userId"
          addButton={addButton}
          pagination={pagination}
          // deleteAllData={deleteAdminUsers}
          getList={getList}
          // enableButton={onEnable}
          // disableButton={onDisable}
          canChangeStatus={canChangeStatus}
          canAdd={canAddUser}
          // canDelete={canDeleteUser}
          scroll={{ x: 400 }}
          sessionIdValue={sessionIdValue}
        />
      )}
    </>
  );
}

MusalliPaymentManagement.propTypes = {
  getMusalliPayment: PropTypes.func,
  list: PropTypes.array,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
  activeSessionLoading: PropTypes.bool,
  activeSessionList: PropTypes.array,
};

export default MusalliPaymentManagement;
