import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Input, Button, Radio, Row, Col, Divider, Select, DatePicker, Spin, Popconfirm } from "antd";
import _isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import * as moment from "dayjs";
import _get from "lodash/get";
import _map from "lodash/map";
import "./AddEditBookSubscription.scss";
import "../../styles/_helpers.scss";
import {
  STATUS,
  VALIDATE_FORM_MESSAGES_TEMPLATE,
  CONFIRM_MESSAGE,
  DATE_FORMAT_TIME,
  bookLocationList,
} from "../../utils/constants";
import PageTitle from "../../components/PageTitle/PageTitle";
import permissionsUtil from "../../utils/permissions.util";
import ROUTES from "../../routes/constant.route";
import { StatusRadioButtons } from "../../components/StatusRadioButtons/StatusRadioButtons";
import { numberOnly } from "../../utils/utils";
const { RangePicker } = DatePicker;

const AddEditBookSubscription = ({
  printCSV,
  regenerateCode,
  getBookSubscription,
  addBookSubscription,
  updateBookSubscription,
  bookSubscription,
  loading,
  deleteBookSubscription,
  resetBooks,
  getBooks,
  books,
  getCustomers,
  customers,
  history,
  location,
  print,
}) => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const editMode = !!id;
  const bookArr = books.length ? books : [];
  const customerArr = customers.length ? customers : [];
  const statusRadioButtonProps = {
    currentStatus: [
      { code: STATUS.AUTHORIZED, name: "Authorized" },
      { code: STATUS.UNAUTHORIZED, name: "Un-Authorized" },
    ],
    defaultValue: editMode ? STATUS[bookSubscription.authorizationStatus] : STATUS.UNAUTHORIZED,
  };
  const canDelete = permissionsUtil.checkAuth({
    category: "PartnerManagement",
    subCategory: "Partner",
    action: "EditDelete",
  });
  let loc;
  const isAuthroized = bookSubscription.authorizationStatus === STATUS.AUTHORIZED;

  useEffect(() => {
    // getLocations();
  }, []);

  useEffect(() => {
    if (editMode) {
      getBookSubscription(id);
    } else {
      resetBooks();
    }
    getCustomers();
  }, [id]);

  useEffect(() => {
    if (!_isEmpty(bookSubscription) && !loading && location && editMode) {
      // loc = location.find(d => d.code === bookSubscription.locationCode);
      getBooks(bookSubscription.locationCode).then(() => {
        const { bookCode, customerId, startDate, endDate } = bookSubscription;
        const start = moment(startDate);
        const end = moment(endDate);
        const period = [start, end];
        // form.setFieldsValue({ bookCode });
        form.setFieldsValue({ bookCode });
        form.setFieldsValue({ customerId });
        form.setFieldsValue({ period });
      });
      setFormValues();
    }
  }, [bookSubscription, loading]);

  useEffect(() => {
    if (form) {
      form.resetFields();
      window.scrollTo(0, 0);
    }
  }, [form]);

  // useEffect(
  //   () => () => {
  //     resetBooks();
  //   },
  //   [resetBooks],
  // );

  const onFormFinish = fieldsValue => {
    const book = books.find(d => d.code === fieldsValue.bookCode);
    const customer = customers.find(d => d.code === fieldsValue.customerId);
    const values = {
      ...fieldsValue,
      bookName: book.title,
      bookPrice: book.price,
      clientName: customer.name,
      startDate: moment(fieldsValue.period[0]).valueOf(),
      endDate: moment(fieldsValue.period[0]).valueOf(),
    };
    delete values.period;
    if (editMode) {
      updateBookSubscription({ ...bookSubscription, ...values }).then(() => history.goBack());
    } else {
      addBookSubscription(values).then(() => history.goBack());
    }
  };
  const onLocationChange = code => {
    const bookCode = "";
    form.setFieldsValue({ bookCode });
    getBooks(code);
  };
  const onBookChange = code => {
    const bookObj = bookArr.find(d => d.code === code);
    const startDate = moment(bookObj.startDate);
    const endDate = moment(bookObj.endDate);
    const period = [startDate, endDate];
    const customerId = bookObj.organizationCode;
    if (customerId) form.setFieldsValue({ customerId });
    form.setFieldsValue({ period });
  };

  const setFormValues = () => {
    form.setFieldsValue({
      id: bookSubscription.id,
      noOfEmployees: bookSubscription.noOfEmployees,
      totalAmount: bookSubscription.totalAmount,
      locationCode: bookSubscription.locationCode,
      authorizationStatus: bookSubscription.authorizationStatus,
      orderCode: bookSubscription.orderCode,
    });
  };

  const _deleteSubscription = async () => {
    try {
      await deleteBookSubscription(id);
      history.push(ROUTES.BOOK_SUBSCRIPTION_MANAGEMENT.path);
    } catch (error) {
      console.log("_deleteSubscription -> error", error);
    }
  };

  const createdAt = _get(bookSubscription, "createdAt", "")
    ? moment(bookSubscription.createdAt).format(DATE_FORMAT_TIME)
    : "";
  const updatedAt = _get(bookSubscription, "updatedAt", "")
    ? moment(bookSubscription.updatedAt).format(DATE_FORMAT_TIME)
    : "";

  return (
    <>
      {loading ? (
        <div className="edit-form__spin">
          <Spin size="large" tip="Loading ..." />
        </div>
      ) : null}

      <PageTitle title={editMode ? "Edit Book Subscription" : "Add Book Subscription"} />
      <Form
        className="BookSubscription"
        form={form}
        initialValues={{ authorizationStatus: statusRadioButtonProps.defaultValue }}
        layout="vertical"
        name="nest-messages"
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={50} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            {editMode ? (
              <Form.Item label="Book Subscription Code" name="id">
                <Input readOnly placeholder="Book Subscription Code" />
              </Form.Item>
            ) : null}
            <Form.Item label="Order Number" name="orderCode">
              <Input readOnly placeholder="Order Number" />
            </Form.Item>

            <Form.Item label="Corporate Customer" name="customerId" rules={[{ required: true }]}>
              <Select
                showSearch
                placeholder="Select Customer"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                disabled={editMode && isAuthroized}
              >
                {_map(customerArr, customer => (
                  <Select.Option key={customer.code} value={customer.code}>
                    {customer.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Number of Employees" name="noOfEmployees" rules={[{ required: true }, numberOnly]}>
              <Input disabled={editMode && isAuthroized} placeholder="Number of Employees" />
            </Form.Item>

            <Form.Item label="Start Date and End Date" name="period">
              <RangePicker allowEmpty={[true, true]} disabled format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="Current Status" className="text-left" name="authorizationStatus">
              <StatusRadioButtons
                currentStatus={statusRadioButtonProps.currentStatus}
                defaultValue={statusRadioButtonProps.defaultValue}
              />
            </Form.Item>

            <Form.Item label="Book Location" name="locationCode" rules={[{ required: true }]}>
              <Select disabled={editMode && isAuthroized} placeholder="Select Location" onChange={onLocationChange}>
                {_map(location, city => (
                  <Select.Option key={city.code} value={city.code}>
                    {city.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Book Name" name="bookCode" rules={[{ required: true }]}>
              <Select
                onChange={onBookChange}
                disabled={editMode && isAuthroized}
                showSearch
                placeholder="Select Book"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {_map(bookArr, book => (
                  <Select.Option key={book.code} value={book.code}>
                    {book.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Total Subscription Cost" name="totalAmount" rules={[{ required: true }, numberOnly]}>
              <Input placeholder="Total Subscription Cost" />
            </Form.Item>

            <Form.Item className="mg-top-40 text-right">
              <Button
                className="mg-right-20"
                onClick={() => regenerateCode(id)}
                disabled={!editMode || !isAuthroized}
                type="primary"
              >
                Regenerate Code
              </Button>
              <Button onClick={() => print(id)} disabled={!editMode || !isAuthroized} type="primary">
                Get Subscription Codes
              </Button>
              <Button
                className="mg-top-20"
                onClick={() => printCSV(id)}
                disabled={!editMode || !isAuthroized}
                type="primary"
              >
                Print CSV
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        {editMode ? (
          <Row className="fields-row" gutter={20}>
            <Col span={8} xs={24} sm={12} lg={12}>
              Created By: {_get(bookSubscription, "createdBy", "")}
              <br />
              Created At: {createdAt}
              <br />
              Last Modify By: {_get(bookSubscription, "updatedBy", "")}
              <br />
              Last Modify At: {updatedAt}
            </Col>
            <Col span={8} xs={24} sm={12} lg={12}>
              <Row className="fields-row" gutter={20} type="flex">
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  {canDelete ? (
                    <Form.Item>
                      <Popconfirm
                        title={CONFIRM_MESSAGE.DELETE}
                        onConfirm={_deleteSubscription}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No"
                        disabled
                      >
                        <Button type="danger" disabled>
                          Delete
                        </Button>
                      </Popconfirm>
                    </Form.Item>
                  ) : null}
                </Col>
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  <Form.Item>
                    <Button type="info" onClick={() => history.goBack()}>
                      Cancel
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Save
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <Row className="fields-row" justify="end" type="flex">
            <Col>
              <Link to="/partner-management">
                <Button className="action-btn mg-right-50" type="info" onClick={() => history.goBack()}>
                  Cancel
                </Button>
              </Link>
              <Button className="action-btn" type="primary" htmlType="submit" loading={loading}>
                Create
              </Button>
            </Col>
          </Row>
        )}
      </Form>
    </>
  );
};

AddEditBookSubscription.propTypes = {
  addBookSubscription: PropTypes.func,
  getBookSubscription: PropTypes.func,
  updateBookSubscription: PropTypes.func,
  bookSubscription: PropTypes.object,
  loading: PropTypes.bool,
  deleteBookSubscription: PropTypes.func,
  resetBooks: PropTypes.func,
  getBooks: PropTypes.func,
  books: PropTypes.array,
  getCustomers: PropTypes.func,
  customers: PropTypes.array,
  history: PropTypes.object,
  printCSV: PropTypes.func,
  regenerateCode: PropTypes.func,
  print: PropTypes.func,
  location: PropTypes.object,
};

export default AddEditBookSubscription;
