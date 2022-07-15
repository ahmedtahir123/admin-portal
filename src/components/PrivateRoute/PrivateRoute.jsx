import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import permissionsUtil from "../../utils/permissions.util";
import { isLoggedIn } from "../../utils/auth.utils";

const PrivateRoute = ({
  component: Component,
  action,
  subCategory,
  category,
  // user,
  /**
   * Use this props to pass custom objects to Components/Routes
   */
  componentProps,
  ...rest
}) => {
  const isLogin = isLoggedIn();

  const userHasAccess = permissionsUtil.checkAuth({
    action,
    subCategory,
    category,
  });

  return (
    <Route
      {...rest}
      exact
      render={item => {
        const { location } = item;
        if (true) {
          const allProps = { ...item, componentProps };
          return <Component {...allProps} />;
        }

        if (isLogin && !userHasAccess) {
          return (
            <Redirect
              to={{
                pathname: "/forbidden",
                state: { from: location },
              }}
            />
          );
        }

        // return (
        //   <Redirect
        //     to={{
        //       pathname: "/login",
        //       state: { from: location },
        //     }}
        //   />
        // );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  componentProps: PropTypes.object,
  action: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  subCategory: PropTypes.string,
  category: PropTypes.string,
};

export default PrivateRoute;
