import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ListView from "../../components/ListView/ListView";
import PageTitle from "../../components/PageTitle/PageTitle";
import ROUTES from "../../routes/constant.route";
import { STATUS } from "../../utils/constants";
import permissionsUtil from "../../utils/permissions.util";
import CustomIcon from "../../components/CustomIcon/CustomIcon";

const PartnerManagement = props => {
  const { loading, enableDisablePartner, deleteAllPartner, getPartnerList, dataSource, pagination } = props;
  const columns = [
    // {
    //   title: "Outlet ID",
    //   dataIndex: "code",
    //   key: "code",
    //   // render: (text, record) => <Link to={`${ROUTES.EDIT_PARTNER.path}/${record.code}`}>{record.code}</Link>,
    // },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      render: (text, record) => <Link to={`${ROUTES.EDIT_PARTNER.path}/${record.code}`}>{record.name}</Link>,
    },
    {
      title: "Brand Name",
      dataIndex: ["brand", "name"],
      key: "name",
      sorter: true,
    },
    // {
    //   title: "Brand Category",
    //   dataIndex: "brand",
    //   key: "categoryName",
    //   sorter: true,
    //   render: brand => brand.categoryName,
    // },
    {
      title: "Area Segment",
      dataIndex: "areaSegment",
      key: "areaSegment",
      sorter: true,
      render: areaSegment => <span className="text-capitalize">{areaSegment ? areaSegment.name : ""}</span>,
    },
    {
      title: "Status",
      dataIndex: "partnerStatus",
      key: "partnerStatus",
      render: d => {
        if (d) {
          const key = d.split("_");
          return `${key[0]} ${key[1]}`;
        }
        return "Not Available";
      },
    },
    {
      title: "Is Enabled",
      dataIndex: "enabled",
      key: "enabled",
      align: "center",
      render: isEnabled =>
        isEnabled ? <CustomIcon name="CheckCircleTwoTone" /> : <CustomIcon name="CloseCircleTwoTone" />,
    },
  ];
  const addButton = {
    text: "Add Outlet",
    route: ROUTES.ADD_PARTNER.path,
  };
  const canAdd = permissionsUtil.checkAuth({
    category: "PartnerManagement",
    subCategory: "Partner",
    action: "Add",
  });

  const canDelete = permissionsUtil.checkAuth({
    category: "PartnerManagement",
    subCategory: "Partner",
    action: "Delete",
  });

  const canChangeStatus = permissionsUtil.checkAuth({
    category: "PartnerManagement",
    subCategory: "Partner",
    action: "EditStatus",
  });

  const getList = async query => {
    await getPartnerList(query);
  };

  // useEffect(() => {
  //   // const query = TableConfig("name");
  //   getList();
  // }, []);

  const onEnable = {
    text: "Enable",
    handler: enableDisablePartner,
  };
  const onDisable = {
    text: "Disable",
    handler: enableDisablePartner,
  };

  return (
    <>
      <PageTitle title="All Outlets" />
      <ListView
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        rowKey="code"
        addButton={addButton}
        deleteAllData={deleteAllPartner}
        getList={getList}
        canAdd={canAdd}
        canDelete={canDelete}
        canChangeStatus={canChangeStatus}
        enableButton={onEnable}
        disableButton={onDisable}
        pagination={pagination}
      />
    </>
  );
};

PartnerManagement.defaultProps = {
  dataSource: [],
};

PartnerManagement.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisablePartner: PropTypes.func,
  deleteAllPartner: PropTypes.func,
  getPartnerList: PropTypes.func,
};

export default PartnerManagement;
