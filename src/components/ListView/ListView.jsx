import { Button, Col, message, Popconfirm, Row, Table } from "antd";
import _get from "lodash/get";
import _isArray from "lodash/isArray";
import _isEmpty from "lodash/isEmpty";
import _isNumber from "lodash/isNumber";
// import _filter from "lodash/filter";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CONFIRM_MESSAGE, DEFAULT_SORTER, EMPTY_MESSAGE, STATUS } from "../../utils/constants";
import { queryGenerator } from "../../utils/utils";

const ListView = props => {
  const {
    addButton,
    canAdd,
    canChangeStatus,
    canDelete,
    columns,
    customButton,
    dataSource,
    deleteAllData,
    disableButton,
    enableButton,
    getList,
    loading,
    pagination,
    rowKey,
    scroll,
    size,
    deliveryStartButton,
    deliveryCompletedButton,
    deliveryFailedButton,
    paymentPaidButton,
    resumeButton,
    retireButton,
    suspendButton,
    cloneButton,
    sessionIdValue,
  } = props;

  const [rowsSelected, setRowsSelected] = useState([]);
  const [deleteText, setDeleteText] = useState("Delete");
  const [_enableText, _setEnableText] = useState(enableButton.text);
  const [_disableText, _setDisableText] = useState(disableButton.text);
  const [_deliveryStart, setDeliveryStart] = useState(deliveryStartButton.text);
  const [_resume, setResume] = useState(resumeButton.text);
  const [_retire, setRetire] = useState(retireButton.text);
  const [_suspend, setSuspend] = useState(suspendButton.text);
  const [_clone, setClone] = useState(cloneButton.text);
  const [_deliveryCompleted, setDeliveryCompleted] = useState(deliveryCompletedButton.text);
  const [_deliveryFailed, setDeliveryFailed] = useState(deliveryFailedButton.text);
  const [_paymentPaid, setPaymentPaid] = useState(paymentPaidButton.text);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [enableLoader, setEnableLoader] = useState(false);
  const [disableLoader, setDisableLoader] = useState(false);
  const [deliveryStartLoader, setDeliveryStartLoader] = useState(false);
  const [deliveryCompletedLoader, setDeliveryCompletedLoader] = useState(false);
  const [deliveryFailedLoader, setDeliveryFailedLoader] = useState(false);
  const [paymentPaidLoader, setPaymentPaidLoader] = useState(false);
  const [resumeLoader, setResumeLoader] = useState(false);
  const [retireLoader, setRetireLoader] = useState(false);
  const [suspendLoader, setSuspendLoader] = useState(false);
  const [cloneLoader, setCloneLoader] = useState(false);

  // For api query
  const [sorterFilterPage, setSorterFilterPage] = useState(() => {
    let cPage = _get(pagination, "number");
    cPage = _isNumber(cPage) ? cPage + 1 : 1;
    return {
      currentPage: cPage,
      pageSize: _get(pagination, "size", 10),
      sorter: DEFAULT_SORTER,
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
    ...pagination,
  });
  useEffect(() => {
    const _query = { ...queryGenerator(sorterFilterPage), ...(sessionIdValue ? { sessionId: sessionIdValue } : {}) };
    getList(_query);
  }, []);

  const onSelectChange = selectedRowKeys => {
    const selectedCount = selectedRowKeys.length || 0;
    if (selectedCount === 1) {
      setDeleteText(`Delete Selected`);
      _setEnableText(`${enableButton.text} Selected`);
      _setDisableText(`${disableButton.text} Selected`);
      if (deliveryStartButton.text) {
        setDeliveryStart(`${deliveryStartButton.text} Selected`);
        setDeliveryCompleted(`${deliveryCompletedButton.text} Selected`);
        setDeliveryFailed(`${deliveryFailedButton.text} Selected`);
        setPaymentPaid(`${paymentPaidButton.text} Selected`);
      } else if (resumeButton.text) {
        setResume(`${resumeButton.text} Selected`);
        setRetire(`${retireButton.text} Selected`);
        setSuspend(`${suspendButton.text} Selected`);
        setClone(`${cloneButton.text} Selected`);
      }
    } else if (selectedCount > 1) {
      setDeleteText(`Delete All ${selectedCount}`);
      _setEnableText(`${enableButton.text} All ${selectedCount}`);
      _setDisableText(`${disableButton.text} All ${selectedCount}`);
      if (deliveryStartButton.text) {
        setDeliveryStart(`${deliveryStartButton.text} All ${selectedCount}`);
        setDeliveryCompleted(`${deliveryCompletedButton.text} All ${selectedCount}`);
        setDeliveryFailed(`${deliveryFailedButton.text} All ${selectedCount}`);
        setPaymentPaid(`${paymentPaidButton.text} All ${selectedCount}`);
      } else if (resumeButton.text) {
        setResume(`${resumeButton.text} All ${selectedCount}`);
        setRetire(`${retireButton.text} All ${selectedCount}`);
        setSuspend(`${suspendButton.text} All ${selectedCount}`);
        setClone(`${cloneButton.text}`);
      }
    } else {
      setDeleteText(`Delete`);
      _setEnableText(`${enableButton.text}`);
      _setDisableText(`${disableButton.text}`);
      if (deliveryStartButton.text) {
        setDeliveryStart(`${deliveryStartButton.text}`);
        setDeliveryCompleted(`${deliveryCompletedButton.text}`);
        setDeliveryFailed(`${deliveryFailedButton.text}`);
        setPaymentPaid(`${paymentPaidButton.text}`);
      } else if (resumeButton.text) {
        setResume(`${resumeButton.text}`);
        setRetire(`${retireButton.text}`);
        setSuspend(`${suspendButton.text}`);
        setClone(`${cloneButton.text}`);
      }
    }

    setRowsSelected(selectedRowKeys);
  };

  const resetStates = () => {
    setRowsSelected([]);
    setDeleteText("Delete");
    _setEnableText(enableButton.text);
    _setDisableText(disableButton.text);
    if (deliveryStartButton.text) {
      setDeliveryStart(`${deliveryStartButton.text}`);
      setDeliveryCompleted(`${deliveryCompletedButton.text}`);
      setDeliveryFailed(`${deliveryFailedButton.text}`);
      setPaymentPaid(`${paymentPaidButton.text}`);
    } else if (resumeButton.text) {
      setResume(`${resumeButton.text}`);
      setRetire(`${retireButton.text}`);
      setSuspend(`${suspendButton.text}`);
      setClone(`${cloneButton.text}`);
    }
  };
  const _rowSelection = {
    selectedRowKeys: rowsSelected,
    onChange: onSelectChange,
  };
  const hasCount = rowsSelected.length;
  const _deleteAll = async () => {
    if (!hasCount) {
      message.info(EMPTY_MESSAGE);
      return;
    }
    setDeleteLoader(true);
    const codes = rowsSelected.join(",");
    try {
      // Shhhhh...... Algorithm @ Work, to find if there is need to goto previous page
      const totalSupportedRecords = sorterFilterPage.currentPage * sorterFilterPage.pageSize;
      const shouldDecreasePage =
        totalSupportedRecords - (pagination.totalElements - rowsSelected.length) === sorterFilterPage.pageSize;
      const _sorterFilterPage = {
        ...sorterFilterPage,
        currentPage: shouldDecreasePage ? sorterFilterPage.currentPage - 1 : sorterFilterPage.currentPage,
      };
      const _query = queryGenerator(_sorterFilterPage);
      await deleteAllData(codes, _query);
      setDeleteLoader(false);
      setSorterFilterPage(_sorterFilterPage);
      resetStates();
    } catch (err) {
      setDeleteLoader(false);
    }
  };

  const _onEnable = async () => {
    if (!hasCount) {
      message.info(EMPTY_MESSAGE);
      return;
    }
    setEnableLoader(true);
    const codes = rowsSelected.join(",");
    try {
      const _query = queryGenerator(sorterFilterPage);
      await enableButton.handler(codes, true, _query);
      setEnableLoader(false);
      resetStates();
    } catch (err) {
      setEnableLoader(false);
    }
  };

  const _onDisable = async () => {
    if (!hasCount) {
      message.info(EMPTY_MESSAGE);
      return;
    }
    setDisableLoader(true);
    const codes = rowsSelected.join(",");
    try {
      const _query = queryGenerator(sorterFilterPage);
      await disableButton.handler(codes, false, _query);
      setDisableLoader(false);
      resetStates();
    } catch (err) {
      setDisableLoader(false);
    }
  };
  const deliveryStart = async status => {
    if (!hasCount) {
      message.info(EMPTY_MESSAGE);
      return;
    }
    setDeliveryStartLoader(true);
    try {
      const codes = rowsSelected.join(",");
      const _query = queryGenerator(sorterFilterPage);
      resetStates();
      await deliveryStartButton.handler(codes, status, _query);
      setDeliveryStartLoader(false);
    } catch (err) {
      setDeliveryStartLoader(false);
    }
  };
  const deliveryFailed = async status => {
    if (!hasCount) {
      message.info(EMPTY_MESSAGE);
      return;
    }
    setDeliveryFailedLoader(true);
    try {
      const codes = rowsSelected.join(",");
      const _query = queryGenerator(sorterFilterPage);
      resetStates();
      await deliveryFailedButton.handler(codes, status, _query);
      setDeliveryFailedLoader(false);
    } catch (err) {
      setDeliveryFailedLoader(false);
    }
  };
  const deliveryCompleted = async status => {
    if (!hasCount) {
      message.info(EMPTY_MESSAGE);
      return;
    }
    setDeliveryCompletedLoader(true);
    try {
      const codes = rowsSelected.join(",");
      const _query = queryGenerator(sorterFilterPage);
      resetStates();
      await deliveryCompletedButton.handler(codes, status, _query);
      setDeliveryCompletedLoader(false);
    } catch (err) {
      setDeliveryCompletedLoader(false);
    }
  };
  const paymentPaid = async status => {
    if (!hasCount) {
      message.info(EMPTY_MESSAGE);
      return;
    }
    setPaymentPaidLoader(true);
    try {
      const codes = rowsSelected.join(",");
      const _query = queryGenerator(sorterFilterPage);
      resetStates();
      await paymentPaidButton.handler(codes, status, _query);
      setPaymentPaidLoader(false);
    } catch (err) {
      setPaymentPaidLoader(false);
    }
  };

  const resume = () => {
    if (!hasCount) {
      message.info(EMPTY_MESSAGE);
      return;
    }
    setResumeLoader(true);
    try {
      const codes = rowsSelected.join(",");
      const _query = queryGenerator(sorterFilterPage);
      resetStates();
      resumeButton.handler(codes, _query);
      setResumeLoader(false);
    } catch (err) {
      setResumeLoader(false);
    }
  };
  const clone = () => {
    if (!hasCount) {
      message.info(EMPTY_MESSAGE);
      return;
    }
    setCloneLoader(true);
    try {
      const codes = rowsSelected.join(",");
      const _query = queryGenerator(sorterFilterPage);
      resetStates();
      cloneButton.handler(codes, _query);
      setCloneLoader(false);
    } catch (err) {
      setCloneLoader(false);
    }
  };
  const retire = () => {
    if (!hasCount) {
      message.info(EMPTY_MESSAGE);
      return;
    }
    setRetireLoader(true);
    try {
      const codes = rowsSelected.join(",");
      const _query = queryGenerator(sorterFilterPage);
      resetStates();
      retireButton.handler(codes, _query);
      setRetireLoader(false);
    } catch (err) {
      setRetireLoader(false);
    }
  };
  const suspend = () => {
    if (!hasCount) {
      message.info(EMPTY_MESSAGE);
      return;
    }
    setSuspendLoader(true);
    try {
      const codes = rowsSelected.join(",");
      const _query = queryGenerator(sorterFilterPage);
      resetStates();
      suspendButton.handler(codes, _query);
      setSuspendLoader(false);
    } catch (err) {
      setSuspendLoader(false);
    }
  };

  const handleTableChange = async (pageInfo, filters, sorter) => {
    const payload = {
      currentPage: pageInfo.current,
      pageSize: pageInfo.pageSize,
      sorter: _isEmpty(sorter) ? DEFAULT_SORTER : sorter,
      filters,
    };
    if (_pagination.current !== pageInfo.current) setRowsSelected([]);
    setSorterFilterPage(payload);
    const query = queryGenerator(payload);
    await getList(query);
    setPagination(pageInfo);
  };

  const paginationControl = () => ({
    current: sorterFilterPage.currentPage,
    total: _get(pagination, "totalElements", 0),
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

  const _dataSource = _isArray(dataSource) ? dataSource : [];

  // const selectRow = key => {
  //   let selectedRowKeys = rowsSelected;
  //   if (selectedRowKeys.includes(key)) {
  //     selectedRowKeys = _filter(selectedRowKeys, i => i !== key);
  //   } else {
  //     selectedRowKeys.push(key);
  //   }
  //   setRowsSelected([...selectedRowKeys]);
  // };

  return (
    <Fragment>
      <div className="listView">
        <Table
          rowSelection={_rowSelection}
          dataSource={_dataSource}
          columns={columns}
          size={size}
          onChange={handleTableChange}
          pagination={paginationControl()}
          loading={loading}
          rowKey={rowKey || columns[0].key}
          scroll={scroll}
          // onRow={record => ({
          //   onClick: () => {
          //     selectRow(record[rowKey]);
          //   },
          // })}
        ></Table>
      </div>
      <Row className="fields-row pad-top-10" gutter={24}>
        <Col span={4} xs={24} sm={4} lg={4}></Col>
        <Col span={20} xs={24} sm={20} lg={20}>
          <Row align="middle" justify="end">
            {customButton && (
              <Col span={6} xs={24} sm={6} lg={6} className="text-right">
                <Button
                  type={customButton.type || "secondary"}
                  loading={customButton.loading || false}
                  onClick={customButton.handler ? customButton.handler : () => {}}
                >
                  {customButton.text}
                </Button>
              </Col>
            )}
            {canDelete && (
              <Col span={6} xs={24} sm={6} lg={6} className="text-right">
                <Popconfirm
                  title={CONFIRM_MESSAGE.DELETE}
                  onConfirm={_deleteAll}
                  onCancel={() => {}}
                  okText="Yes"
                  cancelText="No"
                  // disabled={!hasCount}
                  disabled
                >
                  {/* disabled={!hasCount} */}
                  <Button type="danger" disabled loading={deleteLoader}>
                    {deleteText}
                  </Button>
                </Popconfirm>
              </Col>
            )}
            {canChangeStatus && !_isEmpty(enableButton) && (
              <Col span={6} xs={24} sm={6} lg={6} className="text-right">
                <Popconfirm
                  title={CONFIRM_MESSAGE.ENABLE}
                  onConfirm={_onEnable}
                  onCancel={() => {}}
                  okText="Yes"
                  cancelText="No"
                  disabled={!hasCount}
                >
                  <Button type={enableButton.type || "secondary"} disabled={!hasCount} loading={enableLoader}>
                    {_enableText}
                  </Button>
                </Popconfirm>
              </Col>
            )}
            {canChangeStatus && !_isEmpty(disableButton.text) && (
              <Col span={6} xs={24} sm={6} lg={6} className="text-right">
                <Popconfirm
                  title={CONFIRM_MESSAGE.DISABLE}
                  onConfirm={_onDisable}
                  onCancel={() => {}}
                  okText="Yes"
                  cancelText="No"
                  disabled={!hasCount}
                >
                  <Button type={disableButton.type || "secondary"} disabled={!hasCount} loading={disableLoader}>
                    {_disableText}
                  </Button>
                </Popconfirm>
              </Col>
            )}
            {canAdd && (
              <Col span={6} xs={24} sm={6} lg={6} className="text-right">
                <Link to={addButton.route}>
                  <Button type="primary">{addButton.text}</Button>
                </Link>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      {deliveryStartButton.text ? (
        <Row className="fields-row mg-top-15" gutter={24} align="middle" justify="end">
          <Col span={2} xs={24} sm={2} lg={2}></Col>
          <Col span={20} xs={24} sm={22} lg={22}>
            <Row align="middle" justify="end">
              <Col span={6} xs={24} sm={6} lg={6} className="text-right">
                <Button
                  loading={deliveryStartLoader}
                  onClick={() => deliveryStart(STATUS.IN_DELIVERY)}
                  type="secondary"
                  disabled={!hasCount}
                >
                  {_deliveryStart}
                </Button>
              </Col>
              <Col span={6} xs={24} sm={6} lg={6} className="text-right">
                <Button
                  loading={deliveryCompletedLoader}
                  type="secondary"
                  onClick={() => deliveryCompleted(STATUS.DELIVERED)}
                  disabled={!hasCount}
                >
                  {_deliveryCompleted}
                </Button>
              </Col>

              <Col span={6} xs={24} sm={6} lg={6} className="text-right">
                <Button
                  loading={deliveryFailedLoader}
                  type="secondary"
                  disabled={!hasCount}
                  onClick={() => deliveryFailed(STATUS.FAILED)}
                >
                  {_deliveryFailed}
                </Button>
              </Col>
              <Col span={6} xs={24} sm={6} lg={6} className="text-right">
                <Button
                  loading={paymentPaidLoader}
                  disabled={!hasCount}
                  type="secondary"
                  onClick={() => paymentPaid(STATUS.PAID)}
                >
                  {_paymentPaid}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : null}
      {resumeButton.text ? (
        <Row className="fields-row mg-top-15" gutter={24} align="middle" justify="end">
          <Col span={4} xs={24} sm={4} lg={4}></Col>
          <Col span={20} xs={24} sm={20} lg={20}>
            <Row align="middle" justify="end">
              <Col span={6} xs={24} sm={6} lg={6} className="text-right">
                <Button loading={resumeLoader} onClick={() => resume()} type="secondary" disabled={!hasCount}>
                  {_resume}
                </Button>
              </Col>
              <Col span={6} xs={24} sm={6} lg={6} className="text-right">
                <Button
                  loading={cloneLoader}
                  onClick={() => clone()}
                  type="secondary"
                  disabled={!hasCount || hasCount > 1}
                >
                  {_clone}
                </Button>
              </Col>
              <Col span={6} xs={24} sm={6} lg={6} className="text-right">
                <Button loading={retireLoader} onClick={() => retire()} type="secondary" disabled={!hasCount}>
                  {_retire}
                </Button>
              </Col>
              <Col span={6} xs={24} sm={6} lg={6} className="text-right">
                <Button loading={suspendLoader} onClick={() => suspend()} type="secondary" disabled={!hasCount}>
                  {_suspend}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : null}
    </Fragment>
  );
};

ListView.defaultProps = {
  dataSource: [],
  rowSelection: {},
  size: "middle",
  pagination: {},
  canAdd: false,
  canDelete: false,
  canChangeStatus: false,
  scroll: null,
  enableButton: {
    text: "",
    handler: () => {},
  },
  disableButton: {
    text: "",
    handler: () => {},
  },
  deliveryStartButton: {
    text: "",
    handler: () => {},
  },
  deliveryFailedButton: {
    text: "",
    handler: () => {},
  },
  deliveryCompletedButton: {
    text: "",
    handler: () => {},
  },
  paymentPaidButton: {
    text: "",
    handler: () => {},
  },
  resumeButton: {
    text: "",
    handler: () => {},
  },
  suspendButton: {
    text: "",
    handler: () => {},
  },
  retireButton: {
    text: "",
    handler: () => {},
  },
  cloneButton: {
    text: "",
    handler: () => {},
  },
};

ListView.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  deleteAllData: PropTypes.func,
  sessionIdValue: PropTypes.number,
  enableButton: PropTypes.shape({
    text: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
    type: PropTypes.string,
  }),
  disableButton: PropTypes.shape({
    text: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
    type: PropTypes.string,
  }),
  getList: PropTypes.func,
  rowSelection: PropTypes.shape({
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func,
  }),
  size: PropTypes.string,
  addButton: PropTypes.shape({
    text: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
  }),
  customButton: PropTypes.shape({
    text: PropTypes.string,
    handler: PropTypes.func,
    type: PropTypes.string,
    loading: PropTypes.bool,
  }),
  rowKey: PropTypes.string,
  pagination: PropTypes.object,
  columns: PropTypes.array.isRequired,
  canAdd: PropTypes.bool,
  canDelete: PropTypes.bool,
  canChangeStatus: PropTypes.bool,
  scroll: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  deliveryStartButton: PropTypes.shape({
    text: PropTypes.string,
    handler: PropTypes.func,
  }),
  deliveryCompletedButton: PropTypes.shape({
    text: PropTypes.string,
    handler: PropTypes.func,
  }),
  deliveryFailedButton: PropTypes.shape({
    text: PropTypes.string,
    handler: PropTypes.func,
  }),
  paymentPaidButton: PropTypes.shape({
    text: PropTypes.string,
    handler: PropTypes.func,
  }),
  resumeButton: PropTypes.shape({
    text: PropTypes.string,
    handler: PropTypes.func,
  }),
  retireButton: PropTypes.shape({
    text: PropTypes.string,
    handler: PropTypes.func,
  }),
  suspendButton: PropTypes.shape({
    text: PropTypes.string,
    handler: PropTypes.func,
  }),
  cloneButton: PropTypes.shape({
    text: PropTypes.string,
    handler: PropTypes.func,
  }),
};

export default ListView;
