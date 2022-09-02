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
    title: "Participant Name",
    dataIndex: "participantName",
    key: "participantName",
    sorter: true,
    width: 150,
  },
  {
    title: "Participant Father Name",
    dataIndex: "participantFatherName",
    key: "participantFatherName",
    width: 150,
  },
  {
    title: "Date Request",
    dataIndex: "dateRequest",
    key: "dateRequest",
    width: 150,
    render: record => record?.join("-"),
  },
  {
    title: "Participant Comment",
    dataIndex: "participantComment",
    key: "participantComment",
    width: 250,
  },
  {
    title: "Resolver Comment",
    dataIndex: "resolverComment",
    key: "resolverComment",
    width: 150,
  },
  {
    title: "Request Status",
    dataIndex: "requestStatus",
    key: "requestStatus",
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

function MusalliAttendanceChangeRequestManagment(props) {
  const { loading, enableDisableAdmin, pagination, getMusalliAttendanceChangeRequest, deleteAdminUsers, list } = props;
  const getList = async query => {
    await getMusalliAttendanceChangeRequest(query);
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
    text: "Add Mosque",
    route: ROUTES.ADD_MUSALLI_MOSQUE_USER.path,
  };

  // useEffect(() => {
  //   if (pagination.pageable) {
  //     {
  //       const query = { size: pagination.pageable.pageSize };
  //       getList(query);
  //     }
  //   } else getList();
  // }, []);

  // const onEnable = {
  //   handler: enableDisableAdmin,
  //   text: "Enable",
  // };

  // const onDisable = {
  //   handler: enableDisableAdmin,
  //   text: "Disable",
  // };

  return (
    <>
      <PageTitle title="Attendance Change Request" />
      <ListView
        dataSource={list}
        columns={columns}
        loading={loading}
        rowKey="id"
        addButton={addButton}
        pagination={pagination}
        deleteAllData={deleteAdminUsers}
        getList={getList}
        // enableButton={onEnable}
        // disableButton={onDisable}
        canChangeStatus={canChangeStatus}
        // canAdd={canAddUser}
        // canDelete={canDeleteUser}
      />
    </>
  );
}

MusalliAttendanceChangeRequestManagment.propTypes = {
  getMusalliAttendanceChangeRequest: PropTypes.func,
  list: PropTypes.array,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
};

export default MusalliAttendanceChangeRequestManagment;
