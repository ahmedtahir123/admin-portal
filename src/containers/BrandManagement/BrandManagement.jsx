import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ListView from "../../components/ListView/ListView";
import PageTitle from "../../components/PageTitle/PageTitle";
import ROUTES from "../../routes/constant.route";
// import { TableConfig } from "../../utils/utils";
import { STATUS } from "../../utils/constants";
import permissionsUtil from "../../utils/permissions.util";
import CustomIcon from "../../components/CustomIcon/CustomIcon";

const BrandManagement = props => {
  const { loading, enableDisableBrandList, pagination, deleteAllBrands, getBrandList, dataSource } = props;
  const columns = [
    // {
    //   title: "Id",
    //   dataIndex: "code",
    //   key: "code",
    //   render: (text, record) => <Link to={`${ROUTES.EDIT_BRAND.path}/${record.code}`}>{record.code}</Link>,
    // },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      render: (text, record) => <Link to={`${ROUTES.EDIT_BRAND.path}/${record.code}`}>{record.name}</Link>,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: true,
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
    text: "Add Brand",
    route: ROUTES.ADD_BRAND.path,
  };

  const canAdd = permissionsUtil.checkAuth({
    category: "PartnerManagement",
    subCategory: "Brand",
    action: "Add",
  });

  const canDelete = permissionsUtil.checkAuth({
    category: "PartnerManagement",
    subCategory: "Brand",
    action: "Delete",
  });

  const canChangeStatus = permissionsUtil.checkAuth({
    category: "PartnerManagement",
    subCategory: "Brand",
    action: "EditStatus",
  });

  const onEnable = {
    text: "Enable",
    handler: enableDisableBrandList,
  };

  const onDisable = {
    text: "Disable",
    handler: enableDisableBrandList,
  };

  const getList = async query => {
    await getBrandList(query);
  };

  // useEffect(() => {
  //   // const query = TableConfig("name");
  //   getList();
  // }, []);

  return (
    <>
      <PageTitle title="All Brands" />
      <ListView
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        rowKey="code"
        addButton={addButton}
        deleteAllData={deleteAllBrands}
        pagination={pagination}
        getList={getList}
        enableButton={onEnable}
        disableButton={onDisable}
        canChangeStatus={canChangeStatus}
        canAdd={canAdd}
        canDelete={canDelete}
      ></ListView>
    </>
  );
};

BrandManagement.defaultProps = {
  dataSource: [],
};

BrandManagement.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  enableDisableBrandList: PropTypes.func,
  deleteAllBrands: PropTypes.func,
  getBrandList: PropTypes.func,
};

export default BrandManagement;
