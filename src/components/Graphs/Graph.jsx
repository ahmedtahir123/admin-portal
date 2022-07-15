import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Row } from "antd";

import { Line } from "@antv/g2plot";

export const Graph = props => {
  const { title, data, id } = props;

  const myFunc = () => {
    const linePlot = new Line(document.getElementById(id), {
      title: {
        visible: true,
        text: title,
      },
      data,
      xField: "date",
      yField: "value",

      seriesField: "type",
    });

    linePlot.render();
  };
  useEffect(() => {
    myFunc();
  }, []);

  return <div id={id}></div>;
};
Graph.propTypes = {
  title: PropTypes.object,
  data: PropTypes.object,
  id: PropTypes.string,
};

export default Graph;
