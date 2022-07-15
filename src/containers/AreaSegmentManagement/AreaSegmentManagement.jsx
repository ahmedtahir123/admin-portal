import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import _get from "lodash/get";
import _isArray from "lodash/isArray";
import ListView from "../../components/ListView/ListView";
import ROUTES from "../../routes/constant.route";
import { STATUS } from "../../utils/constants";
import permissionsUtil from "../../utils/permissions.util";
import "./AreaSegment.scss";
import { TableConfig } from "../../utils/utils";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomIcon from "../../components/CustomIcon/CustomIcon";

const AreaSegment = props => {
  const { loading, enableDisableSegmentCategories, deleteAllSegments, getSegmentList, pagination } = props;

  const columns = [
    // {
    //   title: "Segment ID",
    //   dataIndex: "code",
    //   key: "code",
    //   render: (text, record) => <Link to={`${ROUTES.EDIT_AREA_SEGMENT.path}/${record.code}`}>{record.code}</Link>,
    // },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      render: (text, record) => <Link to={`${ROUTES.EDIT_AREA_SEGMENT.path}/${record.code}`}>{record.name}</Link>,
    },
    {
      title: "State / Province",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Area",
      dataIndex: "areaName",
      key: "areaName",
    },
    {
      title: "Is Enabled",
      dataIndex: "enabled",
      key: "enabled",
      align: "center",
      render: d => (d ? <CustomIcon name="CheckCircleTwoTone" /> : <CustomIcon name="CloseCircleTwoTone" />),
    },
  ];

  const getSegments = async query => {
    await getSegmentList(query);
  };

  // useEffect(() => {
  //   // const query = TableConfig("name");
  //   getSegments();
  // }, []);

  const dataSource = _isArray(props.list) ? props.list : [];
  const onEnable = {
    handler: enableDisableSegmentCategories,
    text: "Enable",
  };

  const onDisable = {
    handler: enableDisableSegmentCategories,
    text: "Disable",
  };

  const addButton = {
    text: "Add Segment",
    route: ROUTES.ADD_AREA_SEGMENT.path,
  };
  const canAdd = permissionsUtil.checkAuth({
    category: "PartnerManagement",
    subCategory: "AreaSegment",
    action: "Add",
  });

  const canDelete = permissionsUtil.checkAuth({
    category: "PartnerManagement",
    subCategory: "AreaSegment",
    action: "Delete",
  });

  const canChangeStatus = permissionsUtil.checkAuth({
    category: "PartnerManagement",
    subCategory: "AreaSegment",
    action: "EditStatus",
  });

  return (
    <>
      <PageTitle title="All Area Segment" />
      <ListView
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        rowKey="code"
        addButton={addButton}
        pagination={pagination}
        deleteAllData={deleteAllSegments}
        getList={getSegments}
        enableButton={onEnable}
        disableButton={onDisable}
        canChangeStatus={canChangeStatus}
        canAdd={canAdd}
        canDelete={canDelete}
      ></ListView>
    </>
  );
};

AreaSegment.defaultProps = {
  list: [],
};

AreaSegment.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableSegmentCategories: PropTypes.func,
  deleteAllSegments: PropTypes.func,
  getSegmentList: PropTypes.func,
};

export default AreaSegment;
