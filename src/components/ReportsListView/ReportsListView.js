import { Button, Col, DatePicker, Row, Table, Divider } from "antd";
import _get from "lodash/get";
import _identity from "lodash/identity";
import _map from "lodash/map";
import _pickBy from "lodash/pickBy";
import _isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import dayjs from "dayjs";
import { get } from "../../services/http.service";
import ReportsService from "../../services/reports.service";
import { ERROR_MESSAGE } from "../../utils/constants";
import { throwError, to, toastMessage } from "../../utils/utils";
import renderDateRangeFilter from "./DateRangeFilter";
import renderTextSearchFilter from "./TextSearchFilter";
import renderTimeRangeFilter from "./TimeRangeFilter";

const { RangePicker } = DatePicker;

const ReportsListView = props => {
  const { reportConfig, columns, scrolling } = props;
  const DEFAULT_SORTER = { field: "updatedAt", order: "desc" };

  const [mappedColumns, setMappedColumns] = useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoader] = useState(false);
  // For api query
  const [query, setQuery] = useState({
    currentPage: 1,
    pageSize: 10,
    filters: {},
  });
  // For antd pagination
  const [_pagination, setPagination] = useState({});

  useEffect(() => {
    const _query = queryGenerator(query);
    getList(_query);
  }, []);

  const applyFilter = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };

  const handleReset = (clearFilters, dataIndex) => {
    clearFilters();
  };

  useEffect(() => {
    const mColumns = _map(columns, ({ filterConfig, key: dataIndex, ...rest }) => {
      const _filter = {};
      if (!filterConfig) return { ...rest };
      if (filterConfig.filterType === "text") {
        _filter.filterDropdown = renderTextSearchFilter(dataIndex, applyFilter, handleReset);
      }
      if (filterConfig.filterType === "date") {
        _filter.filterDropdown = renderDateRangeFilter(dataIndex, applyFilter, handleReset);
      }
      if (filterConfig.filterType === "time") {
        _filter.filterDropdown = renderTimeRangeFilter(dataIndex, applyFilter, handleReset);
      }
      if (filterConfig.filterType === "radio") {
        _filter.filterMultiple = false;
        _filter.filters = filterConfig.filters;
      }
      if (filterConfig.filterType === "checkBox") {
        _filter.filters = filterConfig.filters;
      }
      return { ...rest, key: dataIndex, ..._filter };
    });
    setMappedColumns(mColumns);
  }, []);

  const getList = async _query => {
    try {
      setLoader(true);
      const [err, response] = await to(ReportsService.getReport(reportConfig.url, _query));
      if (err) throwError(err);

      const { content, ...pagination } = response;
      setLoader(false);
      setList(content);
      setPagination(pagination);
    } catch (error) {
      console.log(error);
      setLoader(false);
      toastMessage("error", ERROR_MESSAGE.LIST);
    }
  };

  const _generateReport = () => {
    const _query = queryGenerator(query);
    getList(_query);
  };

  const queryGenerator = payload => {
    const sort = `${DEFAULT_SORTER.field},${DEFAULT_SORTER.order}`;

    const { currentPage, pageSize, filters } = payload;
    setQuery(payload);

    return {
      page: currentPage - 1,
      size: pageSize,
      filters,
      sort,
    };
  };

  const handleTableChange = async (pageInfo, filters) => {
    const _filters = _pickBy(filters, _identity);
    if (query.filters.startDate && query.filters.endDate) {
      _filters.startDate = query.filters.startDate;
      _filters.endDate = query.filters.endDate;
    }
    const payload = {
      currentPage: pageInfo.current,
      pageSize: pageInfo.pageSize,
      filters: _filters,
    };
    setPagination(pageInfo);
    const _query = queryGenerator(payload);
    await getList(_query);
  };

  const paginationControl = () => ({
    current: query.currentPage,
    total: _get(_pagination, "totalElements", 0),
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    pageSizeOptions: [10, 20, 50, 100, 500, 1000, 99999],
    showSizeChanger: true,
    position: "bottom",
    pageSize: query.pageSize,
    showQuickJumper: true,
    onShowSizeChange: (current, _size) => {
      const paginationWithUpdatedPageSize = _pagination;
      paginationWithUpdatedPageSize.pageSize = _size;
      setPagination(paginationWithUpdatedPageSize);
    },
  });

  const downloadCSV = async () => {
    try {
      const _query = queryGenerator(query);
      _query.page = 0;
      _query.size = 2147483647;
      const [err, response] = await to(ReportsService.downloadCSV(reportConfig.url, _query));
      const link = document.createElement("a");
      link.href = URL.createObjectURL(response);
      link.download = `${reportConfig.fileName}`;
      link.click();
      if (err) throwError(err);
    } catch (error) {
      toastMessage("error", ERROR_MESSAGE.FILE);
    }
  };

  const dateChangeHandler = range => {
    const [start, end] = range || [];
    let payload = {};

    if (start && end) {
      let startDate = dayjs(start).startOf("day");
      let endDate = dayjs(end).endOf("day");
      startDate = startDate.valueOf();
      endDate = endDate.valueOf();
      payload = { ...query, filters: { ...query.filters, startDate, endDate } };
      const _query = queryGenerator(payload);
    } else {
      const str = { ...query };
      delete str.filters.startDate;
      delete str.filters.endDate;
      payload = { ...str, filters: { ...str.filters } };
      const _query = queryGenerator(payload);
      _generateReport(_query);
    }
  };

  return (
    <Fragment>
      <div className="ReportsListView">
        <Row align="middle" justify="space-between">
          <Col span={6} xs={24} sm={6} lg={12}>
            <Row align="middle" justify="space-between">
              <Col span={6} xs={24} sm={6} lg={14}>
                <RangePicker onChange={dateChangeHandler} />
              </Col>
              <Col span={6} xs={24} sm={6} lg={8}>
                <Button type="primary" onClick={_generateReport}>
                  Apply
                </Button>
              </Col>
            </Row>
          </Col>
          <Col span={6} xs={24} sm={6} lg={12} className="text-right">
            <Button type="primary" onClick={downloadCSV}>
              Download
            </Button>
          </Col>
        </Row>
        <Divider />
        <Table
          dataSource={list}
          columns={mappedColumns}
          size="middle"
          onChange={handleTableChange}
          pagination={paginationControl()}
          loading={loading}
          scroll={scrolling ? { x: 2000 } : false}
          // scroll={{ x: 1500 }}
        />
      </div>
    </Fragment>
  );
};

ReportsListView.defaultProps = {
  scrolling: true,
};

ReportsListView.propTypes = {
  columns: PropTypes.array.isRequired,
  scrolling: PropTypes.bool,
  reportConfig: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};

export default ReportsListView;
