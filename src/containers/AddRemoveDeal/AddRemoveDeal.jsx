import { Button, Col, Divider, Drawer, Form, Row, Table, Select } from "antd";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _isNumber from "lodash/isNumber";
import _debounce from "lodash/debounce";

import { VALIDATE_FORM_MESSAGES_TEMPLATE, SEARCH_QUERY } from "../../utils/constants";
import { toastMessage, queryGenerator } from "../../utils/utils";

const dealColumns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Category",
    dataIndex: ["category", "name"],
    key: "category",
    width: 150,
  },
  {
    title: "Brand",
    dataIndex: ["brand", "name"],
    key: "brandName",
  },
];

const selectedColumns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    width: 150,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brandName",
  },
];

export const AddRemoveDealContainer = ({
  visible,
  close,
  isShowSelectedVouchers,
  addSelectedDeal,
  removeSelectedDeal,
  getDealsList,
  onSave,
  selectedDealsList,
  filteredDeals,
  filteredBrands,
  brandsLoader,
  loading,
  categories,
  categoryLoader,
  resetFilteredDealList,
  getDealCategoriesList,
  getBrandNamesList,
  getSelectedDealsList,
  selectedDealsListLoading,
  bookCode,
}) => {
  const dealState = isShowSelectedVouchers ? [] : {};
  const [rowsSelectedKey, setRowsSelectedKey] = useState([]);
  const [rowsSelected, setRowsSelected] = useState(dealState);
  const [rowsSelectedVouchers, setRowsSelectedVouchers] = useState([]);
  const [rowsSelectedVouchersKey, setRowsSelectedVouchersKey] = useState([]);
  const [selectedDeals, setSelectedDeals] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [sorterFilterPage, setSorterFilterPage] = useState(() => {
    let cPage = _get(selectedDealsList, "number");
    cPage = _isNumber(cPage) ? cPage + 1 : 1;
    return {
      currentPage: cPage,
      pageSize: _get(selectedDealsList, "size", 10),
      sorter: {},
      filters: {},
    };
  });
  // For antd pagination
  const [_pagination, setPagination] = useState({
    current: sorterFilterPage.currentPage,
    showSizeChanger: true,
    position: "bottom",
    pageSize: sorterFilterPage.pageSize,
    showQuickJumper: true,
    ...selectedDealsList,
  });
  const dealArr = isFilter ? filteredDeals : [];
  const brandsArr = filteredBrands.length ? filteredBrands : []; // filters.brands;

  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && !_isEmpty(selectedDealsList)) {
      setSelectedDeals(selectedDealsList.content);
    }
  }, [visible, selectedDealsList]);

  useEffect(() => {
    if (visible) {
      const query = { page: 0, size: 500 };
      getDealCategoriesList(query);
      getBrandNamesList({ ...SEARCH_QUERY });
    }
    // const _query = queryGenerator(sorterFilterPage);
    // getSelectedDealsList(bookCode, _query);
  }, [visible]);

  const rowSelection = {
    selectedRowKeys: rowsSelectedKey,
    onChange: (selectedRowKeys, selectedRows) => {
      setRowsSelected(selectedRows);
      setRowsSelectedKey(selectedRowKeys);
    },
  };

  const rowSelectionVoucher = {
    selectedRowKeys: rowsSelectedVouchersKey,
    onChange: (selectedRowKeys, selectedRows) => {
      setRowsSelectedVouchers(selectedRows);
      setRowsSelectedVouchersKey(selectedRowKeys);
    },
  };

  // useEffect(() => {
  //   if (visible) {
  //     const query = { page: 0, size: 500 };
  //     getDealsList(query);
  //   }
  // }, [visible]);

  const onFormFinish = () => {};

  const addSelected = async () => {
    // setSelectedDeals([...new Set([...rowsSelected, ...selectedDeals])]);
    // const arr = [...rowsSelected, ...selectedDeals];
    // const uniqueArr = [...new Map(arr.map(item => [item.code, item])).values()];
    // const uniqueArr = [...new Map(arr.map(item => [item && item.code, item])).values()]; // TODO item was undefined somehow
    // TODO call Api to add selected deals
    try {
      const codes = rowsSelectedKey.join(",");
      await addSelectedDeal(bookCode, codes);
      const _query = queryGenerator(sorterFilterPage);
      await getSelectedDealsList(bookCode, _query);
      setRowsSelectedKey([]);
    } catch (err) {
      console.log("add selected err", err);
    }
    // setSelectedDeals([...uniqueArr]);
  };

  const removeSelected = async () => {
    if (selectedDeals.length > 0) {
      try {
        const codes = rowsSelectedVouchersKey.join(",");
        await removeSelectedDeal(bookCode, codes);
        const _query = queryGenerator(sorterFilterPage);
        await getSelectedDealsList(bookCode, _query);
        // setRowsSelectedKey([]);
      } catch (err) {
        console.log("remove selected err", err);
      }
      // setSelectedDeals([...selectedDeals.filter(item => !rowsSelectedVouchers.includes(item))]);
    }
  };

  const onClickSearch = () => {
    const { brandCode } = form.getFieldsValue();
    const _filters = {};
    // if (categoryCode) {
    //   _filters.categoryCode = categoryCode;
    // }
    if (brandCode) {
      _filters.brandCode = brandCode;
      const query = { page: 0, size: 500, filters: _filters };
      getDealsList(query, true);
      setIsFilter(true);
    } else {
      toastMessage("info", "Please select brand");
    }
  };

  const onClickClear = () => {
    const query = { page: 0, size: 500 };
    getDealsList(query);
    getBrandNamesList({ ...SEARCH_QUERY });
    form.resetFields();
    setIsFilter(false);
  };

  const onSubmitClick = () => {
    onSave(selectedDeals);
    resetFilteredDealList();
    setRowsSelectedVouchersKey([]);
    setRowsSelectedKey([]);
    close();
  };

  const handleCategoryChange = value => {
    if (value) {
      form.resetFields(["brandCode"]);
      const query = { ...SEARCH_QUERY, categoryCode: value };
      getBrandNamesList(query);
    }
  };

  const handleBrandSearch = value => {
    if (value) {
      let query = { ...SEARCH_QUERY, name: value };
      const code = form.getFieldValue("categoryCode");
      if (code) {
        query = { ...SEARCH_QUERY, name: value, categoryCode: code };
      }
      getBrandNamesList(query);
    } else {
      form.resetFields(["brandCode"]);
      console.log("else condition of search text");
    }
  };

  const delayBrandSearch = _debounce(handleBrandSearch, 300);

  const handleCancel = () => {
    setRowsSelectedVouchersKey([]);
    setRowsSelectedKey([]);
    close();
  };

  const handleTableChange = async (pageInfo, filters, sorter) => {
    const payload = {
      currentPage: pageInfo.current,
      pageSize: pageInfo.pageSize,
      sorter,
      filters,
    };
    if (_pagination.current !== pageInfo.current) setRowsSelected([]);
    setSorterFilterPage(payload);
    const query = queryGenerator(payload);
    await getSelectedDealsList(bookCode, query);
    setPagination(pageInfo);
  };

  const paginationControl = () => ({
    current: sorterFilterPage.currentPage,
    total: _get(selectedDealsList, "totalElements", 0),
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    pageSizeOptions: ["10", "20", "50", "100", "500", "1000", "99999"],
    showSizeChanger: _pagination.showSizeChanger,
    position: _pagination.position,
    pageSize: _pagination.pageSize,
    showQuickJumper: _pagination.showQuickJumper,
    onShowSizeChange: (current, _size) => {
      const paginationWithUpdatedPageSize = _pagination;
      paginationWithUpdatedPageSize.pageSize = _size;
      setPagination(paginationWithUpdatedPageSize);
    },
  });

  return (
    <div>
      <Drawer
        title="Add / Remove Deals"
        width={850}
        visible={visible}
        closable={false}
        maskClosable={false}
        bodyStyle={{ paddingBottom: 80 }}
        onClose={close}
        footer={
          <div className="text-right">
            <Button onClick={handleCancel} className="mg-right-15">
              Cancel
            </Button>
            <Button onClick={onSubmitClick} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <Form
          hideRequiredMark
          className="add-remove-voucher"
          form={form}
          initialValues={{
            selectedCategory: "Select Category",
            selectedBrand: "Select Brand",
            selectedLocation: "Select Location",
          }}
          layout="vertical"
          name="nest-messages"
          onFinish={onFormFinish}
          validateMessages={VALIDATE_FORM_MESSAGES_TEMPLATE}
        >
          <Row className="fields-row" gutter={20} type="flex">
            <Col span={8} xs={24} sm={12} lg={12}>
              <Form.Item name="categoryCode" rules={[{ required: true }]}>
                <Select
                  showSearch
                  placeholder="Select category to filter brand"
                  optionFilterProp="children"
                  onChange={handleCategoryChange}
                  loading={categoryLoader}
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {categories.map(item => (
                    <Select.Option key={item.code} value={item.code}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={12} lg={12}>
              <Form.Item name="brandCode" rules={[{ required: true }]}>
                <Select
                  showSearch
                  placeholder="Select brand to view deals"
                  loading={brandsLoader}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={delayBrandSearch}
                >
                  {brandsArr.map(item => (
                    <Select.Option key={item.code} value={item.code}>
                      {item.name}
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
          <Divider orientation="left" className="form-divider first sub-page-title">
            Select New Deal(s)
          </Divider>
          <Row className="fields-row" gutter={20} type="flex">
            <Col span={8} xs={24} sm={24} lg={24}>
              <Table
                rowSelection={{
                  ...rowSelection,
                }}
                columns={dealColumns}
                rowKey="code"
                dataSource={dealArr}
                pagination={false}
                scroll={{ y: 240 }}
                loading={loading}
              />
            </Col>
          </Row>
          {isShowSelectedVouchers ? (
            <Row className="fields-row mg-top-15 mg-bottom-15" gutter={20} type="flex">
              <Col span={8} xs={24} sm={24} lg={24}>
                <Button type="primary" onClick={addSelected}>
                  Add Selected
                </Button>
              </Col>
            </Row>
          ) : null}
          {isShowSelectedVouchers ? (
            <>
              <Divider orientation="left" className="form-divider first sub-page-title">
                Selected Deal(s)
              </Divider>
              <Row className="fields-row" gutter={20} type="flex">
                <Col span={8} xs={24} sm={24} lg={24}>
                  <Table
                    rowSelection={{
                      ...rowSelectionVoucher,
                    }}
                    columns={selectedColumns}
                    rowKey="code"
                    dataSource={selectedDeals}
                    size="middle"
                    loading={selectedDealsListLoading}
                    onChange={handleTableChange}
                    pagination={paginationControl()}
                    scroll={{ y: 240 }}
                  />
                </Col>
              </Row>
              {selectedDeals && selectedDeals.length ? (
                <Row className="fields-row mg-top-15" gutter={20} type="flex">
                  <Col span={8} xs={24} sm={24} lg={24}>
                    <Button type="primary" onClick={removeSelected}>
                      Remove Selected
                    </Button>
                  </Col>
                </Row>
              ) : null}
            </>
          ) : null}
        </Form>
      </Drawer>
    </div>
  );
};

AddRemoveDealContainer.propTypes = {
  visible: PropTypes.bool,
  close: PropTypes.func,
  isShowSelectedVouchers: PropTypes.bool,
  getDealsList: PropTypes.func,
  getBrandNamesList: PropTypes.func,
  resetFilteredDealList: PropTypes.func,
  onSave: PropTypes.func,
  addSelectedDeal: PropTypes.func,
  removeSelectedDeal: PropTypes.func,
  filteredDeals: PropTypes.array,
  filteredBrands: PropTypes.array,
  brandsLoader: PropTypes.bool,
  loading: PropTypes.bool,
  categoryLoader: PropTypes.bool,
  selectedDealsListLoading: PropTypes.bool,
  categories: PropTypes.array,
  getDealCategoriesList: PropTypes.func,
  getSelectedDealsList: PropTypes.func,
  bookCode: PropTypes.string,
  selectedDealsList: PropTypes.object,
};

export default AddRemoveDealContainer;
