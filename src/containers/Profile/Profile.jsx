import React from "react";
// import PropTypes from "prop-types";
import { Divider, Card, Row, Col } from "antd";
import "./Profile.scss";

const ProfileContainer = () => (
  <div className="profile">
    <Divider orientation="left" className="form-divider first">
      Profile
    </Divider>

    <Card>
      <Row className="field-row">
        <Col span={8} xs={24} sm={12} lg={8}>
          <b>Full Name:</b>
        </Col>
        <Col span={8} xs={24} sm={12} lg={8}>
          Mickey
        </Col>
      </Row>

      <Divider></Divider>

      <Row className="field-row">
        <Col span={8} xs={24} sm={12} lg={8}>
          <b>Email address:</b>
        </Col>
        <Col span={8} xs={24} sm={12} lg={8}>
          mickey@gmail.com
        </Col>
      </Row>
      <Divider></Divider>
      <Row className="field-row">
        <Col span={8} xs={24} sm={12} lg={8}>
          <b>Contacts:</b>
        </Col>
        <Col span={8} xs={24} sm={12} lg={8}>
          092-14563889
        </Col>
      </Row>
      <Divider></Divider>
      <Row className="field-row">
        <Col span={8} xs={24} sm={12} lg={8}>
          <b>User type:</b>
        </Col>
        <Col span={8} xs={24} sm={12} lg={8}>
          Admin
        </Col>
      </Row>
    </Card>
  </div>
);

ProfileContainer.propTypes = {};

export default ProfileContainer;
