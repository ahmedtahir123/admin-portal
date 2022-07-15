import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Divider } from "antd";

import ROUTES from "../../routes/constant.route";
import { STATUS } from "../../utils/constants";
import ListView from "../../components/ListView/ListView";
import permissionsUtil from "../../utils/permissions.util";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomIcon from "../../components/CustomIcon/CustomIcon";

const CampaignDesigner = props => {
  const { loading, updateActiveStatus, deleteCampaign, getCampaignList, campaigns, dataSource, pagination } = props;

  const columns = [
    {
      title: "Campaign Code",
      dataIndex: "campaignId",
      key: "campaignId",
      render: (text, record) => (
        <Link to={`${ROUTES.EDIT_CAMPAIGN.path}/${record.campaignId}`}>{record.campaignId}</Link>
      ),
    },
    {
      title: "Campaign Name",
      dataIndex: "campaignName",
      key: "campaignName",
      sorter: (a, b) => a.campaignName.length - b.campaignName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Location Name",
      dataIndex: "locationName",
      key: "locationName",
      sorter: (a, b) => a.locationName.length - b.locationName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
    },
    {
      title: "Start",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Expiry",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: price => (price <= 0 ? "Gift" : price),
    },
    {
      title: "Vouchers",
      dataIndex: "vouchersCount",
      key: "vouchersCount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Is Enabled",
      dataIndex: "enabled",
      key: "enabled",
      align: "center",
      render: enabled =>
        enabled ? <CustomIcon name="CheckCircleTwoTone" /> : <CustomIcon name="CloseCircleTwoTone" />,
    },
  ];

  const addButton = {
    text: "Add Campaign",
    route: ROUTES.ADD_CAMPAIGN.path,
  };

  const canAdd = permissionsUtil.checkAuth({
    category: "PromotionManagement",
    subCategory: "CampaignDesigner",
    action: "Add",
  });

  const canDelete = permissionsUtil.checkAuth({
    category: "PromotionManagement",
    subCategory: "CampaignDesigner",
    action: "Delete",
  });

  const canChangeStatus = permissionsUtil.checkAuth({
    category: "PromotionManagement",
    subCategory: "CampaignDesigner",
    action: "EditStatus",
  });

  const onEnable = {
    text: "Enable",
    handler: ids => updateActiveStatus(ids, true),
  };

  const onDisable = {
    text: "Disable",
    handler: ids => updateActiveStatus(ids, false),
  };

  const deleteAll = async ids => deleteCampaign(ids);

  const getList = async query => {
    await getCampaignList(query);
  };

  // useEffect(() => {
  //   getList();
  // }, []);
  return (
    <>
      <PageTitle title="All Campaigns" />
      <ListView
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        rowKey="campaignId"
        addButton={addButton}
        listData={campaigns}
        deleteAllData={deleteAll}
        getList={getList}
        enableButton={onEnable}
        disableButton={onDisable}
        canChangeStatus={canChangeStatus}
        canAdd={canAdd}
        canDelete={canDelete}
        pagination={pagination}
      ></ListView>
    </>
  );
};

CampaignDesigner.defaultProps = {
  dataSource: [],
};

CampaignDesigner.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  campaigns: PropTypes.object,
  updateActiveStatus: PropTypes.func,
  deleteCampaign: PropTypes.func,
  getCampaignList: PropTypes.func,
  pagination: PropTypes.object,
};

export default CampaignDesigner;
