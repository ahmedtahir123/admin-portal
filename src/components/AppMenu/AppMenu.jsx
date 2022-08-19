import React from "react";
import groupBy from "lodash/groupBy";
import map from "lodash/map";
import { Layout, Menu, Spin } from "antd";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import AppLogo from "../../images/bogo_logo.png";
import Categories from "../../routes/list.menu";
import { ellipsis } from "../../utils/utils";
import permissionsUtil from "../../utils/permissions.util";
import "./AppMenu.scss";
import CustomIcon from "../CustomIcon/CustomIcon";
import { getUser } from "../../utils/auth.utils";
const { SubMenu } = Menu;

class AppMenu extends React.Component {
  state = {
    currentPath: "/home",
    openKeysState: ["1"],
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  componentDidMount() {
    this.setCurrentPath();
  }

  onRouteChanged = fn => {
    this.setCurrentPath();
    if (fn) fn();
  };

  setCurrentPath = () => {
    const { history } = this.props;
    const currentPath = history.location.pathname.replace("/add", "").replace(/\b\/edit\/[0-9]+\b/, "");
    this.setState({ currentPath });
  };

  groupByModule = () => {
    if (!this.props.allowedRoutes) return null;

    const navGroups = groupBy(this.props.allowedRoutes, "module");
    delete navGroups.undefined;

    return map(Object.keys(navGroups), k => {
      const { action, category, subCategory } = Categories[k];

      const hasCategoryAccess = permissionsUtil.checkAuth({ action, category, subCategory });
      if (!hasCategoryAccess) return null;

      if (Categories[k].notExpendable) {
        if (Categories[k].isHiddenInMenu) {
          return false;
        }
        return map(navGroups[k], obj => {
          if (obj.isHiddenInMenu) {
            return false;
          }
          return (
            <Menu.Item key={obj.path} disabled={obj.isDisabled}>
              <NavLink to={`${obj.path}`} activeClassName="active">
                <CustomIcon name={obj.icon} />
                <span className="nav-text">{ellipsis(obj.displayName, 17)}</span>
              </NavLink>
            </Menu.Item>
          );
        });
      }
      return (
        <SubMenu
          key={k}
          title={
            <span>
              <CustomIcon name={Categories[k].icon} />
              <span>{Categories[k].name}</span>
            </span>
          }
          disabled={Categories[k].isDisabled}
          onTitleClick={({ key }) => {
            this.setState({ openKeysState: [key] });
          }}
        >
          {map(navGroups[k], obj => {
            if (obj.hideInSideBar) return null;
            const hasAccess = permissionsUtil.checkAuth({
              action: obj.action,
              category: obj.category,
              subCategory: obj.subCategory,
            });
            if (!hasAccess) return null;
            return (
              <Menu.Item key={obj.path}>
                <NavLink to={`${obj.path}`} activeClassName="active">
                  <CustomIcon name={obj.icon} />
                  <span className="nav-text">{ellipsis(obj.displayName, 30)}</span>
                </NavLink>
              </Menu.Item>
            );
          })}
        </SubMenu>
      );
    });
  };

  getMenuClass = (isFixed, userRole) => {
    let className = `app-sidebar ${isFixed ? " app-sidebar__fixed" : ""}`;
    if (userRole && userRole === "MERCHANT") {
      className += " bg-color-chocolate";
    }
    return className;
  };

  render() {
    const { currentPath, openKeysState } = this.state;
    const { isFixedLayout, onBreakPoint, isLoading } = this.props;
    const userRole = getUser("userRole");
    const menuClasses = this.getMenuClass(isFixedLayout, userRole);
    return (
      <Layout.Sider breakpoint="lg" collapsedWidth={0} width={350} className={menuClasses} onBreakpoint={onBreakPoint}>
        <Link to="profile">
          <div className="user-image-wrap text-center mg-top-15 mg-bottom-15">
            <div className="user-image-wrap__user-image i-block mg-0-auto">
              <img src={AppLogo} alt="User" width={170} />
            </div>
          </div>
        </Link>

        {isLoading ? (
          <div className="text-center mg-top-pc-20">
            <Spin size="large" />
          </div>
        ) : (
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[currentPath]}
            openKeys={openKeysState}
            inlineIndent={12}
            onSelect={() => {}}
          >
            {this.groupByModule()}
          </Menu>
        )}
      </Layout.Sider>
    );
  }
}

AppMenu.propTypes = {
  allowedRoutes: PropTypes.array,
  location: PropTypes.object,
  history: PropTypes.object,
  isLoading: PropTypes.bool,
  onBreakPoint: PropTypes.func,
  isFixedLayout: PropTypes.bool,
};

export default AppMenu;
