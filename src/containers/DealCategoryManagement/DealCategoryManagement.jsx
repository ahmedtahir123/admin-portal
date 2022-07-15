import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ROUTES from "../../routes/constant.route";
import permissionsUtil from "../../utils/permissions.util";
import ListView from "../../components/ListView/ListView";
import { STATUS } from "../../utils/constants";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomIcon from "../../components/CustomIcon/CustomIcon";

const columns = [
  // {
  //   title: "Code",
  //   dataIndex: "code",
  //   key: "code",
  //   render: (text, record) => <Link to={`${ROUTES.EDIT_CATEGORY.path}/${record.code}`}>{record.code}</Link>,
  // },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: true,
    render: (text, record) => <Link to={`${ROUTES.EDIT_CATEGORY.path}/${record.code}`}>{record.name}</Link>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: "50%",
    // sorter: true,
  },
  {
    title: "Is Enabled",
    dataIndex: "enabled",
    key: "enabled",
    align: "center",
    render: d => (d ? <CustomIcon name="CheckCircleTwoTone" /> : <CustomIcon name="CloseCircleTwoTone" />),
  },
];

function DealCategoryManagement({
  list,
  loading,
  dealCategories,
  enableDisableDealCategories,
  getDealCategoriesList,
  deleteDealCategories,
  pagination,
}) {
  const addButton = {
    text: "Add Deal Category",
    route: ROUTES.ADD_CATEGORY.path,
  };

  const canAdd = permissionsUtil.checkAuth({
    category: "VoucherManagement",
    subCategory: "Category",
    action: "Add",
  });

  const canDelete = permissionsUtil.checkAuth({
    category: "VoucherManagement",
    subCategory: "Category",
    action: "Delete",
  });

  const canChangeStatus = permissionsUtil.checkAuth({
    category: "VoucherManagement",
    subCategory: "Category",
    action: "EditStatus",
  });

  const onEnable = {
    text: "Enable",
    handler: enableDisableDealCategories,
  };
  const onDisable = {
    text: "Disable",
    handler: enableDisableDealCategories,
  };

  const getCategories = async query => {
    await getDealCategoriesList(query);
  };

  // useEffect(() => {
  //   getCategories();
  // }, []);

  return (
    <>
      <PageTitle title="All Deal Categories" />

      <ListView
        dataSource={list}
        columns={columns}
        loading={loading}
        rowKey="code"
        addButton={addButton}
        listData={dealCategories}
        deleteAllData={deleteDealCategories}
        getList={getCategories}
        enableButton={onEnable}
        disableButton={onDisable}
        canChangeStatus={canChangeStatus}
        canAdd={canAdd}
        canDelete={canDelete}
        pagination={pagination}
      />
    </>
  );
}

DealCategoryManagement.propTypes = {
  getDealCategoriesList: PropTypes.func,
  enableDisableDealCategories: PropTypes.func,
  dealCategories: PropTypes.object,
  list: PropTypes.array,
  deleteDealCategories: PropTypes.func,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
};

export default DealCategoryManagement;
