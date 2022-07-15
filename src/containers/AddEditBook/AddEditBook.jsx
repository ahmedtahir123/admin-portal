import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Row,
  Select,
  Col,
  Radio,
  DatePicker,
  Upload,
  Divider,
  Spin,
  Popconfirm,
  Switch,
  Progress,
  InputNumber,
} from "antd";
import PropTypes from "prop-types";
import * as moment from "dayjs";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import _map from "lodash/map";
import GalleryManager from "../GalleryManager";
import GalleryGrid from "../GalleryGrid";
import { galleryImages } from "../../__mocks__/galleryImages";
import { getBase64, beforeUpload, isJSON } from "../../utils/utils";
import {
  STATUS,
  VALIDATE_FORM_MESSAGES_TEMPLATE,
  CONFIRM_MESSAGE,
  DATE_FORMAT_TIME,
  // bookLocationList,
} from "../../utils/constants";
import listingPageCardImage from "../../images/listing-card.svg";
import AddRemoveDealProvider from "../../providers/addRemoveDeal.provider";
import AddRemovePopularBrandProvider from "../../providers/addRemovePopularBrands.provider";
import AddRemovePopularDealProvider from "../../providers/addRemovePopularDeals.provider";
import PageTitle from "../../components/PageTitle/PageTitle";
import { StatusRadioButtons } from "../../components/StatusRadioButtons/StatusRadioButtons";
const { Option } = Select;
const { RangePicker } = DatePicker;

