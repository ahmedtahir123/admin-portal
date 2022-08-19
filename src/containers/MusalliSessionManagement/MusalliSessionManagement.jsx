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
    render: (text, record) => <Link to={`${ROUTES.EDIT_ADMIN_USER.path}/${record.userId}`}>{record.fullName}</Link>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    sorter: true,
  },
  {
    title: "Status",
    dataIndex: "userMetaData",
    key: "status",
    sorter: true,
    render: d => d.status,
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "Mosque Regestration Start Date",
    dataIndex: "mosqueRegestrationStartDate",
    key: "mosqueRegestrationStartDate",
  },
  {
    title: "Mosque Regestration End Date",
    dataIndex: "mosqueRegestrationEndDate",
    key: "mosqueRegestrationEndDate",
  },
  {
    title: "Participant Regestration Start Date",
    dataIndex: "participantRegestrationStartDate",
    key: "participantRegestrationStartDate",
  },
  {
    title: "Participant Regestration End Date",
    dataIndex: "participantRegestrationEndDate",
    key: "participantRegestrationEndDate",
  },
  {
    title: "Maximum Participant DOB",
    dataIndex: "maximumParticipantDOB",
    key: "maximumParticipantDOB",
  },
  {
    title: "Minimum Participant DOB",
    dataIndex: "minimumParticipantDOB",
    key: "minimumParticipantDOB",
  },
  {
    title: "Competition Start Date",
    dataIndex: "competitionStartDate",
    key: "competitionStartDate",
  },
  {
    title: "Competition End Date",
    dataIndex: "competitionEndDate",
    key: "competitionEndDate",
  },
  {
    title: "Cost Per Cycle",
    dataIndex: "costPerCycle",
    key: "costPerCycle",
  },
  {
    title: "Percentage To Pay",
    dataIndex: "percentageToPay",
    key: "percentageToPay",
  },
  {
    title: "Payment Due Date",
    dataIndex: "paymentDueDate",
    key: "paymentDueDate",
  },
  {
    title: "Second Payment Due Date",
    dataIndex: "secondPaymentDueDate",
    key: "secondPaymentDueDate",
  },
  {
    title: "Payment Percentage Split On First Due Date ",
    dataIndex: "percentageSplit",
    key: "percentageSplit",
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

function MusalliSessionManagement(props) {
  const { loading, enableDisableAdmin, pagination, getAdminUsers, deleteAdminUsers, list } = props;
  const getList = async query => {
    await getAdminUsers(query);
  };

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
    text: "Add Session",
    route: ROUTES.ADD_MUSALLI_SESSION_USER.path,
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
      <PageTitle title="All Sessions" />
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

MusalliSessionManagement.propTypes = {
  getAdminUsers: PropTypes.func,
  list: PropTypes.array,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
};

export default MusalliSessionManagement;
