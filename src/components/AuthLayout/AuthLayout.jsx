// import { isLoggedIn } from "../../utils/auth.utils";
import { Card, Col, Divider, Layout, Row } from "antd";
import PropTypes from "prop-types";
import React from "react";
import logo from "../../images/bogo_logo.png";
import CarouselComp from "../Carousel/CarouselComp";

// const LoginProvider = React.lazy(() => import("../../providers/login.provider"));
// const ForgotPasswordProvider = React.lazy(() => import("../../providers/forgotPassword.provider"));
// const Page404 = React.lazy(() => import("../NoMatch"));

// const authentication = () => (isLoggedIn() ? <Redirect to="/portal/home" /> : <Redirect to="/login" />);

const contentStyle = {
  height: "100vh",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "black",
};

const AuthLayout = ({ children }) => (
  <>
    <Row type="flex" className="fields-row" gutter={0}>
      <Col span={0} xs={0} sm={0} md={0} lg={13} className="left-vertical-split">
        <CarouselComp contentStyle={contentStyle} />
      </Col>

      <Col span={0} xs={0} md={0} lg={0}>
        <div className="text-center left-vertical-split">
          <Divider className="vertical-splitter" type="vertical" orientation="center">
            &nbsp;
          </Divider>
        </div>
      </Col>

      <Col span={24} xs={24} sm={24} md={24} lg={11} className="right-vertical-split">
        <Layout>
          <div className="flex-center public-route__public-card-wrap">
            <Card
              title={<img src={logo} alt="logo" width={170} />}
              className="public-card-wrap__public-card text-center"
              bordered={false}
            >
              {children}
              {/* {
                <>
                  <Switch>
                    <Route path={`${match.path}`} exact render={authentication} />
                    <Route path={`${match.path}login`} exact component={LoginProvider} />
                    <Route path={`${match.path}forgot-password`} exact component={ForgotPasswordProvider} />
                    <Route exact path="" component={Page404} />
                  </Switch>
                </>
              } */}
            </Card>
          </div>
        </Layout>
      </Col>
    </Row>
  </>
);

AuthLayout.propTypes = {
  //   match: PropTypes.object,
  children: PropTypes.object,
};

export default AuthLayout;
