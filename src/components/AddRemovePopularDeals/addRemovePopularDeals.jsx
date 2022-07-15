import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Drawer, Button, Row, Col, Table, Divider } from "antd";
import _get from "lodash/get";
import _isNumber from "lodash/isNumber";
import { queryGenerator } from "../../utils/utils";

export const AddRemovePopularDeals = ({
  visible,
  close,
  bookCode,
  getSelectedDealsList,
  selectedDeals,
  getSelectedPopularDealsList,
  popularDealLoading,
  popularSelectedDeals,
  addSelectedPopularDeals,
  removeSelectedPopularDeals,
  selectedDealsListLoading,
}) => {
  const [rowsSelected, setRowsSelected] = useState([]);
  const [rowsSelectedKey, setRowsSelectedKey] = useState([]);
  const [rowsSelectedDeals, setRowsSelectedDeals] = useState([]);
  const [rowsSelectedDealsKey, setRowsSelectedDealsKey] = useState([]);

  const [selectedPopularSorterFilterPage, setSelectedPopularSorterFilterPage] = useState(() => {
    let cPage = _get(popularSelectedDeals, "number");
    cPage = _isNumber(cPage) ? cPage + 1 : 1;
    return {
      currentPage: cPage,
      pageSize: _get(popularSelectedDeals, "size", 10),
      sorter: {},
      filters: {},
    };
  });

  const [selectedSorterFilterPage, setSelectedSorterFilterPage] = useState(() => {
    let cPage = _get(selectedDeals, "number");
    cPage = _isNumber(cPage) ? cPage + 1 : 1;
    return {
      currentPage: cPage,
      pageSize: _get(selectedDeals, "size", 10),
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
    ...selectedDeals,
  });
  const [_selectedPopularPagination, setSelectedPopularPagination] = useState({
    current: selectedPopularSorterFilterPage.currentPage,
    showSizeChanger: true,
    position: "bottom",
    pageSize: selectedPopularSorterFilterPage.pageSize,
    showQuickJumper: true,
    ...selectedDeals,
  });

  const columns = [
    {
      title: "Deal",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
    },
  ];

  useEffect(() => {
    if (visible) {
      const _query = queryGenerator(selectedSorterFilterPage);
      // getSelectedDealsList(bookCode, _query);
      // const _query = queryGenerator(selectedSorterFilterPage);
      getSelectedPopularDealsList(bookCode, _query);
    }
  }, [visible]);

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
    await getSelectedDealsList(bookCode, query);
    setSelectedPagination(pageInfo);
  };

  const handlePopularTableChange = async (pageInfo, filters, sorter) => {
    const payload = {
      currentPage: pageInfo.current,
      pageSize: pageInfo.pageSize,
      sorter,
      filters,
    };
    if (_selectedPagination.current !== pageInfo.current) setRowsSelected([]);
    setSelectedPopularSorterFilterPage(payload);
    const query = queryGenerator(payload);
    await getSelectedPopularDealsList(bookCode, query);
    setSelectedPopularPagination(pageInfo);
  };

  const paginationControl = () => ({
    current: selectedSorterFilterPage.currentPage,
    total: _get(selectedDeals, "totalElements", 0),
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

  const selectedPopularPaginationControl = () => ({
    current: selectedPopularSorterFilterPage.currentPage,
    total: _get(popularSelectedDeals, "totalElements", 0),
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    pageSizeOptions: ["10", "20", "50", "100", "500", "1000", "99999"],
    showSizeChanger: _selectedPopularPagination.showSizeChanger,
    position: _selectedPopularPagination.position,
    pageSize: _selectedPopularPagination.pageSize,
    showQuickJumper: _selectedPopularPagination.showQuickJumper,
    onShowSizeChange: (current, _size) => {
      const paginationWithUpdatedPageSize = _selectedPopularPagination;
      paginationWithUpdatedPageSize.pageSize = _size;
      setSelectedPopularPagination(paginationWithUpdatedPageSize);
    },
  });

  const rowSelectionDeals = {
    selectedRowKeys: rowsSelectedDealsKey,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
      setRowsSelectedDeals([...selectedRows]);
      setRowsSelectedDealsKey(selectedRowKeys);
    },
  };
  const addSelected = async () => {
    if (rowsSelectedKey.length > 0) {
      try {
        await addSelectedPopularDeals(bookCode, rowsSelectedKey);
        const _query = queryGenerator(selectedSorterFilterPage);
        await getSelectedPopularDealsList(bookCode, _query);
        setRowsSelectedKey([]);
      } catch (err) {
        console.log("add selected err", err);
      }
    }
  };

  const removeSelected = async () => {
    if (rowsSelectedDealsKey.length > 0) {
      try {
        await removeSelectedPopularDeals(bookCode, rowsSelectedDealsKey);
        const _query = queryGenerator(selectedSorterFilterPage);
        await getSelectedPopularDealsList(bookCode, _query);
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
    setRowsSelectedDealsKey([]);
    setRowsSelectedKey([]);
    close();
  };

  const onCancel = () => {
    setRowsSelectedDealsKey([]);
    setRowsSelectedKey([]);
    close();
  };

  const selectedDealsArr = _get(selectedDeals, "content", []);
  const popularSelectedDealsArr = _get(popularSelectedDeals, "content", []);

  return (
    <div>
      <Drawer
        title="Add or Remove Popular Deals"
        width={720}
        visible={visible}
        closable={false}
        maskClosable={false}
        bodyStyle={{ paddingBottom: 80 }}
        onClose={onCancel}
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
          Select New Deal(s)
        </Divider>
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={24} lg={24}>
            <Table
              rowSelection={{
                ...rowSelection,
              }}
              columns={columns}
              rowKey="code"
              dataSource={selectedDealsArr}
              size="middle"
              loading={selectedDealsListLoading}
              onChange={handleTableChange}
              pagination={paginationControl()}
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
          Selected Deal(s)
        </Divider>
        <Row className="fields-row" gutter={20} type="flex">
          <Col span={8} xs={24} sm={24} lg={24}>
            <Table
              rowSelection={{
                ...rowSelectionDeals,
              }}
              columns={columns}
              loading={popularDealLoading}
              rowKey="code"
              dataSource={popularSelectedDealsArr}
              onChange={handlePopularTableChange}
              pagination={selectedPopularPaginationControl()}
              scroll={{ y: 240 }}
            />
          </Col>
        </Row>
        {popularSelectedDealsArr.length ? (
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

AddRemovePopularDeals.propTypes = {
  visible: PropTypes.bool,
  selectedDealsListLoading: PropTypes.bool,
  close: PropTypes.func,
  selectedDeals: PropTypes.object,
  popularDealLoading: PropTypes.bool,
  getSelectedDealsList: PropTypes.func,
  getSelectedPopularDealsList: PropTypes.func,
  addSelectedPopularDeals: PropTypes.func,
  removeSelectedPopularDeals: PropTypes.func,
  popularSelectedDeals: PropTypes.object,
  bookCode: PropTypes.string,
};

export default AddRemovePopularDeals;
