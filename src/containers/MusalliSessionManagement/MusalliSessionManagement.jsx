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
    title: "Description",
    dataIndex: "description",
    key: "description",
    sorter: true,
    width: 200,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 200,
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
    width: 200,
    render: d =>
      d
        ?.slice(0, 3)
        ?.reverse()
        ?.join("-"),
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
    width: 200,
    render: d =>
      d
        ?.slice(0, 3)
        ?.reverse()
        ?.join("-"),
  },
  {
    title: "Mosque Regestration Start Date",
    dataIndex: "masjidRegistrationStartDate",
    key: "masjidRegistrationStartDate",
    width: 200,
    render: d =>
      d
        ?.slice(0, 3)
        ?.reverse()
        ?.join("-"),
  },
  {
    title: "Mosque Regestration End Date",
    dataIndex: "masjidRegistrationEndDate",
    key: "masjidRegistrationEndDate",
    width: 200,
    render: d =>
      d
        ?.slice(0, 3)
        ?.reverse()
        ?.join("-"),
  },
  {
    title: "Participant Regestration Start Date",
    dataIndex: "participantRegistrationStartDate",
    key: "participantRegistrationStartDate",
    width: 200,
    render: d =>
      d
        ?.slice(0, 3)
        ?.reverse()
        ?.join("-"),
  },
  {
    title: "Participant Regestration End Date",
    dataIndex: "participantRegistrationEndDate",
    key: "participantRegistrationEndDate",
    width: 200,
    render: d =>
      d
        ?.slice(0, 3)
        ?.reverse()
        ?.join("-"),
  },
  {
    title: "Maximum Participant DOB",
    dataIndex: "maximumParticipantDateOfBirth",
    key: "maximumParticipantDateOfBirth",
    width: 200,
    render: d =>
      d
        ?.slice(0, 3)
        ?.reverse()
        ?.join("-"),
  },
  {
    title: "Minimum Participant DOB",
    dataIndex: "minimumParticipantDateOfBirth",
    key: "minimumParticipantDateOfBirth",
    width: 200,
    render: d =>
      d
        ?.slice(0, 3)
        ?.reverse()
        ?.join("-"),
  },
  {
    title: "Competition Start Date",
    dataIndex: "competitionStartDate",
    key: "competitionStartDate",
    width: 200,
    render: d =>
      d
        ?.slice(0, 3)
        ?.reverse()
        ?.join("-"),
  },
  {
    title: "Competition End Date",
    dataIndex: "competitionEndDate",
    key: "competitionEndDate",
    width: 200,
    render: d =>
      d
        ?.slice(0, 3)
        ?.reverse()
        ?.join("-"),
  },
  {
    title: "Cost Per Cycle",
    dataIndex: "costPerCycle",
    key: "costPerCycle",
    width: 200,
  },
  {
    title: "Percentage To Pay",
    dataIndex: "percentageToPay",
    key: "percentageToPay",
    width: 200,
  },
  {
    title: "Payment Due Date",
    dataIndex: "paymentDueDate",
    key: "paymentDueDate",
    width: 200,
    render: d =>
      d
        ?.slice(0, 3)
        ?.reverse()
        ?.join("-"),
  },
  {
    title: "Second Payment Due Date",
    dataIndex: "secondPaymentDueDate",
    key: "secondPaymentDueDate",
    width: 200,
    render: d =>
      d
        ?.slice(0, 3)
        ?.reverse()
        ?.join("-"),
  },
  {
    title: "Payment Percentage Split On First Due Date ",
    dataIndex: "paymentPercentageSplitOnFirstDueDate",
    key: "paymentPercentageSplitOnFirstDueDate",
    width: 200,
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

function MusalliSessionManagement(props) {
  const { loading, enableDisableAdmin, pagination, getMusalliSession, deleteAdminUsers, list } = props;
  const getList = async query => {
    await getMusalliSession(query);
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
  console.log(list, "listlistlistlistlist");
  return (
    <>
      <PageTitle title="All Sessions" />
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
        // disableButton={onDisable}
        // canChangeStatus={canChangeStatus}
        // canAdd={canAddUser}
        // canDelete={canDeleteUser}
        scroll={{ x: 200, y: 400 }}
      />
    </>
  );
}

MusalliSessionManagement.propTypes = {
  getMusalliSession: PropTypes.func,
  list: PropTypes.array,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
};

export default MusalliSessionManagement;
