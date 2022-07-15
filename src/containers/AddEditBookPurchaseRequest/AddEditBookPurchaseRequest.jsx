import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Form, Input, Button, Row, Select, Col, Radio, Divider, Spin, DatePicker, Popconfirm } from "antd";
import PropTypes from "prop-types";
import _isEmpty from "lodash/isEmpty";
import * as moment from "dayjs";
import _get from "lodash/get";
import _map from "lodash/map";
import { STATUS, VALIDATE_FORM_MESSAGES_TEMPLATE, CONFIRM_MESSAGE, DATE_FORMAT_TIME } from "../../utils/constants";
import BrandLogo from "../../images/listing-card.svg";
import { StatusRadioButtons } from "../../components/StatusRadioButtons/StatusRadioButtons";
import ROUTES from "../../routes/constant.route";
import PageTitle from "../../components/PageTitle/PageTitle";
import { numberOnly } from "../../utils/utils";
const { Option } = Select;

const BookPurchaseRequestContainer = ({
  regenerateCode,
  deleteBookOrders,
  loading,
  selected,
  getConsumerById,
  consumerList,
  getBooks,
  books,
  paymentStatus,
  getBookOrdersById,
  updateBookOrdersById,
  addBookOrder,
  history,
  getBookById,
  book,
  getAllConsumers,
  consumer,
  deliveryStatus,
  resetConsumer,
  reject,
  sendEmail,
  print,
  resetBook,
  printCSV,
  bookLocationList,
  resetBooks,
  // getLocations,
}) => {
  const [downloadPercent, setDownloadPercent] = useState(null);
  const [form] = Form.useForm();
  const bookArr = books && books.length ? books : [];
  const consumerArr = consumer && consumer.length ? consumer : [];
  const addressObj = _get(consumerList, "address", {}) || {};
  const AddressArr = Object.keys(addressObj).map(d => addressObj[d]);
  const { id } = useParams();
  const editMode = !!id;
  const isAuthorized = selected.authorizationStatus === STATUS.AUTHORIZED;
  const showDeliveryStart =
    (selected.shippingStatus === STATUS.PENDING || selected.shippingStatus === STATUS.FAILED) &&
    isAuthorized &&
    selected.orderStatus === STATUS.PENDING;
  const showDeliveryCompleted =
    selected.orderStatus === STATUS.PENDING &&
    (selected.shippingStatus === STATUS.PENDING || selected.shippingStatus === STATUS.IN_DELIVERY) &&
    isAuthorized;
  const showPaymentPaid = selected.paymentStatus === STATUS.UNPAID && selected.orderStatus === STATUS.PENDING;
  const showReject = selected.orderStatus === STATUS.PENDING;
  const showAddressFields =
    (selected.shippingStatus === STATUS.PENDING || selected.shippingStatus === STATUS.FAILED) &&
    selected.orderStatus === STATUS.PENDING;

  useEffect(() => {
    if (form) {
      form.resetFields();
    }
    window.scrollTo(0, 0);
    // getLocations();
  }, [form]);

  useEffect(() => {
    if (id) {
      fetchBookDetail(id);
    } else {
      resetConsumer();
      onLocationChange();
      resetBook();
      resetBooks();
    }
    const query = { page: 0, size: 500 };
    getAllConsumers(query);
  }, [id]);

  const getProgress = ({ loaded, total }) => {
    const progress = Math.floor((loaded / total) * 100);
    if (progress !== 100) {
      setDownloadPercent(progress);
      return;
    }
    setDownloadPercent(null);
  };

  const statusAuthorization = {
    currentStatus: [
      { code: STATUS.AUTHORIZED, name: "Authorized" },
      { code: STATUS.UNAUTHORIZED, name: "Un-Authorized" },
    ],
    defaultValue: editMode ? STATUS[selected.authorizationStatus] : STATUS.UNAUTHORIZED,
  };

  const orderStatus = {
    currentStatus: [
      { code: STATUS.PENDING, name: "Pending" },
      { code: STATUS.COMPLETED, name: "Completed" },
      { code: STATUS.REJECTED, name: "Rejected" },
    ],
    defaultValue: editMode ? STATUS[selected.orderStatus] : STATUS.PENDING,
  };

  const shippingStatus = {
    currentStatus: [
      { code: STATUS.PENDING, name: "Pending" },
      { code: STATUS.IN_DELIVERY, name: "In-Delivery" },
      { code: STATUS.FAILED, name: "Failed" },
      { code: STATUS.DELIVERED, name: "Delivered" },
    ],
    defaultValue: editMode ? STATUS[selected.shippingStatus] : STATUS.PENDING,
  };

  const statusPayment = {
    currentStatus: [
      { code: STATUS.PAID, name: "Paid" },
      { code: STATUS.UNPAID, name: "Unpaid" },
    ],
    defaultValue: editMode ? STATUS[selected.paymentStatus] : STATUS.UNPAID,
  };

  const deliverystatus = info => {
    deliveryStatus(id, info);
  };

  useEffect(() => {
    if (!_isEmpty(selected) && !loading && editMode) {
      setFormValues();
      getConsumerById(selected.userId);
      getBooks(selected.bookLocation);
    }
  }, [selected, loading]);

  useEffect(() => {
    if (bookLocationList.length) {
      const loc = bookLocationList.find(d => d.code === book.cityCode);
      form.setFieldsValue({ bookCode: book.code });
      form.setFieldsValue({ bookName: book.title });
      form.setFieldsValue({ bookLocation: loc ? loc.name : null });
      form.setFieldsValue({ bookPrice: book.price });
    }
  }, [book, bookLocationList]);

  useEffect(() => {
    if (consumerList) {
      form.setFieldsValue({ userId: consumerList.userId });
      form.setFieldsValue({ userName: consumerList.firstName });
      form.setFieldsValue({ consumerFullName: consumerList.fullName || consumerList.firstName });
      form.setFieldsValue({ consumerEmailAddress: consumerList.emailAddress });
      form.setFieldsValue({ phone: consumerList.cellPhoneNumber });
    }
  }, [consumerList]);

  const onBookChange = code => {
    const bookObj = bookArr.find(d => d.code === code);
    getBookById(bookObj.code);
  };
  const fetchBookDetail = async bookOrdersId => {
    await getBookOrdersById(bookOrdersId);
  };
  // let loc;
  const setFormValues = () => {
    const loc = bookLocationList.find(d => d.code === selected.bookLocation);
    form.setFieldsValue({
      id: selected.id,
      bookCode: selected.bookCode,
      authorizationStatus: selected.authorizationStatus,
      shippingAddress: selected.shippingAddress,
      requestTimeStamp: selected.requestTimeStamp ? moment(selected.requestTimeStamp) : moment(),
      bookName: selected.bookName,
      bookLocation: loc.name,
      bookPrice: selected.bookPrice,
      userId: selected.userId,
      consumerCellNumber: selected.phone,
      billingAddress: selected.billingAddress,
      consumerFullName: selected.userName,
      orderStatus: selected.orderStatus,
      paymentStatus: selected.paymentStatus,
      location: loc.code,
      book: selected.bookName,
      rejectionReason: selected.rejectionReason,
      activationCodes: selected.activationCodes ? selected.activationCodes.join(" ") : null,
      consumerEmailAddress: selected.userEmailAddress,
    });
  };

  const paymentstatus = info => {
    paymentStatus(id, info);
  };
  const _reject = () => {
    reject(id, form.getFieldValue("rejectionReason"));
  };
  const onChangeConsumer = userId => {
    if (form.getFieldValue("addressOption1")) form.setFieldsValue({ addressOption1: "" });
    if (form.getFieldValue("addressOption2")) form.setFieldsValue({ addressOption2: "" });
    if (form.getFieldValue("billingAddress")) form.setFieldsValue({ billingAddress: "" });
    if (form.getFieldValue("shippingAddress")) form.setFieldsValue({ shippingAddress: "" });
    getConsumerById(userId);
  };

  const onLocationChange = code => {
    form.setFieldsValue({ book: "" });
    form.setFieldsValue({ bookCode: "" });
    form.setFieldsValue({ bookName: "" });
    form.setFieldsValue({ bookLocation: "" });
    form.setFieldsValue({ bookPrice: "" });
    if (code) getBooks(code);
  };

  const onBillingAddressChange = value => {
    const addr = AddressArr.find(d => d.addressName === value);
    const billingAddress = addr ? concatAddress(addr) : null;
    form.setFieldsValue({ billingAddress });
  };
  const onShippingAddressChange = value => {
    const addr = AddressArr.find(d => d.addressName === value);
    const shippingAddress = addr ? concatAddress(addr) : null;
    form.setFieldsValue({ shippingAddress });
  };
  const concatAddress = address =>
    `${_get(address, "building", "") || ""}, ${_get(address, "street", "") || ""} ${_get(address, "area", "") ||
      ""}, ${_get(address, "city", "") || ""} ${_get(address, "province", "") || ""}`;

  const onFormFinish = fieldsValue => {
    console.log("form values ===", fieldsValue);
    const tempData = { ...fieldsValue };
    const loc = bookLocationList.find(d => d.code === tempData.location);
    const values = {
      id: tempData.id,
      bookCode: tempData.bookCode,
      bookLocation: loc.code,
      bookName: tempData.bookName,
      bookPrice: tempData.bookPrice,
      phone: tempData.phone,
      shippingAddress: tempData.shippingAddress,
      billingAddress: tempData.billingAddress,
      userId: tempData.userId,
      userName: tempData.consumerFullName,
      userEmailAddress: tempData.consumerEmailAddress,
      paymentOptionMode: "COD",
      quantity: 1,
      requestTimeStamp: moment(fieldsValue.requestTimeStamp).valueOf(),
      // };
    };
    // else {
    //   values = {
    //     bookCode: tempData.bookCode,
    //     bookLocation: tempData.bookLocation,
    //     bookName: tempData.bookName,
    //     bookPrice: tempData.bookPrice,
    //     phone: tempData.phone,
    //     shippingAddress: tempData.shippingAddress,
    //     billingAddress: tempData.shippingAddress,
    //     userId: tempData.userId,
    //     userName: tempData.userName,
    //     paymentOptionMode: "COD",
    //     quantity: 1,
    //     requestedTimeStamp: moment(fieldsValue.requestTimeStamp).valueOf(),
    //   };
    // }

    try {
      if (id) {
        updateBookOrdersById({ ...selected, ...values }, getProgress).then(() => history.goBack());
      } else {
        addBookOrder(values, getProgress).then(() => history.goBack());
      }
    } catch (error) {
      console.log("Error", error);
    }
    // if (editMode) {
    //   updateBookOrdersById(id, values);
    // } else {
    //   addBookOrder(values);
    // }
  };

  const initialValues = {
    status: STATUS.NON_VERIFIED,
    orderStatus: orderStatus.defaultValue,
    paymentStatus: statusPayment.defaultValue,
    shippingStatus: shippingStatus.defaultValue,
    authorizationStatus: statusAuthorization.defaultValue,
    rejectionReason: "",
  };
  const createdAt = _get(selected, "createdAt", "") ? moment(selected.createdAt).format(DATE_FORMAT_TIME) : "";
  const updatedAt = _get(selected, "updatedAt", "") ? moment(selected.updatedAt).format(DATE_FORMAT_TIME) : "";
  return (
    <>
      {loading ? (
        <div className="edit-form__spin">
          <Spin size="large" tip="Loading ..." />
        </div>
      ) : null}

      <PageTitle title={editMode ? "Edit Book Purchase" : "Add Book Purchase"} />
      <Form
        form={form}
        className="AddEditBookPurchaseRequest"
        layout="vertical"
        name="nest-messages"
        initialValues={initialValues}
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            {editMode ? (
              <Form.Item label="Book Purchase Request Code" name="id">
                <Input readOnly placeholder="Book Purchase Request Code" />
              </Form.Item>
            ) : null}
            <Form.Item
              label="Request Timestamp"
              name="requestTimeStamp"
              rules={[
                {
                  type: "object",
                  required: !editMode,
                  message: "Please select time!",
                },
              ]}
            >
              <DatePicker disabled={editMode} showTime format={DATE_FORMAT_TIME} />
            </Form.Item>
            <Form.Item className="text-left" label="Authorization Status" name="authorizationStatus">
              <StatusRadioButtons
                currentStatus={statusAuthorization.currentStatus}
                defaultValue={statusAuthorization.defaultValue}
              />
            </Form.Item>

            <Form.Item label="Payment Status" name="paymentStatus">
              <StatusRadioButtons
                currentStatus={statusPayment.currentStatus}
                defaultValue={statusPayment.defaultValue}
              />
            </Form.Item>
            <Form.Item label="Order Status" name="orderStatus">
              <StatusRadioButtons currentStatus={orderStatus.currentStatus} defaultValue={orderStatus.defaultValue} />
            </Form.Item>
            <Form.Item label="Shipping Status" name="shippingStatus">
              <StatusRadioButtons
                currentStatus={shippingStatus.currentStatus}
                defaultValue={shippingStatus.defaultValue}
              />
            </Form.Item>
            <Form.Item label="Location" name="location" rules={[{ required: true }]}>
              <Select
                placeholder="Select Location"
                disabled={editMode && isAuthorized}
                className="location-select"
                onChange={onLocationChange}
              >
                {_map(bookLocationList, location => (
                  <Select.Option key={location.code} value={location.code}>
                    {location.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Book" name="bookCode" rules={[{ required: true }]}>
              <Select
                onChange={onBookChange}
                showSearch
                className="book-select"
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                disabled={editMode && isAuthorized}
                placeholder="Select Book"
              >
                {_map(bookArr, bookLocation => (
                  <Option key={bookLocation.code} value={bookLocation.code}>
                    {bookLocation.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item>
              <div className="text-center">
                <div className="bg-gray">
                  <img src={book.bannerImageUrl || BrandLogo} alt="avatar" width={250} />
                </div>
              </div>
            </Form.Item>
            <Form.Item label="Book Code" name="bookCode">
              <Input readOnly placeholder="Book Code" />
            </Form.Item>

            <Form.Item label="Book Name" name="bookName">
              <Input readOnly placeholder="Name" />
            </Form.Item>

            <Form.Item label="Location" name="bookLocation">
              <Input readOnly placeholder="Location" />
            </Form.Item>
            <Form.Item label="Price" name="bookPrice">
              <Input readOnly placeholder="Price" />
            </Form.Item>
          </Col>
        </Row>
        <Divider />

        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="Search Consumer" name="userId">
              <Select
                disabled={editMode && isAuthorized}
                showSearch
                placeholder="Consumer Name"
                onChange={onChangeConsumer}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {_map(consumerArr, consumerr => (
                  <Option key={consumerr.userId} value={consumerr.userId}>
                    {consumerr.fullName || consumerr.firstName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Consumer Id" name="userId">
              <Input placeholder="Consumer Id" disabled />
            </Form.Item>
            <Form.Item label="Consumer Full Name" name="consumerFullName">
              <Input placeholder="Consumer Full Name" disabled />
            </Form.Item>
            <Form.Item label="Consumer Email Address" name="consumerEmailAddress">
              <Input placeholder="Consumer Email Address" disabled />
            </Form.Item>
            <Form.Item label="Consumer Cell Number" name="phone" rules={[{ required: true, max: 20 }, numberOnly]}>
              <Input placeholder="Consumer Cell Number" disabled />
            </Form.Item>
            <Form.Item label="Select Billing Address" name="addressOption1">
              <Select
                disabled={editMode && !showAddressFields}
                showSearch
                placeholder="Select Address"
                onChange={onBillingAddressChange}
              >
                {_map(AddressArr, address => (
                  <Option key={`${address.addressName}-billing`} value={address.addressName}>
                    {address.addressName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Billing Full Address" name="billingAddress" rules={[{ required: true }]}>
              <Input disabled={editMode && !showAddressFields} placeholder="Billing Full Address" />
            </Form.Item>
            <Form.Item label="Select Shipping Address" name="addressOption2">
              <Select
                disabled={editMode && !showAddressFields}
                showSearch
                placeholder="Select Address"
                onChange={onShippingAddressChange}
              >
                {_map(AddressArr, address => (
                  <Option key={`${address.addressName}-shipping`} value={address.addressName}>
                    {address.addressName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Shipping Full Address" name="shippingAddress" rules={[{ required: true }]}>
              <Input disabled={editMode && !showAddressFields} placeholder="Shipping Address" />
            </Form.Item>
            <Form.Item label="Book Activation Code" name="activationCodes">
              <Input placeholder="Book Activation Code" className="mg-bottom-10" disabled />
            </Form.Item>
            <Row type="flex" justify="end" gutter={10}>
              <Col className="text-right" span={24} xs={24} sm={24} lg={24}>
                <Button
                  className="mg-top-10 mg-left-10"
                  onClick={() => regenerateCode(id)}
                  disabled={!editMode || !isAuthorized}
                  type="primary"
                >
                  Regenerate Code
                </Button>
                <Button
                  onClick={() => print(id)}
                  disabled={!editMode || !isAuthorized}
                  type="primary"
                  className="mg-left-10 mg-top-10"
                >
                  Print
                </Button>
                <Button
                  onClick={() => sendEmail(id)}
                  disabled={!editMode || !isAuthorized}
                  type="primary"
                  className="mg-top-10 mg-left-10"
                >
                  Email Now
                </Button>
                <Button
                  onClick={() => printCSV(id)}
                  disabled={!editMode || !isAuthorized}
                  type="primary"
                  className="mg-top-10 mg-left-10"
                >
                  Print CSV
                </Button>
              </Col>
            </Row>
            <Form.Item label="Failure / Rejection Reason" name="rejectionReason">
              <Input placeholder="Failure reason" disabled={!editMode || !showReject} />
            </Form.Item>
            <Form.Item className="text-right">
              <Button onClick={_reject} disabled={!editMode || !showReject} type="primary">
                Reject
              </Button>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="Set Fulfillment Status">
              <Form.Item className="text-right">
                <Button
                  type="primary"
                  disabled={!editMode || !showDeliveryStart}
                  onClick={() => {
                    deliverystatus(STATUS.IN_DELIVERY);
                  }}
                >
                  Delivery Start
                </Button>
                <Button
                  type="primary"
                  disabled={!editMode || !showDeliveryCompleted}
                  className="mg-left-10"
                  onClick={() => {
                    deliverystatus(STATUS.DELIVERED);
                  }}
                >
                  Delivery Completed
                </Button>
              </Form.Item>
              <Form.Item className="text-right">
                <Button
                  type="primary"
                  disabled={!editMode || !showPaymentPaid}
                  onClick={() => paymentstatus(STATUS.PAID)}
                >
                  Payment Paid
                </Button>
                <Button
                  type="primary"
                  disabled={!editMode || !showDeliveryCompleted}
                  className="mg-left-10"
                  onClick={() => {
                    deliverystatus(STATUS.FAILED);
                  }}
                >
                  Delivery Failed
                </Button>
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>

        <Divider />
        {editMode ? (
          <Row className="fields-row" gutter={20}>
            <Col span={8} xs={24} sm={12} lg={12}>
              Created By: {_get(selected, "createdBy", "")}
              <br />
              Created At: {createdAt}
              <br />
              Last Modify By: {_get(selected, "updatedBy", "")}
              <br />
              Last Modify At: {updatedAt}
            </Col>
            <Col span={8} xs={24} sm={12} lg={12}>
              <Row className="fields-row" gutter={24} type="flex">
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  <Form.Item>
                    <Popconfirm
                      title={CONFIRM_MESSAGE.DELETE}
                      onConfirm={() => deleteBookOrders(id)}
                      onCancel={() => history.goBack()}
                      okText="Yes"
                      cancelText="No"
                      disabled
                    >
                      <Button disabled type="danger">
                        Delete
                      </Button>
                    </Popconfirm>
                  </Form.Item>
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
              <Button className="action-btn mg-right-50" type="info" onClick={() => history.goBack()}>
                Cancel
              </Button>
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

BookPurchaseRequestContainer.propTypes = {
  addBookOrder: PropTypes.func,
  getBookOrdersById: PropTypes.func,
  updateBookOrdersById: PropTypes.func,
  history: PropTypes.func,
  selected: PropTypes.object,
  deleteBookOrders: PropTypes.func,
  loading: PropTypes.bool,
  getBooks: PropTypes.func,
  books: PropTypes.object,
  getBookById: PropTypes.func,
  book: PropTypes.object,
  consumer: PropTypes.object,
  getAllConsumers: PropTypes.func,
  consumerList: PropTypes.object,
  paymentStatus: PropTypes.func,
  getConsumerById: PropTypes.func,
  deliveryStatus: PropTypes.func,
  resetConsumer: PropTypes.func,
  reject: PropTypes.func,
  sendEmail: PropTypes.func,
  regenerateCode: PropTypes.func,
  print: PropTypes.func,
  resetBook: PropTypes.func,
  bookLocationList: PropTypes.array,
  resetBooks: PropTypes.func,
  printCSV: PropTypes.func,
};
export default BookPurchaseRequestContainer;
