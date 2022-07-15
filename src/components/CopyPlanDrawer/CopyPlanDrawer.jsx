import { Button, Drawer, Row, Table, Form, Col, Select } from "antd";
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import _map from "lodash/map";
import { VALIDATE_FORM_MESSAGES_TEMPLATE } from "../../utils/constants";

const CopyPlanDrawer = props => {
  const {
    getLocations,
    getBrandList,
    getPartnerList,
    visibility,
    close,
    brands,
    partners,
    locations,
    getOutletBillingList,
    cloneBillingPlan,
    dataSource,
    loading,
    brandsLoader,
    partnerLoader,
  } = props;

  const columns = [
    {
      title: "Brand Id",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "StartDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
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

  useEffect(() => {
    if (visibility) {
      getLocations();
      getBrandList();
      getPartnerList();
      getOutletBillingList();
    }
  }, [visibility]);

  const onFormFinish = () => {};

  const [form] = Form.useForm();
  const brandArr = brands || [];
  const locationArr = locations ? locations.map(item => item.name) : []; // filters.location;
  const outletArr = partners || []; // filters.Partner;
  const [rowsSelected, setRowsSelected] = useState([]);

  const onReset = () => {
    form.resetFields();
    close();
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

  const onClickClear = () => {
    form.resetFields();
  };
  const onSelectChange = selectedRowKeys => {
    setRowsSelected(selectedRowKeys);
  };

  const _rowSelection = {
    selectedRowKeys: rowsSelected,
    onChange: onSelectChange,
  };
  const _cloneSelected = () => {
    const codes = rowsSelected.join(",");
    cloneBillingPlan(codes);
    onReset();
    close();
  };

  return (
    <Fragment>
      <Drawer
        footer={
          <div className="text-right">
            <Row justify="end">
              <Button className="action-btn mg-right-8" onClick={close}>
                Cancel
              </Button>
              <Button
                className="action-btn mg-right-8"
                type="primary"
                onClick={() => _cloneSelected()}
                htmlType="submit"
                form="BillingPlan"
              >
                Clone Selected
              </Button>
            </Row>
          </div>
        }
        width={720}
        // id="BillingPlan"
        title="Copy Plan"
        placement="right"
        closable={false}
        maskClosable={false}
        visible={visibility}
      >
        <Form
          id="BillingPlan"
          hideRequiredMark
          // className="EditMerchant"
          form={form}
          initialValues={{ userType: "Select Category", brandType: "Select Brand" }}
          layout="vertical"
          name="nest-messages"
          onFinish={onFormFinish}
          validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
        >
          <Row className="fields-row" gutter={20} type="flex">
            <Col span={8} xs={24} sm={12} lg={12}>
              <Form.Item name="partnerCode">
                <Select
                  showSearch
                  placeholder="Select Outlet"
                  optionFilterProp="children"
                  loading={partnerLoader}
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {_map(outletArr, item => (
                    <Select.Option key={item.code} value={item.code}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={12} lg={12}>
              <Form.Item name="brandCode">
                <Select
                  showSearch
                  placeholder="Select Brand"
                  optionFilterProp="children"
                  loading={brandsLoader}
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {_map(brandArr, brand => (
                    <Select.Option key={brand.code} value={brand.code}>
                      {brand.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={12} lg={12}>
              <Form.Item name="location">
                <Select
                  showSearch
                  placeholder="Select Location"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {_map(locationArr, item => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row className="fields-row mg-bottom-10" gutter={20} type="flex">
            <Col span={8} xs={24} sm={12} lg={12}>
              <Button onClick={onClickClear}>Reset filters</Button>
            </Col>
            <Col span={8} xs={24} sm={12} lg={12}>
              <Button onClick={onClickSearch}>Search</Button>
            </Col>
          </Row>
        </Form>

        <Table
          rowKey="code"
          // rowSelection={type:"radio",_rowSelection}
          rowSelection={{
            type: "radio",
            ..._rowSelection,
          }}
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          loading={loading}
        />
      </Drawer>
    </Fragment>
  );
};

CopyPlanDrawer.propTypes = {
  visibility: PropTypes.bool,
  close: PropTypes.func,
  brands: PropTypes.array,
  partners: PropTypes.array,
  locations: PropTypes.array,
  getOutletBillingList: PropTypes.func,
  cloneBillingPlan: PropTypes.func,
  dataSource: PropTypes.array,
  getLocations: PropTypes.func,
  getBrandList: PropTypes.func,
  getPartnerList: PropTypes.func,
  loading: PropTypes.bool,
  brandsLoader: PropTypes.bool,
  partnerLoader: PropTypes.bool,
};

export default CopyPlanDrawer;
