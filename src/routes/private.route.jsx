// import React from "react";
// import { Route, Switch } from "react-router-dom";
// import PropTypes from "prop-types";
// import { Layout, Spin } from "antd";
// import uniqBy from "lodash/uniqBy";

// import AppHeaderContainer from "../containers/Header";
// import AppMenu from "../components/AppMenu/AppMenu";
// import AppFooter from "../components/AppFooter/AppFooter";
// import NoMatch from "../components/NoMatch";
// import ROUTES from "./constant.route";
// import { getUser, isLoggedIn } from "../utils/auth.utils";

// import route from "./list.route";

// class PrivateRoute extends React.Component {
//   constructor(props) {
//     super(props);

//     const { userData, history } = this.props;

//     // Get userData from store otherwise get from Cookie
//     this.userDataObject = userData && Object.keys(userData).length ? userData : getUser();

//     if (!isLoggedIn()) {
//       history.push("/login");
//       return;
//     }
//     // const capabilities = ["COMMON"];

//     const privateRoutes = route.filter(routeItem => routeItem.isPrivate);
//     const components = {};
//     // privateRoutes.forEach(routeItem => {
//     //   components[`${routeItem.name}`] = routeItem;
//     // });
//     // console.log("components", components);

//     let allowedRoutes = privateRoutes;
//     allowedRoutes = uniqBy(allowedRoutes, "path");
//     this.setRoutesByUserCapabilities(this.userDataObject, allowedRoutes);

//     this.setUserNotifications(this.userDataObject);
//   }

//   state = {
//     allowedRoutes: [],
//     isMenuLoading: true,
//     // notificationsData: {},
//   };

//   userDataObject = {};

//   pageTitle = "404";

//   getAllowedUserRoutes = (allowedUserCapabilities, allowedRoutes) => {
//     console.log("++++++++", allowedUserCapabilities, allowedRoutes);
//     debugger;
//     const allowedUserRoutes = [];

//     for (
//       let allowedUserCapabilityIndex = 0;
//       allowedUserCapabilityIndex < allowedUserCapabilities.length;
//       allowedUserCapabilityIndex += 1
//     ) {
//       const allowedUserCapability = allowedUserCapabilities[allowedUserCapabilityIndex];

//       for (let i = 0; i < allowedRoutes.length; i += 1) {
//         const allowedRoute = allowedRoutes[i];

//         if (
//           allowedUserCapability.name === allowedRoute.name ||
//           (allowedRoute.parentRouteName && allowedRoute.parentRouteName === allowedUserCapability.name)
//         ) {
//           // console.log(allowedUserCapability);
//           const { functions } = allowedUserCapability;

//           if (functions.add === false && allowedRoute.path.includes("/add")) {
//             // eslint-disable-next-line no-continue
//             continue;
//           }
//           if (functions.edit === false && allowedRoute.path.includes("/edit")) {
//             // eslint-disable-next-line no-continue
//             continue;
//           }
//           allowedUserRoutes.push(allowedRoute);
//         }
//       }
//     }

//     return allowedUserRoutes;
//   };

//   setRoutesByUserCapabilities = (userDataObject, allowedRoutes) => {
//     console.log(this.props, allowedRoutes);
//     const { getUserCapabilities, history } = this.props;

//     // getUserCapabilities(userDataObject, history).then(() => {
//     //   const { capabilities } = this.props;
//     //   console.log("capabilities", capabilities);
//     //   console.log("allowedRoutes......", allowedRoutes);

//     //   const allowedUserCapabilities = capabilities.filter(item => item.status === true);

//     //   const allowedUserRoutes = this.getAllowedUserRoutes(allowedUserCapabilities, allowedRoutes);

//     //   console.log({ allowedUserRoutes });

//     //   this.setState({
//     //     allowedRoutes: allowedUserRoutes,
//     //     isMenuLoading: false,
//     //   });
//     // });
//   };

//   setPageTitle = () => {
//     const { history } = this.props;
//     const url = history.location.pathname.replace(ROUTES.BASE.path, "");
//     console.log(url);
//     const pageTitleObj = Object.values(ROUTES).filter(r => url.includes(r.path));
//     if (pageTitleObj.length) {
//       this.pageTitle = pageTitleObj.pop().title;
//     }
//     console.log(history);
//   };

//   setUserNotifications = userDataObject => {
//     const { getUserNotifications, history } = this.props;
//     getUserNotifications(userDataObject, history);
//   };

//   viewUserNotifications = userPayload => {
//     const { viewUserNotifications, history } = this.props;
//     console.log(this.userDataObject);
//     userPayload = {
//       viewedNotifications: userPayload,
//       ...this.userDataObject,
//     };

//     viewUserNotifications(userPayload, history);
//   };

//   showModal = bool => {
//     const { showModal } = this.props;
//     showModal(bool).then(() => {
//       console.log(this.props);
//     });
//   };

//   render() {
//     const { match, history, location, isModalOpen, notificationsData, logout } = this.props;
//     const { allowedRoutes, isMenuLoading } = this.state;
//     this.setPageTitle();

//     return (
//       <Layout className="private-route">
//         <AppMenu isLoading={isMenuLoading} allowedRoutes={allowedRoutes} history={history} location={location} />
//         <Layout>
//           <AppHeaderContainer
//             pageTitle={this.pageTitle}
//             history={history}
//             notificationsData={notificationsData}
//             viewNotifications={this.viewUserNotifications}
//             showModal={this.showModal}
//             isModalOpen={isModalOpen}
//             logout={logout}
//           />
//           <Layout.Content className="layout-content">
//             {isMenuLoading ? (
//               <div className="text-center w-pc-100 mg-top-pc-20">
//                 <Spin size="large" />
//               </div>
//             ) : (
//               <div className="private-route__content-wrap">
//                 <Switch>
//                   {allowedRoutes &&
//                     allowedRoutes.map(({ component, path, exact }) => (
//                       <Route
//                         exact={exact}
//                         key={`${path}-private-route`}
//                         path={`${match.path}${path}`}
//                         component={component}
//                       />
//                     ))}

//                   {/* <PrivRoute
//                     exact={exact}
//                     key={`${path}-private-route`}
//                     path={`usermanagent/edit`}
//                     component={component}
//                     app="userManagement"
//                     action={Constant.LOGIN.action}
//                   />
//                   <PrivRoute
//                     exact={exact}
//                     key={`${path}-private-route`}
//                     path={`usermanent/list`}
//                     component={component}
//                     app="userManagement"
//                     action="list"
//                   />
//                   <PrivRoute
//                     exact={exact}
//                     key={`${path}-private-route`}
//                     path={`usermanent/add`}
//                     component={component}
//                     app="userManagement"
//                     action="add"
//                   /> */}
//                   <Route path="" component={NoMatch} />
//                 </Switch>
//               </div>
//             )}
//           </Layout.Content>
//           <AppFooter />
//         </Layout>
//       </Layout>
//     );
//   }
// }

// PrivateRoute.propTypes = {
//   history: PropTypes.object,
//   match: PropTypes.object,
//   location: PropTypes.object,
//   // getUserCapabilities: PropTypes.func,
//   getUserNotifications: PropTypes.func,
//   viewUserNotifications: PropTypes.func,
//   logout: PropTypes.func,
//   showModal: PropTypes.func,
//   userData: PropTypes.object,
//   // capabilities: PropTypes.array,
//   notificationsData: PropTypes.object,
//   isModalOpen: PropTypes.bool,
// };

// export default PrivateRoute;
