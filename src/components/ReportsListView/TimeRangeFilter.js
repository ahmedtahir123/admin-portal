import React from "react";
import { DatePicker, Button, TimePicker } from "antd";
import _isEmpty from "lodash/isEmpty";
import { TIME_FORMAT } from "../../utils/constants";

const { RangePicker } = DatePicker;

export default function TimeRangeFilter(dataIndex, applyFilter, handleReset) {
  return info => {
    const { selectedKeys, setSelectedKeys, confirm, clearFilters } = info;
    return (
      <div className="session-managment_dropdown-div">
        <RangePicker
          showTime
          // format={TIME_FORMAT}
          className="session-managment_datepicker"
          onChange={(date, dateString) => setSelectedKeys(date ? `${date[0].valueOf()},${date[1].valueOf()}` : null)}
        />
        <br />

        <Button
          type="link"
          size="small"
          disabled={_isEmpty(selectedKeys)}
          onClick={() => handleReset(clearFilters, dataIndex)}
        >
          Reset
        </Button>
        <Button
          className="session-managment_search-btn"
          type="primary"
          onClick={() => applyFilter(selectedKeys, confirm, dataIndex)}
          size="small"
        >
          OK
        </Button>
      </div>
    );
  };
}
