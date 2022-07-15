import React, { useState, useEffect } from "react";
import { Switch, Popconfirm, Button, Divider, DatePicker } from "antd";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ROUTES from "../../routes/constant.route";
import ListView from "../../components/ListView/ListView";
import { STATUS, DATE_FORMAT } from "../../utils/constants";
import permissionsUtil from "../../utils/permissions.util";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomIcon from "../../components/CustomIcon/CustomIcon";

const CampaignStatusConsoleContainer = props => {
  const [value, setValue] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: info => {
      const { selectedKeys, confirm, clearFilters } = info;
      return (
        <div className="session-managment_dropdown-div">
          <DatePicker
            format={DATE_FORMAT}
            className="session-managment_datepicker"
            onChange={(date, dateString) => setValue(date ? dateString : null)}
          />
          <br />

          <Button
            className="session-managment_search-btn"
            type="primary"
            onClick={() => handleOk(selectedKeys, confirm, dataIndex)}
            size="small"
          >
            Search
          </Button>
          <Button className="session-managment_reset-btn" onClick={() => handleReset(clearFilters)} size="small">
            Reset
          </Button>
        </div>
      );
    },
    onFilter: (d, record) => record[dataIndex].includes(d),
  });
  const handleOk = (selectedKeys, confirm, dataIndex) => {
    selectedKeys[0] = value;
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText("");
  };

  const {
    loading,
    enableDisableCampaign,
    deleteAllCampaignStatus,
    getCampaignStatusList,
    campaignStatus,
    dataSource,
    pagination,
  } = props;
  const columns = [
    {
      title: "Id",
      dataIndex: "campaignId",
      key: "campaignId",
      render: (text, record) => (
        <Link to={`${ROUTES.CAMPAIGN_STATUS_VIEW.path}/${record.campaignId}`}>{record.campaignId}</Link>
      ),
    },
    {
      title: "Campaign Name",
      dataIndex: "campaignName",
      key: "campaignName",
    },
    {
      title: "Location Name",
      dataIndex: "locationName",
      key: "locationName",
      filters: campaignStatus.locationFilter,
      onFilter: (d, record) => record.locationName.indexOf(d) === 0,
    },
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
      filters: campaignStatus.eventFilter,
      onFilter: (d, record) => record.eventName.indexOf(d) === 0,
    },
    {
      title: "Start Timestamp",
      dataIndex: "startTimeStamp",
      key: "startTimeStamp",
      ...getColumnSearchProps("startTimeStamp"),
    },
    {
      title: "Expiry Timestamp",
      dataIndex: "expiryTimeStamp",
      key: "expiryTimeStamp",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Number of Vouchers",
      dataIndex: "numberOfvouchers",
      key: "numberOfvouchers",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: campaignStatus.statusFilter,
      onFilter: (d, record) => record.status.indexOf(d) === 0,
    },
    {
      title: "Is Enabled",
      dataIndex: "active",
      key: "active",
      align: "center",
      render: record =>
        record.active ? <CustomIcon name="CheckCircleTwoTone" /> : <CustomIcon name="CloseCircleTwoTone" />,
    },
  ];

  const onEnable = {
    text: "Enable",
    handler: selectedItems => enableDisableCampaign(selectedItems),
  };

  const onDisable = {
    text: "Disable",
    handler: selectedItems => enableDisableCampaign(selectedItems),
  };

  const deleteAll = async id => deleteAllCampaignStatus(id);

  const getList = async query => {
    await getCampaignStatusList(query);
  };

  // useEffect(() => {
  //   getList();
  // }, []);

  return (
    <>
      <PageTitle title="All Campaign Status" />
      <ListView
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        rowKey="campaignId"
        listData={campaignStatus}
        deleteAllData={deleteAll}
        getList={getList}
        enableButton={onEnable}
        disableButton={onDisable}
        pagination={pagination}
      ></ListView>
    </>
  );
};

CampaignStatusConsoleContainer.defaultProps = {
  dataSource: [],
};

CampaignStatusConsoleContainer.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  campaignStatus: PropTypes.object,
  enableDisableCampaign: PropTypes.func,
  deleteAllCampaignStatus: PropTypes.func,
  getCampaignStatusList: PropTypes.func,
  pagination: PropTypes.object,
};

export default CampaignStatusConsoleContainer;
