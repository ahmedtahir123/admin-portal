import { Button, Col, Divider, Drawer, Row, Table } from "antd";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _isNumber from "lodash/isNumber";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { queryGenerator } from "../../utils/utils";

export const AddRemoveBrands = ({
  visible,
  close,
  bookBrandsList,
  selectedBookBrandList,
  bookCode,
  getBookBrandList,
  getSelectedBrandList,
  addSelectedBrand,
  bookLoading,
  removeSelectedBrand,
  loading,
}) => {
  const [rowsSelected, setRowsSelected] = useState([]);
  const [rowsSelectedKey, setRowsSelectedKey] = useState([]);
  const [rowsSelectedBrands, setRowsSelectedBrands] = useState([]);
  const [rowsSelectedBrandsKey, setRowsSelectedBrandsKey] = useState([]);

  const [brandsSorterFilterPage, setBrandsSorterFilterPage] = useState(() => {
    let cPage = _get(bookBrandsList, "number");
    cPage = _isNumber(cPage) ? cPage + 1 : 1;
    return {
      currentPage: cPage,
      pageSize: _get(bookBrandsList, "size", 10),
      sorter: {},
      filters: {},
    };
  });

  const [selectedSorterFilterPage, setSelectedSorterFilterPage] = useState(() => {
    let cPage = _get(selectedBookBrandList, "number");
    cPage = _isNumber(cPage) ? cPage + 1 : 1;
    return {
      currentPage: cPage,
      pageSize: _get(selectedBookBrandList, "size", 10),
      sorter: {},
      filters: {},
    };
  });
  // For antd pagination
  const [_selectedPagination, setSelectedPagination] = useState({
    current: selectedSorterFilterPage.currentPage,
    showSizeChanger: true,
    position: "bottom",
    pageSize: selectedSorterFilterPage.pageSize,
    showQuickJumper: true,
    ...selectedBookBrandList,
  });

  const [_brandsPagination, setBrandsPagination] = useState({
    current: brandsSorterFilterPage.currentPage,
    showSizeChanger: true,
    position: "bottom",
    pageSize: brandsSorterFilterPage.pageSize,
    showQuickJumper: true,
    ...bookBrandsList,
  });

  const columns = [
    {
      title: "Brand",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    // {
    //   title: "Location",
    //   dataIndex: "address",
    //   key: "address",
    // },
  ];

  useEffect(() => {
    if (visible) {
      const _brandsQuery = queryGenerator(brandsSorterFilterPage);
      getBookBrandList(bookCode, _brandsQuery);
      const _query = queryGenerator(selectedSorterFilterPage);
      getSelectedBrandList(bookCode, _query);
    }
  }, [visible]);

  const rowSelectionBrands = {
    selectedRowKeys: rowsSelectedBrandsKey,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
      setRowsSelectedBrands([...selectedRows]);
      setRowsSelectedBrandsKey(selectedRowKeys);
    },
  };

  const addSelected = async () => {
    if (rowsSelectedKey.length > 0) {
      try {
        await addSelectedBrand(bookCode, rowsSelectedKey);
        const _query = queryGenerator(selectedSorterFilterPage);
        await getSelectedBrandList(bookCode, _query);
        setRowsSelectedKey([]);
      } catch (err) {
        console.log("add selected err", err);
      }
    }
  };

  const removeSelected = async () => {
    if (rowsSelectedBrandsKey.length > 0) {
      try {
        await removeSelectedBrand(bookCode, rowsSelectedBrandsKey);
        const _query = queryGenerator(selectedSorterFilterPage);
        await getSelectedBrandList(bookCode, _query);
      } catch (err) {
        console.log("add selected err", err);
      }
    }
  };

  const rowSelection = {
    selectedRowKeys: rowsSelectedKey,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
      setRowsSelected([...selectedRows]);
      setRowsSelectedKey(selectedRowKeys);
    },
  };

  const onSubmit = () => {
    setRowsSelectedKey([]);
    setRowsSelectedBrandsKey([]);
    close();
  };

  const onCancel = () => {
    setRowsSelectedBrandsKey([]);
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
    if (_selectedPagination.current !== pageInfo.current) setRowsSelected([]);
    setSelectedSorterFilterPage(payload);
    const query = queryGenerator(payload);
    await getSelectedBrandList(bookCode, query);
    setSelectedPagination(pageInfo);
  };

  const handleBrandTableChange = async (pageInfo, filters, sorter) => {
    const payload = {
      currentPage: pageInfo.current,
      pageSize: pageInfo.pageSize,
      sorter,
      filters,
    };
    if (_brandsPagination.current !== pageInfo.current) setRowsSelected([]);
    setBrandsSorterFilterPage(payload);
    const query = queryGenerator(payload);
    await getBookBrandList(bookCode, query);
    setBrandsPagination(pageInfo);
  };

  const brandsPaginationControl = () => ({
    current: brandsSorterFilterPage.currentPage,
    total: _get(bookBrandsList, "totalElements", 0),
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    pageSizeOptions: ["10", "20", "50", "100", "500", "1000", "99999"],
    showSizeChanger: _brandsPagination.showSizeChanger,
    position: _brandsPagination.position,
    pageSize: _brandsPagination.pageSize,
    showQuickJumper: _brandsPagination.showQuickJumper,
    onShowSizeChange: (current, _size) => {
      const paginationWithUpdatedPageSize = _brandsPagination;
      paginationWithUpdatedPageSize.pageSize = _size;
      setBrandsPagination(paginationWithUpdatedPageSize);
    },
  });
  const paginationControl = () => ({
    current: selectedSorterFilterPage.currentPage,
    total: _get(selectedBookBrandList, "totalElements", 0),
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    pageSizeOptions: ["10", "20", "50", "100", "500", "1000", "99999"],
    showSizeChanger: _selectedPagination.showSizeChanger,
    position: _selectedPagination.position,
    pageSize: _selectedPagination.pageSize,
    showQuickJumper: _selectedPagination.showQuickJumper,
    onShowSizeChange: (current, _size) => {
      const paginationWithUpdatedPageSize = _selectedPagination;
      paginationWithUpdatedPageSize.pageSize = _size;
      setSelectedPagination(paginationWithUpdatedPageSize);
    },
  });

  const brands = _get(bookBrandsList, "content", []);
  const selectedBrands = _get(selectedBookBrandList, "content", []);

  return (
    <div>
      <Drawer
        title="Select / Remove Popular Brands"
        width={720}
        visible={visible}
        closable={false}
        maskClosable={false}
        bodyStyle={{ paddingBottom: 80 }}
        onClose={close}
        footer={
          <div className="text-right">
            <Button onClick={onCancel} className="mg-right-15">
              Cancel
            </Button>
            <Button onClick={() => onSubmit()} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <Divider orientation="left" className="form-divider first sub-page-title">
          Select New Brand(s)
        </Divider>
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={24} lg={24}>
            <Table
              rowSelection={{
                ...rowSelection,
              }}
              columns={columns}
              loading={bookLoading}
              rowKey="code"
              dataSource={brands}
              onChange={handleBrandTableChange}
              pagination={brandsPaginationControl()}
              scroll={{ y: 240 }}
            />
          </Col>
        </Row>
        <Row className="fields-row mg-top-15 mg-bottom-15" gutter={20} type="flex">
          <Col span={8} xs={24} sm={24} lg={24}>
            <Button type="primary" onClick={addSelected}>
              Add Selected
            </Button>
          </Col>
        </Row>
        <Divider orientation="left" className="form-divider first sub-page-title">
          Selected Brand(s)
        </Divider>
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={24} lg={24}>
            <Table
              rowSelection={{
                ...rowSelectionBrands,
              }}
              columns={columns}
              rowKey="code"
              dataSource={selectedBrands}
              size="middle"
              loading={loading}
              onChange={handleTableChange}
              pagination={paginationControl()}
              scroll={{ y: 240 }}
            />
          </Col>
        </Row>
        {selectedBrands.length ? (
          <Row className="fields-row mg-top-15" gutter={20} type="flex">
            <Col span={8} xs={24} sm={24} lg={24}>
              <Button type="primary" onClick={removeSelected}>
                Remove Selected
              </Button>
            </Col>
          </Row>
        ) : null}
      </Drawer>
    </div>
  );
};

AddRemoveBrands.propTypes = {
  visible: PropTypes.bool,
  close: PropTypes.func,
  bookBrandsList: PropTypes.array,
  bookCode: PropTypes.string,
  getSelectedBrandList: PropTypes.func,
  selectedBookBrandList: PropTypes.object,
  addSelectedBrand: PropTypes.func,
  removeSelectedBrand: PropTypes.func,
  getBookBrandList: PropTypes.func,
  bookLoading: PropTypes.bool,
  loading: PropTypes.bool,
};

export default AddRemoveBrands;