const AddEditBookContainer = ({
  loading,
  uploadLoader,
  book,
  getBookById,
  updateBook,
  addBook,
  deleteAllBooks,
  history,
  getSelectedDealsList,
  selectedDealsList,
  bookLocationList,
  printCSV,
  publishUnPublishBook,
  // selectedDealsListCount,
  // getDealsList,
  // getBrandList,
  // getCorporateClientNames,
  // brands,
  // corporateCustomer,
}) => {
  const [form] = Form.useForm();
  const [isDealDrawerVisible, setIsDealDrawerVisible] = useState(false);
  const [popularBrandsVisible, setPopularBrandsVisible] = useState(false);
  const [popularDealsVisible, setPopularDealsVisible] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [bookDeals, setBookDeals] = useState([]);
  const [bookDealsKey, setBookDealsKey] = useState([]);
  const [popularBrands, setPopularBrands] = useState([]);
  const [popularDeals, setPopularDeals] = useState([]);
  const [popularDealsKey, setPopularDealsKey] = useState([]);
  const [savings, setSavings] = useState(0);
  const [totalBrands, setTotalBrands] = useState(0);
  const [totalDeals, setTotalDeals] = useState(0);
  const [checkPeriod, setCheckPeriod] = useState(false);
  const { id } = useParams();
  const isEditView = !!id;
  const statusRadioButtonProps = {
    currentStatus: [
      { code: STATUS.UNPUBLISHED, name: "Un Published" },
      { code: STATUS.PUBLISHED, name: "Published" },
    ],
    defaultValue: isEditView ? STATUS[book.status] : STATUS.UNPUBLISHED,
  };
  const createdAt = _get(book, "createdAt", "") ? moment(book.createdAt).format(DATE_FORMAT_TIME) : "";
  const updatedAt = _get(book, "updatedAt", "") ? moment(book.updatedAt).format(DATE_FORMAT_TIME) : "";
  // --------- Image Upload States -------
  const [logoImage, setLogoImage] = useState({
    type: "listing-card",
    name: "logo-image",
    uid: 0,
    file: null,
    url: listingPageCardImage,
  });
  const [downloadPercent, setDownloadPercent] = useState(0);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [_galleryImages, _setGalleryImages] = useState(galleryImages);
  const [uploadedImages, setUploadedImages] = useState([]);

  const resetStates = () => {
    setUploadedImages([]);
    _setGalleryImages([]);
    setGalleryVisible(false);
    setCheckPeriod(false);
    setSavings(0);
    setTotalBrands(0);
    setTotalDeals(0);
    setCheckPeriod(false);
    setIsDealDrawerVisible(false);
    setPopularBrandsVisible(false);
    setPopularDealsVisible(false);
    setLogoImage({
      type: "listing-card",
      name: "logo-image",
      uid: 0,
      file: null,
      url: listingPageCardImage,
    });
  };

  // ------------- Upload states end ------------------

  useEffect(() => {
    if (id) {
      fetchBookDetail(id);
    }
  }, [id]);

  // useEffect(() => {
  // const query = { page: 0, size: 500 };
  // getBrandList(query);
  // getDealList(query);
  // getCorporateClientNames(query);
  // }, []);

  // useEffect(() => {
  //   if (deals.length && !_isEmpty(book) && isEditView) {
  //     const dealLookup = _get(book, "bookDealsMap");
  //     const popularDealLookup = _get(book, "bookDetail.popularDealsMap") || {};
  //     if (dealLookup) {
  //       const _bookDeals = deals.filter(d => dealLookup[d.code]);
  //       const _popularDeals = _bookDeals.filter(d => popularDealLookup[d.code]);
  //       setBookDeals(_bookDeals);
  //       setPopularDeals(_popularDeals);
  //     }
  //   }
  // }, [book, deals]);

  // useEffect(() => {
  //   if (brands.length && !_isEmpty(book) && isEditView) {
  //     const bookBrandsMap = _get(book, "bookDetail.bookBrandsMap");
  //     const popularBrandsMap = _get(book, "bookDetail.popularBrandsMap") || {};
  //     if (bookBrandsMap) {
  //       const _bookBrands = brands.filter(d => bookBrandsMap[d.code]);
  //       const _popularBrands = _bookBrands.filter(d => popularBrandsMap[d.code]);
  //       setSelectedBrands(_bookBrands);
  //       setPopularBrands(_popularBrands);
  //     }
  //   }
  // }, [book, brands]);

  useEffect(() => {
    if (!_isEmpty(book) && !loading && isEditView) {
      setFormValues();
      getSelectedDealsList(book.code, { page: 0, size: 10 });
    }
  }, [book, loading]);

  // useEffect(() => {
  //   if (isEditView && !_isEmpty(selectedDealsList)) {
  //     setBookDeals(selectedDealsList.content);
  //     // setTotalDeals(selectedDealsList.content.length);
  //   }
  // }, [selectedDealsList]);

  // useEffect(() => {
  //   if (corporateCustomer.length && book.customerCode && isEditView) {
  //     const customerObj = corporateCustomer.find(d => d.corporateClientId === book.customerCode);
  //     const customerCode = customerObj ? book.customerCode : undefined;
  //     form.setFieldsValue({ customerCode });
  //   }
  // }, [corporateCustomer, book]);

  // on Component did mount
  useEffect(() => {
    if (form) {
      form.resetFields();
      resetStates();
    }
    // return () => { TODO: should work on Component unMount
    //   if (form) {
    //     form.resetFields();
    //   }
    // };
  }, [form]);

  // ---------------- Image Upload Work ---------------
  const openGallery = () => {
    setGalleryVisible(true);
  };
  const closeGallery = () => {
    setGalleryVisible(false);
  };

  const uploadImages = newFiles => {
    if (newFiles && newFiles.length) {
      setUploadedImages(newFiles);
      _setGalleryImages(newFiles);
    } else {
      setUploadedImages([]);
      _setGalleryImages([]);
    }
  };

  const handleImageChange = ({ file }) => {
    getBase64(file, url => {
      const fileObj = {
        type: "listing-card",
        name: file.name,
        uid: file.uid,
        file,
        url,
      };
      setLogoImage(fileObj);
    });
  };

  // ---------------- END ---------------

  const _deleteBook = async () => {
    try {
      await deleteAllBooks(id);
      history.goBack();
    } catch (error) {
      console.log("book del error", error);
    }
  };

  const fetchBookDetail = async bookId => {
    await getBookById(bookId);
  };

  const setFormValues = () => {
    const startDate = book.startDate ? moment(book.startDate) : undefined;
    const endDate = book.endDate ? moment(book.endDate) : undefined;
    const date = [startDate, endDate];

    form.setFieldsValue({
      id: book.id,
      visibility: book.visibility,
      code: book.code,
      title: book.title,
      status: book.status,
      punchline: book.punchline,
      description: book.description,
      cityCode: book.cityCode,
      price: book.price,
      discountedPrice: book.discountedPrice,
      enabled: book.enabled,
      eventName: book.eventName,
      maxPurchaseCount: book.maxPurchaseCount,
      activePeriod: book.activePeriod,
      date,
      shownInApp: book.shownInApp,
    });
    if (book.totalDeals >= 0) {
      setSavings(book.totalSaving);
      setTotalBrands(book.totalBrands);
      setTotalDeals(book.totalDeals);
    }
    // ---------------- Image Upload Work ---------------
    if (book.coverImageUrl) {
      setLogoImage({ ...logoImage, file: null, url: book.coverImageUrl });
    }
    if (book.imageUrls && book.imageUrls.length) {
      const imagesArr = isJSON(book.imageUrls) ? JSON.parse(book.imageUrls) : book.imageUrls;
      _setGalleryImages(imagesArr);
      setUploadedImages(imagesArr);
    }
    // ---------------- END ---------------
  };

  const onFormFinish = async fieldsValue => {
    console.log("form values ===", fieldsValue);
    const visibility = "PRIVATE";
    const status = STATUS.UNPUBLISHED;
    const rangeTimeValue = fieldsValue.date || [];
    const shownInApp = _get(fieldsValue, "shownInApp", true);
    const values = {
      ...fieldsValue,
      shownInApp,
      startDate: rangeTimeValue.length && rangeTimeValue[0] ? rangeTimeValue[0].valueOf() : null,
      endDate: rangeTimeValue.length && rangeTimeValue[1] ? rangeTimeValue[1].valueOf() : null,
      visibility,
      status,
      totalSaving: savings,
      totalBrands,
      totalDeals,
      coverImageUrl: logoImage.file ? logoImage : null,
      imageUrls: uploadedImages.length ? uploadedImages : null,
    };
    try {
      if (isEditView) {
        await updateBook(id, { ...book, ...values }, getProgress);
      } else {
        await addBook(values, getProgress);
      }
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const initialValues = {
    status: STATUS.UNPUBLISHED,
    activePeriod: 0,
    discountedPrice: 0,
    price: 0,
    enabled: true,
  };

  const onDealDrawerClose = () => {
    setIsDealDrawerVisible(false);
  };
  const _selectedPopularBrands = param => {
    setPopularBrands(param);
  };
  const _selectedPopularDeal = param => {
    setPopularDeals(param);
  };

  const _selectedDeals = _deals => {
    console.log("_deals", _deals);
    fetchBookDetail(id);
  };

  const handlePeriodChange = value => {
    if (value > 0) {
      setCheckPeriod(true);
      form.resetFields(["date"]);
    } else {
      setCheckPeriod(false);
    }
  };

  const getProgress = ({ loaded, total }) => {
    const progress = Math.floor((loaded / total) * 100);
    if (progress !== 100) {
      setDownloadPercent(progress);
      return;
    }
    setDownloadPercent(100);
  };

  const _publishUnPublishBook = () => {
    if (book && book.status === STATUS.PUBLISHED) {
      publishUnPublishBook([id], false);
    } else {
      publishUnPublishBook([id], true);
    }
  };

  return (
    <>
      {loading ? (
        <div className="edit-form__spin">
          <Spin size="large" tip="Loading ..." />
        </div>
      ) : null}
      <PageTitle title={isEditView ? "Edit Book" : "Add Book"} />
      <Form
        form={form}
        className="add-edit-book"
        layout="vertical"
        name="nest-messages"
        initialValues={initialValues}
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            {isEditView ? (
              <Form.Item label="Book Code" name="code">
                <Input readOnly placeholder="Book Code" />
              </Form.Item>
            ) : null}
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item label="Marketing Punch Line" name="punchline" rules={[{ required: false }]}>
              <Input placeholder="Marketing Punch Line" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea rows="4" maxLength="500" placeholder="Description" />
            </Form.Item>
            <Form.Item label="Location" name="cityCode" rules={[{ required: true }]}>
              <Select
                showSearch
                placeholder="Select Location"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                className="location-select"
                autoComplete="off"
              >
                {_map(bookLocationList, bookLocation => (
                  <Option key={bookLocation.code} value={bookLocation.code}>
                    {bookLocation.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Price" name="price" rules={[{ required: true, type: "number" }]}>
              <InputNumber className="input-number-full-width" placeholder="Price" />
            </Form.Item>
            <Form.Item label="Discounted Price" name="discountedPrice">
              <InputNumber className="input-number-full-width" placeholder="Discounted Price" min={0} />
            </Form.Item>
            <Form.Item label="Is Show in App" name="shownInApp">
              <Switch />
            </Form.Item>
            {/* <Form.Item label="Corporate Customer" name="customerCode" rules={[{ required: false }]}>
              <Select
                showSearch
                placeholder="Select Customer"
                optionFilterProp="children"
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                className="category-select"
              >
                {_map(corporateCustomer, user => (
                  <Option key={user.code} value={user.code}>
                    {user.name}
                  </Option>
                ))}
              </Select>
            </Form.Item> */}
            {/* <Form.Item>
              <Button
                onClick={() => {
                  history.push(ROUTES.ADD_CORPORATE_CUSTOMER.path);
                }}
              >
                Create New Corporate Customer
              </Button>
            </Form.Item> */}
          </Col>
          <Col span={8} xs={24} sm={12} lg={12} className="mg-top-40">
            <Form.Item className="text-left" name="enabled">
              <Radio.Group>
                <Radio.Button value>Enabled</Radio.Button>
                <Radio.Button value={false}>Disabled</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Current Status" className="text-left" name="status">
              <StatusRadioButtons
                currentStatus={statusRadioButtonProps.currentStatus}
                defaultValue={statusRadioButtonProps.defaultValue}
              />
            </Form.Item>
            {isEditView ? (
              <Row className="fields-row" gutter={24} type="flex" justify="end">
                <Col className="text-right" span={8} xs={24} sm={12} lg={12}>
                  <Popconfirm
                    title={CONFIRM_MESSAGE.PUBLISH}
                    onConfirm={_publishUnPublishBook}
                    onCancel={() => {}}
                    okText="Yes"
                    cancelText="No"
                    disabled={!totalDeals}
                  >
                    <Button disabled={!totalDeals}>
                      {book && book.status === STATUS.PUBLISHED ? "Un Publish" : "Publish"}
                    </Button>
                  </Popconfirm>
                </Col>
              </Row>
            ) : null}
            <Divider />
            <Form.Item label="">
              <div className="text-center">
                <div className="bg-gray">
                  <img src={logoImage.url} alt="avatar" width={250} />
                  <div className="upload-container">
                    <Upload showUploadList={false} beforeUpload={beforeUpload} onChange={handleImageChange}>
                      <Button>Change Listing Page Card Image</Button>
                    </Upload>
                  </div>
                </div>
              </div>
            </Form.Item>
            <Divider />
            <Form.Item label="">
              <div className="text-center">
                <div className="bg-gray">
                  <GalleryGrid images={_galleryImages} gridOnly />
                  <div className="upload-container">
                    <Button onClick={openGallery}>Manage Banner Gallery</Button>
                  </div>
                </div>
              </div>
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={12} lg={12}>
            <Form.Item label="Event Name" name="eventName">
              <Input placeholder="Event Name" />
            </Form.Item>
            <Form.Item label="Select Active Period (In months) / Date Range" rules={[{ required: true }]}>
              <Row justify="space-around">
                <Col span={8} xs={24} sm={12} lg={12}>
                  <Form.Item label="Active Period" name="activePeriod" rules={[{ required: checkPeriod }]}>
                    <InputNumber
                      // disabled={checkPeriod}
                      onChange={handlePeriodChange}
                      placeholder="1 - 24"
                      max="24"
                      min="0"
                      maxLength="2"
                    />
                  </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={12} lg={12}>
                  <Form.Item label="Start / End Date" name="date" rules={[{ required: !checkPeriod, type: "array" }]}>
                    <RangePicker disabled={checkPeriod} />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item label="Maximum disburse limit" name="maxPurchaseCount" rules={[{ required: false }]}>
              <InputNumber className="input-number-full-width" placeholder="Maximum disburse limit" min="0" />
            </Form.Item>
            <Button disabled={!isEditView} type="primary" onClick={() => printCSV(id)}>
              Print CSV
            </Button>
          </Col>

          {isEditView ? (
            <Col span={8} xs={24} sm={12} lg={12}>
              <Row className="mg-top-10" justify="end">
                <Col className="">
                  <Form.Item>
                    <Button onClick={() => setIsDealDrawerVisible(true)} type="primary">
                      Add / Remove Deal(s)
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="space-between">
                <Col className="" span={8} xs={24} sm={12} lg={12}>
                  <Form.Item>
                    <Button onClick={() => setPopularDealsVisible(true)} type="primary" disabled={!totalDeals}>
                      Add / Remove Popular Deal(s)
                    </Button>
                  </Form.Item>
                </Col>
                <Col className="text-right" span={8} xs={24} sm={12} lg={12}>
                  <Form.Item>
                    <Button onClick={() => setPopularBrandsVisible(true)} type="primary" disabled={!totalDeals}>
                      Add / Remove Popular Brand(s)
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
              <div>
                {/* // TODO show actual selected deals count */}
                <p>Total Number of Deals: {totalDeals}</p>
                <p>Total savings: {savings}</p>
                <p>Total number of Brands: {totalBrands}</p>
              </div>
            </Col>
          ) : null}
        </Row>
        <Divider />
        {isEditView ? (
          <Row className="fields-row" gutter={20}>
            <Col span={8} xs={24} sm={12} lg={12}>
              Created By: {_get(book, "createdBy", "")}
              <br />
              Created At: {createdAt}
              <br />
              Last Modify By: {_get(book, "updatedBy", "")}
              <br />
              Last Modify At: {updatedAt}
            </Col>
            <Col span={8} xs={24} sm={12} lg={12}>
              <Row className="fields-row" gutter={24} type="flex">
                <Col span={8} xs={24} sm={8} lg={8} className="text-right">
                  <Popconfirm
                    title={CONFIRM_MESSAGE.DELETE}
                    onConfirm={_deleteBook}
                    onCancel={() => {}}
                    okText="Yes"
                    cancelText="No"
                    disabled
                  >
                    <Button type="danger" disabled>
                      Delete
                    </Button>
                  </Popconfirm>
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
                    <Button type="primary" htmlType="submit" loading={loading} disabled={uploadLoader}>
                      {uploadLoader ? (
                        <Progress strokeLinecap="square" strokeColor="#F7931E" percent={downloadPercent} />
                      ) : (
                        "Save"
                      )}
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
              <Button className="action-btn" type="primary" htmlType="submit" loading={loading} disabled={uploadLoader}>
                {uploadLoader ? (
                  <Progress strokeLinecap="square" strokeColor="#F7931E" percent={downloadPercent} />
                ) : (
                  "Create"
                )}
              </Button>
            </Col>
          </Row>
        )}
        <AddRemoveDealProvider
          onSave={_selectedDeals}
          visible={isDealDrawerVisible}
          close={onDealDrawerClose}
          isShowSelectedVouchers
          // bookSelectedDealList={bookDeals}
          // getDealsList={getDealsList}
          bookCode={isEditView ? book.code : ""}
        />
        <AddRemovePopularDealProvider
          visible={popularDealsVisible}
          close={() => setPopularDealsVisible(false)}
          bookCode={isEditView ? book.code : ""}
        />
        <AddRemovePopularBrandProvider
          visible={popularBrandsVisible}
          close={() => setPopularBrandsVisible(false)}
          bookCode={isEditView ? book.code : ""}
        />
        <GalleryManager
          images={_galleryImages}
          visible={galleryVisible}
          close={closeGallery}
          uploadImages={uploadImages}
        />
      </Form>
    </>
  );
};

AddEditBookContainer.propTypes = {
  addBook: PropTypes.func,
  getBookById: PropTypes.func,
  updateBook: PropTypes.func,
  deleteAllBooks: PropTypes.func,
  book: PropTypes.object,
  history: PropTypes.object,
  loading: PropTypes.bool,
  uploadLoader: PropTypes.bool,
  getSelectedDealsList: PropTypes.func,
  publishUnPublishBook: PropTypes.func,
  selectedDealsList: PropTypes.object,
  bookLocationList: PropTypes.array,
  printCSV: PropTypes.func,
  // brands: PropTypes.array,
  // corporateCustomer: PropTypes.array,
  // getDealsList: PropTypes.func,
  // getBrandList: PropTypes.func,
  // getCorporateClientNames: PropTypes.func,
};
export default AddEditBookContainer;
