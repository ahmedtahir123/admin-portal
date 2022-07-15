import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "antd";
import * as moment from "dayjs";
import ROUTES from "../../routes/constant.route";
import ListView from "../../components/ListView/ListView";
import permissionsUtil from "../../utils/permissions.util";
import PageTitle from "../../components/PageTitle/PageTitle";
import { DATE_FORMAT_TIME } from "../../utils/constants";
import CustomIcon from "../../components/CustomIcon/CustomIcon";

const LandingPageManagement = props => {
  const {
    loading,
    enableDisableProfiler,
    deleteAllProfiler,
    getProfilerList,
    profiler,
    dataSource,
    pagination,
  } = props;
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // sorter: true,
      // sortDirections: ["descend", "ascend"],
      render: (text, record) => <Link to={`${ROUTES.EDIT_PROFILER.path}/${record.id}`}>{record.name}</Link>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: text => (text ? <span>{moment(text).format(DATE_FORMAT_TIME)}</span> : "N/A"),
    },

    {
      title: "Start Time",
      dataIndex: "deployedAt",
      key: "deployedAt",
      render: text => (text ? <span>{moment(text).format(DATE_FORMAT_TIME)}</span> : "N/A"),
    },

    {
      title: "End Time",
      dataIndex: "disengagedAt",
      key: "disengagedAt",
      render: text => (text ? <span>{moment(text).format(DATE_FORMAT_TIME)}</span> : "N/A"),
    },
    // {
    //   title: "Enable",
    //   dataIndex: "enabledStatus",
    //   key: "enabledStatus",
    // },
    {
      title: "Status",
      dataIndex: "operationalStatus",
      key: "operationalStatus",
      // filters: [
      //   { text: "ACTIVE", value: "ACTIVE" },
      //   { text: "INACTIVE", value: "INACTIVE" },
      // ],
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      // filters: [
      //   { text: "ACTIVE", value: "ACTIVE" },
      //   { text: "INACTIVE", value: "INACTIVE" },
      // ],
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

  const addButton = {
    text: "Add Profiler",
    route: ROUTES.ADD_PROFILER.path,
  };
  const canAdd = permissionsUtil.checkAuth({
    category: "LandingManagement",
    subCategory: "Profiler",
    action: "Add",
  });

  const canDelete = permissionsUtil.checkAuth({
    category: "LandingManagement",
    subCategory: "Profiler",
    action: "Delete",
  });

  // const onEnable = {
  //   text: "Enable",
  //   handler: selectedItems => enableDisableProfiler(selectedItems, true),
  // };

  // const onDisable = {
  //   text: "Disable",
  //   handler: selectedItems => enableDisableProfiler(selectedItems, false),
  // };

  const deleteAll = id => deleteAllProfiler(id);

  const getList = async query => {
    await getProfilerList(query);
  };

  // useEffect(() => {
  //   getList();
  // }, []);

  return (
    <Fragment>
      <PageTitle title="All Landing Page Layouts" />
      <ListView
        dataSource={profiler}
        columns={columns}
        loading={loading}
        rowKey="id"
        addButton={addButton}
        listData={profiler}
        deleteAllData={deleteAll}
        getList={getList}
        canAdd={canAdd}
        canDelete={canDelete}
        pagination={pagination}
      />
    </Fragment>
  );
};

LandingPageManagement.defaultProps = {
  dataSource: [],
};

LandingPageManagement.propTypes = {
  pagination: PropTypes.object,
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  profiler: PropTypes.object,
  enableDisableProfiler: PropTypes.func,
  deleteAllProfiler: PropTypes.func,
  getProfilerList: PropTypes.func,
};

export default LandingPageManagement;
