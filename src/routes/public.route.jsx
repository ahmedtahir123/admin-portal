// import React from "react";
// import { Route, Switch, Redirect } from "react-router-dom";
// import PropTypes from "prop-types";
// import { Card, Divider, Row, Col, Layout } from "antd";
// import { isLoggedIn } from "../utils/auth.utils";
// import logo from "../images/bogo_logo.png";

// const LoginProvider = React.lazy(() => import("../providers/login.provider"));
// // change
// const ForgotPasswordProvider = React.lazy(() => import("../providers/forgotPassword.provider"));
// const Page404 = React.lazy(() => import("../components/NoMatch"));

// const authentication = () => (isLoggedIn() ? <Redirect to="/portal/home" /> : <Redirect to="/login" />);

// const PublicRoute = ({ match }) => {
//   console.log("++++++++++", match);
//   return (
//     <div className="public-route">
//       <Row type="flex" className="fields-row" gutter={0}>
//         <Col span={0} xs={0} sm={0} md={0} lg={13} className="left-vertical-split">
//           <div className="text-center h-pc-100">
//             <h1 className="color-white logo font-42 text-uppercase pad-left-15 pad-right-15">Welcome to Bogo Admin</h1>
//             {/* <img src={logo} alt="" className="logo" /> */}
//           </div>
//         </Col>

//         <Col span={0} xs={0} md={0} lg={0}>
//           <div className="text-center left-vertical-split">
//             <Divider className="vertical-splitter" type="vertical" orientation="center">
//               &nbsp;
//             </Divider>
//           </div>
//         </Col>

//         <Col span={24} xs={24} sm={24} md={24} lg={11} className="right-vertical-split">
//           <Layout>
//             <div className="flex-center public-route__public-card-wrap">
//               <Card
//                 title={<img src={logo} alt="logo" width={170} />}
//                 className="public-card-wrap__public-card text-center"
//                 bordered={false}
//               >
//                 {
//                   <>
//                     <Switch>
//                       <Route path={`${match.path}`} exact render={authentication} />
//                       <Route path={`${match.path}login`} exact component={LoginProvider} />
//                       <Route path={`${match.path}forgot-password`} exact component={ForgotPasswordProvider} />
//                       <Route exact path="" component={Page404} />
//                     </Switch>
//                   </>
//                 }
//               </Card>
//             </div>
//           </Layout>
//         </Col>
//       </Row>
//     </div>
//   );
// };
// PublicRoute.propTypes = {
//   match: PropTypes.object,
// };

// export default PublicRoute;
