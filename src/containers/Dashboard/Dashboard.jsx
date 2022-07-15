import React from "react";
import "./Dashboard.scss";
import { Divider } from "antd";

const DashboardContainer = props => (
  <div className="dashboard">
    <Divider orientation="left" className="form-divider first">
      Home
    </Divider>
    <h2 className="text-center">Welcome to our BOGO Dashboard!</h2>
  </div>
);

export default DashboardContainer;
