import React from "react";
import { Radio } from "antd";
import PropTypes from "prop-types";
import _map from "lodash/map";
import "./StatusRadioButtons.scss";

export const StatusRadioButtons = ({ currentStatus, defaultValue, readOnly }) => (
  <Radio.Group className="partner__radio-group" value={defaultValue}>
    {_map(currentStatus, value => (
      <Radio.Button
        key={value.code}
        className="partner__radio-button"
        disabled={readOnly ? value.code !== defaultValue : false}
        value={value.code}
      >
        {value.name}
      </Radio.Button>
    ))}
  </Radio.Group>
);

StatusRadioButtons.defaultProps = {
  readOnly: true,
};

StatusRadioButtons.propTypes = {
  currentStatus: PropTypes.array,
  defaultValue: PropTypes.string,
  readOnly: PropTypes.bool,
};
