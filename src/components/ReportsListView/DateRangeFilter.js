import React from "react";
import { DatePicker, Button } from "antd";
import _isEmpty from "lodash/isEmpty";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export default function DateRangeFilter(dataIndex, applyFilter, handleReset) {
  const dateConversion = date => {
    const [start, end] = date;
    let startDate = dayjs(start).startOf("day");
    let endDate = dayjs(end).endOf("day");
    startDate = startDate.valueOf();
    endDate = endDate.valueOf();
    const newDate = `${startDate},${endDate}`;
    return newDate;
  };

  return info => {
    const { selectedKeys, setSelectedKeys, confirm, clearFilters } = info;
    return (
      <div className="session-managment_dropdown-div">
        <RangePicker
          format="DD/MM/YYYY"
          className="session-managment_datepicker"
          onChange={(date, dateString) => setSelectedKeys(date ? dateConversion(date) : null)}
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
