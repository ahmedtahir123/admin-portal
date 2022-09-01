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
    title: "Country",
    dataIndex: "country",
    key: "country",
    render: (text, record) => <>{text?.name}</>,
  },
  {
    title: "Hijri Month",
    dataIndex: "month",
    key: "month",
    render: (text, record) => (
      <>
        <div>{text?.monthEn}</div>
      </>
    ),
  },
  {
    title: "Hijri Month Start Date",
    dataIndex: "startDate",
    key: "startDate",
    render: (text, record) => <>{text?.join(`-`)}</>,
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    sortDirections: ["descend", "ascend"],
    render: (text, record) => (
      <>
        {text?.slice(0, 3)?.join(`-`)} T {text?.slice(3, 6)?.join(`:`)}
      </>
    ),
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
    key: "createdBy",
    // sortDirections: ["descend", "ascend"],
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (text, record) => (
      <>
        {text?.slice(0, 3)?.join(`-`)} T {text?.slice(3, 6)?.join(`:`)}
      </>
    ),
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

function BaitussalamWebAndAppHijriDateManagement(props) {
  const { loading, enableDisableAdmin, pagination, getHijriDates, deleteAdminUsers, list } = props;
  // debugger;
  const getList = async query => {
    await getHijriDates(query);
  };

  const canAddUser = permissionsUtil.checkAuth({
    category: "Web_AppManagement",
    subCategory: "Hijri_Dates",
    action: "Add",
  });
  const canDeleteUser = permissionsUtil.checkAuth({
    category: "Web_AppManagement",
    subCategory: "Hijri_Dates",
    action: "Delete",
  });
  const canChangeStatus = permissionsUtil.checkAuth({
    category: "Web_AppManagement",
    subCategory: "Hijri_Dates",
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

  console.log(list, "listlist");

  return (
    <>
      <PageTitle title="Hijri Dates" />
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
      />
    </>
  );
}

BaitussalamWebAndAppHijriDateManagement.propTypes = {
  getHijriDates: PropTypes.func,
  list: PropTypes.array,
  deleteAdminUsers: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableAdmin: PropTypes.func,
};

export default BaitussalamWebAndAppHijriDateManagement;
