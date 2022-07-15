// /* eslint-disable react/no-array-index-key */
// import React, { Suspense } from "react";
// import { Route, Switch } from "react-router-dom";
// import { Layout, Spin } from "antd";
// // import PrivateRoute from "./private.route";
// import PublicRoute from "./public.route";
// import history from "../utils/history.utils";
// // import AdminManagementProvider from "../providers/adminManagement.provider";

// const PrivateRouteProvider = React.lazy(() => import("../providers/privateRoute.provider"));

// const Routes = () => (
//   <Suspense
//     fallback={
//       <div className="text-center mg-top-pc-20">
//         <Spin size="large" />
//       </div>
//     }
//   >
//     <Layout className="app-layout-wrap">
//       <Switch>
//         <Route path="/portal" component={PrivateRouteProvider} />
//         <Route component={PublicRoute} history={history} />
//       </Switch>
//     </Layout>
//   </Suspense>
// );

// export default Routes;
