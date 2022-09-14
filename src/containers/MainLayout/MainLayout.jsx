import { Layout, Spin } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AppFooter from "../../components/AppFooter/AppFooter";
import AppMenu from "../../components/AppMenu/AppMenu";
import NoMatch from "../../components/NoMatch";
import PrivateRoute from "../../components/PrivateRoute";
import routes from "../../routes/list.route";
import { isLoggedIn, getUser } from "../../utils/auth.utils";
import AppHeaderContainer from "../Header";
import "./MainLayout.scss";

const MainLayout = ({
  history,
  location,
  updateUserInStore,
  isModalOpen,
  notificationsData,
  logout,
  user,
  getStates,
  getCities,
  musalliGetAllActiveSession,
  getAllActiveMosqueBySession,
  activeSessionList,
}) => {
  const [isFixedLayout, setIsFixedLayout] = useState(true);
  const [isMenuLoading, setIsMenuLoading] = useState(false);

  useEffect(() => {
    const _user = getUser();
    updateUserInStore(_user);
    // getStates();
    // getCities();
    musalliGetAllActiveSession();
  }, []);

  useEffect(() => {
    if (activeSessionList?.length > 0) {
      const sessionIdValue = activeSessionList[0]?.id;
      getAllActiveMosqueBySession(sessionIdValue);
    }
  }, [activeSessionList]);

  const onBreakPoint = isBreak => {
    setIsFixedLayout(!isBreak);
  };

  return (
    <Layout className="main-layout">
      <AppMenu
        isLoading={isMenuLoading}
        allowedRoutes={routes}
        history={history}
        location={location}
        isFixedLayout={isFixedLayout}
        onBreakPoint={onBreakPoint}
      />
      <Layout>
        <AppHeaderContainer
          history={history}
          notificationsData={notificationsData}
          // viewNotifications={this.viewUserNotifications}
          // showModal={this.showModal}
          // isModalOpen={isModalOpen}
          logout={logout}
          userData={user}
          isFixedLayout={isFixedLayout}
        />
        <Layout.Content className={`layout-content ${isFixedLayout ? " layout-content__fixed" : ""}`}>
          {isMenuLoading ? (
            <div className="text-center w-pc-100 mg-top-pc-20">
              <Spin size="large" />
            </div>
          ) : (
            <div className="main-layout__content-wrap">
              <Switch>
                {/* !isLoggedIn() && props.history.replace("/login"); */}
                {/* {!isLoggedIn() && <Redirect to="/login" />} */}
                {routes &&
                  routes.map(({ component, path, exact, category, subCategory, action }) => (
                    <PrivateRoute
                      exact={exact}
                      key={`${path}-private-route`}
                      path={`${path}`}
                      component={component}
                      category={category}
                      subCategory={subCategory}
                      action={action}
                    />
                  ))}
                <Route
                  path=""
                  component={() => (isLoggedIn() ? <Route path="" component={NoMatch} /> : <Redirect to="/404" />)}
                />
              </Switch>
            </div>
          )}
        </Layout.Content>
        <AppFooter isFixedLayout={isFixedLayout} />
      </Layout>
    </Layout>
  );
};

MainLayout.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  // getUserNotifications: PropTypes.func,
  // viewUserNotifications: PropTypes.func,
  logout: PropTypes.func,
  updateUserInStore: PropTypes.func,
  // showModal: PropTypes.func,
  user: PropTypes.object,
  // capabilities: PropTypes.array,
  notificationsData: PropTypes.object,
  isModalOpen: PropTypes.bool,
  getStates: PropTypes.func,
  getCities: PropTypes.func,
  getAllActiveMosqueBySession: PropTypes.func,
  musalliGetAllActiveSession: PropTypes.func,
  activeSessionList: PropTypes.array,
};

export default MainLayout;
