import React, { Suspense } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Layout, Spin } from "antd";

import NoMatch from "./components/NoMatch";
import history from "./utils/history.utils";
// import { isLoggedIn } from "./utils/auth.utils";

import "./styles/App.scss";
import "react-quill/dist/quill.snow.css";

// const PrivateRouteProvider = React.lazy(() => import("./providers/privateRoute.provider"));
const MainLayoutProvider = React.lazy(() => import("./providers/mainLayout.provider"));
const LoginProvider = React.lazy(() => import("./providers/login.provider"));
const ForgotPasswordProvider = React.lazy(() => import("./providers/forgotPassword.provider"));
const Page404 = React.lazy(() => import("./components/NoMatch"));
const Forbidden = React.lazy(() => import("./components/Forbidden"));

// const authentication = () => (isLoggedIn() ? <Redirect to="/home" /> : <Redirect to="/login" />);

function App() {
  return (
    <Router history={history}>
      <Suspense
        fallback={
          <div className="text-center mg-top-pc-20">
            <Spin size="large" />
          </div>
        }
      >
        <Layout className="app-layout-wrap">
          <Switch>
            {/* <Route component={PublicRoute} history={history} /> */}

            {/* <Route path="/" exact render={authentication} /> */}
            <Route exact path="/login" component={LoginProvider} />
            <Route exact path="/forgot-password" component={ForgotPasswordProvider} />
            <Route exact path="/404" component={Page404} />
            <Route exact path="/forbidden" component={Forbidden} />
            <Route path="/" component={MainLayoutProvider} />
            <Route path="" component={NoMatch} />
          </Switch>
        </Layout>
      </Suspense>
    </Router>
  );
}

export default App;
