import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import * as moment from "dayjs";
import { Button, Col, Divider, Form, Row, Select } from "antd";
import ListView from "../../components/ListView/ListView";
import PageTitle from "../../components/PageTitle/PageTitle";
import { VALIDATE_FORM_MESSAGES_TEMPLATE, DATE_FORMAT } from "../../utils/constants";
import BillingPlanDrawer from "../../providers/billingPlanDrawer.provider";
import CopyPlanDrawer from "../../providers/copyPlanDrawer.provider";

// Phase-1 module
const OutletBillingManagement = props => {
  const {
    loading,
    getOutletBillingList,
    getPartnerList,
    addOutletBilling,
    dataSource,
    pagination,
    partnerLoader,
    brandsLoader,
    locationLoader,
    getBrandList,
    brands,
    getLocations,
    locations,
    partners,
    resumeBillingPlan,
    suspendBillingPlan,
    retireBillingPlan,
    cloneBillingPlan,
  } = props;

  const resumeButton = {
    text: "Resume",
    handler: resumeBillingPlan,
  };
  const suspendButton = {
    text: "Suspend",
    handler: suspendBillingPlan,
  };
  const retireButton = {
    text: "Retire",
    handler: retireBillingPlan,
  };
  const cloneButton = {
    text: "Clone",
    handler: cloneBillingPlan,
  };

  const [billingPlanDrawerVisibility, setBillingPlanDrawerVisibility] = useState(false);
  const [copyPlanDrawerVisibility, setCopyPlanDrawerVisibility] = useState(false);
  const [billingId, setBillingId] = useState(null);

  const [editMode, setEditMode] = useState(false);

  const showBillingPlan = id => {
    if (id) {
      console.log(typeof id);
      setBillingId(id);
      setEditMode(true);
      setBillingPlanDrawerVisibility(true);
    } else {
      setBillingPlanDrawerVisibility(true);
    }
  };
  const closeBillingPlan = () => {
    setBillingPlanDrawerVisibility(false);
    setEditMode(false);
    setBillingId(null);
  };

  const showCopyPlan = () => {
    setCopyPlanDrawerVisibility(true);
  };
  const closeCopyPlan = () => {
    setCopyPlanDrawerVisibility(false);
  };

  const createBillingPlan = value => {
    addOutletBilling(value);
    console.log(value);
  };

  useEffect(() => {
    getLocations();
    getBrandList();
    getPartnerList();
    getOutletBillingList();
  }, []);

  const columns = [
    {
      title: "Brand Name",
      dataIndex: "partnerBrandName",
      key: "partnerBrandName",
      sorter: true,
    },
    {
      title: "Outlet Name",
      dataIndex: "partnerName",
      key: "code",
      sorter: true,
      render: (text, record) => (
        <Button onClick={() => showBillingPlan(record.code)} type="link">
          {text}
        </Button>
      ),
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
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  const [form] = Form.useForm();
  const brandsArr = brands || []; // filters.brands;
  const locationArr = locations ? locations.map(item => item.name) : []; // filters.location;
  const outletArr = partners || []; // filters.Partner;

  const getList = async query => {
    await getOutletBillingList(query);
  };

  const onFormFinish = () => {};
  const onClickClear = () => {
    form.resetFields();
  };

  const onClickSearch = () => {
    const { location, outletCode, brandCode } = form.getFieldsValue();
    const _filters = {};

    if (brandCode) {
      _filters.partnerBrandCode = brandCode;
    }
    if (location) {
      _filters.partnerCity = location;
    }
    if (outletCode) {
      _filters.partnerCode = outletCode;
    }

    const query = { page: 0, size: 10, filters: _filters };
    getOutletBillingList(query);
  };

  return (
    <Fragment>
      <Form
        hideRequiredMark
        className="add-remove-voucher"
        form={form}
        initialValues={{
          selectedBrand: "Select Brand",
          selectedLocation: "Select Location",
          selectedOutlet: "Select Outlet",
        }}
        layout="vertical"
        name="nest-messages"
        onFinish={onFormFinish}
        validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
      >
        <Row className="fields-row" gutter={20} type="flex" justify="space-between">
          <Col span={8} xs={24} sm={12} lg={4}>
            <Form.Item name="brandCode" rules={[{ required: true }]}>
              <Select
                showSearch
                placeholder="Select brand"
                optionFilterProp="children"
                loading={brandsLoader}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {brandsArr.map(item => (
                  <Select.Option key={item.code} value={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={4}>
            <Form.Item name="location" rules={[{ required: true }]}>
              <Select
                showSearch
                placeholder="Select Location"
                optionFilterProp="children"
                loading={locationLoader}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {locationArr.map(item => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={12} lg={4}>
            <Form.Item name="outletCode" rules={[{ required: true }]}>
              <Select
                showSearch
                placeholder="Select Outlet"
                optionFilterProp="children"
                loading={partnerLoader}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {outletArr.map(item => (
                  <Select.Option key={item.code} value={item.code}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={12} lg={4}>
            <Button onClick={onClickClear}>Reset filters</Button>
          </Col>
          <Col span={8} xs={24} sm={12} lg={4}>
            <Button onClick={onClickSearch}>Search</Button>
          </Col>
        </Row>

        <Divider />
        <PageTitle title="Outlet Billing Management" />
        <ListView
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          resumeButton={resumeButton}
          suspendButton={suspendButton}
          retireButton={retireButton}
          cloneButton={cloneButton}
          rowKey="code"
          getList={getList}
          pagination={pagination}
        />
      </Form>
      <Divider />
      <Row type="flex" justify="end">
        <Col span={6} xs={24} sm={6} lg={5} className="text-right">
          <Button type="primary" onClick={() => showBillingPlan(null)}>
            Create Billing Plan
          </Button>
        </Col>
        <Col span={6} xs={24} sm={6} lg={5} className="text-right">
          <Button onClick={showCopyPlan}>Copy</Button>
        </Col>
      </Row>
      <BillingPlanDrawer
        visibility={billingPlanDrawerVisibility}
        createBillingPlan={createBillingPlan}
        close={closeBillingPlan}
        _readOnly={editMode}
        editMode={editMode}
        id={billingId}
      />
      <CopyPlanDrawer visibility={copyPlanDrawerVisibility} close={closeCopyPlan} />
    </Fragment>
  );
};

OutletBillingManagement.defaultProps = {
  dataSource: [],
};

OutletBillingManagement.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  pagination: PropTypes.object,
  getOutletBillingList: PropTypes.func,
  getPartnerList: PropTypes.func,
  partnerLoader: PropTypes.bool,
  brandsLoader: PropTypes.bool,
  locationLoader: PropTypes.bool,
  getBrandList: PropTypes.func,
  brands: PropTypes.array,
  getLocations: PropTypes.func,
  locations: PropTypes.array,
  partners: PropTypes.array,
  resumeBillingPlan: PropTypes.func,
  suspendBillingPlan: PropTypes.func,
  retireBillingPlan: PropTypes.func,
  addOutletBilling: PropTypes.func,
  cloneBillingPlan: PropTypes.func,
};

export default OutletBillingManagement;
