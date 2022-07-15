import React, { useState, useEffect, Fragment } from "react";
import _filter from "lodash/filter";
import PropTypes from "prop-types";
import { Button, Table, Drawer, Switch, Row } from "antd";

const CapabilityDrawer = props => {
  const { loading, dataSource, visibility } = props;
  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: text => <span>{text.split("_")[0]}</span>,
    },
    {
      title: "Subcategory",
      dataIndex: "category",
      key: "status",
      render: text => <span>{text.split("_")[1]}</span>,
    },
    {
      title: "Function",
      dataIndex: "category",
      key: "function",
      render: text => <span>{text.split("_")[2]}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: status => <Switch defaultChecked={status || false} />,
    },
  ];
  return (
    <Fragment>
      <Drawer
        width={720}
        id="drawer"
        title="Capability"
        placement="right"
        closable={false}
        visible={visibility}
        footer={
          <div className="text-right">
            <Button type="primary" className="action-btn mg-right-8" onClick={props.onClose}>
              Close
            </Button>
          </div>
        }
      >
        <Table pagination={false} rowKey="catagory" dataSource={dataSource} columns={columns}></Table>
      </Drawer>
    </Fragment>
  );
};

CapabilityDrawer.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  visibility: PropTypes.bool,
  onClose: PropTypes.func,
};

export default CapabilityDrawer;
