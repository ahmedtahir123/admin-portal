import { Button, Input, Space } from "antd";
import _isEmpty from "lodash/isEmpty";
import React from "react";

export default function renderTextSearchFilter(dataIndex, applyFilter, handleReset) {
  return param => {
    console.log("filterDropdown", param);
    const { setSelectedKeys, selectedKeys, confirm, clearFilters } = param;
    return (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys}
          onChange={e => setSelectedKeys(e.target.value ? e.target.value : null)}
          onPressEnter={() => {
            applyFilter(selectedKeys, confirm, dataIndex);
          }}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="link"
            size="small"
            style={{ width: 90 }}
            disabled={_isEmpty(selectedKeys)}
            onClick={() => handleReset(clearFilters, dataIndex)}
          >
            Reset
          </Button>
          <Button
            type="primary"
            onClick={() => {
              applyFilter(selectedKeys, confirm, dataIndex);
            }}
            size="small"
            style={{ width: 90 }}
          >
            OK
          </Button>
        </Space>
      </div>
    );
  };
}
