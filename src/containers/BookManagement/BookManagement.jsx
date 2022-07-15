import * as moment from "dayjs";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ListView from "../../components/ListView/ListView";
import ROUTES from "../../routes/constant.route";
import { STATUS, DATE_FORMAT_TIME } from "../../utils/constants";
import permissionsUtil from "../../utils/permissions.util";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomIcon from "../../components/CustomIcon/CustomIcon";

const BookManagement = props => {
  const { loading, enableDisableBooks, deleteAllBooks, getBooksList, list, pagination } = props;
  const columns = [
    // {
    //   title: "Code",
    //   dataIndex: "code",
    //   key: "code",
    // render: (text, record) => <Link to={`${ROUTES.EDIT_BOOK.path}/${record.code}`}>{record.code}</Link>,
    // },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => <Link to={`${ROUTES.EDIT_BOOK.path}/${record.code}`}>{record.title}</Link>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Location",
      dataIndex: "cityCode",
      key: "locationName",
      render: city => city.toUpperCase() || "N/A",
    },
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
    },
    {
      title: "Expiry Timestamp",
      dataIndex: "endDate",
      key: "expiryTimeStamp",
      render: date => moment(date).format(DATE_FORMAT_TIME),
    },
    {
      title: "Is Enabled",
      dataIndex: "enabled",
      key: "enabled",
      align: "center",
      render: d => (d ? <CustomIcon name="CheckCircleTwoTone" /> : <CustomIcon name="CloseCircleTwoTone" />),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const addButton = {
    text: "Add Book",
    route: ROUTES.ADD_BOOK.path,
  };
  const canAdd = permissionsUtil.checkAuth({
    category: "VoucherManagement",
    subCategory: "Book",
    action: "Add",
  });

  const canDelete = permissionsUtil.checkAuth({
    category: "VoucherManagement",
    subCategory: "Book",
    action: "Delete",
  });

  const canChangeStatus = permissionsUtil.checkAuth({
    category: "VoucherManagement",
    subCategory: "Book",
    action: "EditStatus",
  });

  const onEnable = {
    text: "Enable",
    handler: enableDisableBooks,
  };

  const onDisable = {
    text: "Disable",
    handler: enableDisableBooks,
  };

  const getList = async query => {
    await getBooksList(query);
  };

  // useEffect(() => {
  //   getList();
  // }, []);

  return (
    <>
      <PageTitle title="All Books" />

      <ListView
        dataSource={list}
        columns={columns}
        loading={loading}
        rowKey="code"
        addButton={addButton}
        deleteAllData={deleteAllBooks}
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

BookManagement.defaultProps = {
  list: [],
};

BookManagement.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool,
  enableDisableBooks: PropTypes.func,
  deleteAllBooks: PropTypes.func,
  getBooksList: PropTypes.func,
  pagination: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default BookManagement;
