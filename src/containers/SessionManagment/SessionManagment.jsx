/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, Fragment } from "react";
import _filter from "lodash/filter";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { DatePicker, Button, Divider } from "antd";
import ROUTES from "../../routes/constant.route";
import ListView from "../../components/ListView/ListView";
import CapabilityDrawer from "../../components/CapabilityDrawer/CapabilityDrawer";
import "./SessionManagment.scss";
import permissionsUtil from "../../utils/permissions.util";
import { DATE_FORMAT } from "../../utils/constants";

const SessionManagement = props => {
  const { loading, revokeAllSessionUsers, getAllSessionUsers, session, dataSource } = props;
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const [value, setValue] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [capabilityData, setCapabilityData] = useState([]);

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

  const columns = [
    {
      title: "User Type",
      dataIndex: "userType",
      key: "userType",
      filters: [
        { text: "Admin", value: "Admin" },
        { text: "Merchant", value: "Merchant" },
        { text: "Consumer", value: "Consumer" },
      ],
      // onFilter: (value, record) => record.userType.indexOf(value) === 0,
      render: (text, record) => renderLink(record),
    },
    {
      title: "User Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: true,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email Address",
      dataIndex: "emailAddress",
      key: "emailAddress",
      sorter: true,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Timestamp",
      dataIndex: "createdAt",
      key: "Timestamp",
      ...getColumnSearchProps("createdAt"),
    },
    {
      title: "User Agent",
      key: "userAgent",
      dataIndex: "userAgent",
      filters: session.userAgent,
      onFilter: (d, record) => record.userAgent.indexOf(d) === 0,
    },
    {
      title: "Capability",
      key: "userId",
      dataIndex: "userId",
      render: text => (
        <span>
          <a onClick={() => showDrawer(text)}>Capability</a>
        </span>
      ),
    },
  ];

  const showDrawer = text => {
    const filteredRecordBySpecificUser = _filter(session.content, { userId: text });
    const convertingTo2dArray = Object.entries(filteredRecordBySpecificUser[0].capabilities);
    const convertingToJson = convertingTo2dArray.map(x => ({
      category: x[0],
      status: x[1],
    }));
    setCapabilityData(convertingToJson);
    setDrawerVisibility(true);
  };

  const renderLink = record => {
    let str = "";
    switch (record.userType.toLowerCase()) {
      case "merchant":
        str = ROUTES.EDIT_MERCHANT_USER.path;
        break;
      case "admin":
        str = ROUTES.EDIT_ADMIN_USER.path;
        break;
      case "consumers":
        str = ROUTES.EDIT_CONSUMER_USER.path;
        break;
      default:
        break;
    }

    return <Link to={`${str}/${record.userId}`}>{record.userType}</Link>;
  };

  const getList = async query => {
    await getAllSessionUsers(query);
  };

  useEffect(() => {
    getList();
  }, []);

  const onClose = () => {
    setDrawerVisibility(false);
  };

  const onRevoke = {
    text: "Revoke Session",
    type: "primary",
    handler: ids => revokeAllSessionUsers(ids),
  };

  const onReject = {
    text: "Reject",
    handler: selectedItems => revokeAllSessionUsers(selectedItems),
  };

  const canChangeStatus = permissionsUtil.checkAuth({
    category: "UserManagement",
    subCategory: "Session",
    action: "EditStatus",
  });

  return (
    <Fragment>
      <Divider orientation="left" className="form-divider first">
        All Logged In Sessions
      </Divider>
      <ListView
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        rowKey="userId"
        listData={session}
        getList={getList}
        enableButton={onRevoke}
        disableButton={onReject}
        canChangeStatus={canChangeStatus}
      />
      <CapabilityDrawer dataSource={capabilityData} rowKey="userId" visibility={drawerVisibility} onClose={onClose} />
    </Fragment>
  );
};

SessionManagement.defaultProps = {
  dataSource: [],
};

SessionManagement.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  session: PropTypes.object,
  getAllSessionUsers: PropTypes.func,
  revokeAllSessionUsers: PropTypes.func,
};

export default SessionManagement;
