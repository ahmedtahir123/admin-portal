import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as moment from "dayjs";
import ROUTES from "../../routes/constant.route";
import ListView from "../../components/ListView/ListView";
import permissionsUtil from "../../utils/permissions.util";
import PageTitle from "../../components/PageTitle/PageTitle";
import { DATE_FORMAT, DATE_FORMAT_TIME } from "../../utils/constants";

const BookSubscriptionManagement = props => {
  const {
    loading,
    deleteBookSubscriptions,
    getBookSubscriptionsList,
    bookSubscription,
    dataSource,
    enableDisableBookSubscription,
    authorize,
  } = props;
  const columns = [
    {
      title: "Order Number",
      dataIndex: "orderCode",
      key: "orderCode",
      render: (text, record) => (
        <Link to={`${ROUTES.EDIT_BOOK_SUBSCRIPTION.path}/${record.id}`}>{record.orderCode}</Link>
      ),
    },
    {
      title: "Customer Name",
      dataIndex: "clientName",
      key: "clientName",
    },
    {
      title: "Request Time",
      dataIndex: "requestTime",
      key: "requestTime",
      render: requestTime => moment(requestTime).format(DATE_FORMAT_TIME),
    },
    {
      title: "Book Title",
      dataIndex: "bookTitle",
      key: "bookTitle",
    },
    {
      title: "Book Price",
      dataIndex: "bookPrice",
      key: "bookPrice",
    },
    {
      title: "No of Employees",
      dataIndex: "numberOfEmployees",
      key: "numberOfEmployees",
    },
    {
      title: "Total Subscription Cost",
      dataIndex: "totalSubscriptionCost",
      key: "totalSubscriptionCost",
    },
    {
      title: "Status",
      dataIndex: "authorizationStatus",
      key: "authorizationStatus",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: startDate => moment(startDate).format(DATE_FORMAT),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: endDate => moment(endDate).format(DATE_FORMAT),
    },
  ];
  const addButton = {
    text: "Add Subscription",
    route: ROUTES.ADD_BOOK_SUBSCRIPTION.path,
  };

  const onAuth = {
    text: "Authorize",
    handler: authorize,
  };
  // const onDisable = {
  //   text: "Disable",
  //   handler: enableDisableBookSubscription,
  // };

  const getList = async query => {
    await getBookSubscriptionsList(query);
  };
  // const authroizeSubscriptions = async () => authorize(selectedRows);

  const canAdd = permissionsUtil.checkAuth({
    category: "BookSubscriptionManagement",
    subCategory: "BookSubscription",
    action: "Add",
  });

  const canDelete = permissionsUtil.checkAuth({
    category: "BookSubscriptionManagement",
    subCategory: "BookSubscription",
    action: "Delete",
  });

  const canChangeStatus = permissionsUtil.checkAuth({
    category: "BookSubscriptionManagement",
    subCategory: "BookSubscription",
    action: "EditStatus",
  });

  // useEffect(() => {
  //   getList();
  // }, []);

  return (
    <>
      <PageTitle title="All Book Subscriptions" />
      <ListView
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        rowKey="id"
        addButton={addButton}
        pagination={bookSubscription}
        deleteAllData={deleteBookSubscriptions}
        getList={getList}
        enableButton={onAuth}
        // disableButton={onDisable}
        canChangeStatus={canChangeStatus}
        canAdd={canAdd}
        canDelete={canDelete}
      ></ListView>
      {/* <Row className="fields-row mg-top-15" justify="end" gutter={30}>
        <Col span={6} xs={24} sm={6} lg={6} className="text-right">
          <Button disabled={selectedRows.length <= 0} onClick={authroizeSubscriptions} type="primary">
            Authorize
          </Button>
        </Col>
      </Row> */}
    </>
  );
};

BookSubscriptionManagement.defaultProps = {
  dataSource: [],
};

BookSubscriptionManagement.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  bookSubscription: PropTypes.object,
  deleteBookSubscriptions: PropTypes.func,
  getBookSubscriptionsList: PropTypes.func,
  enableDisableBookSubscription: PropTypes.func,
  authorize: PropTypes.func,
};

export default BookSubscriptionManagement;
