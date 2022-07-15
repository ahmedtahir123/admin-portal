import React from "react";
import PropTypes from "prop-types";
import _get from "lodash/get";
import * as moment from "dayjs";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Col, Comment, Dropdown, Layout, Menu, Row, Tooltip, Typography } from "antd";

import AppModal from "../../components/AppModal/AppModal";
import AvatarLogo from "../../images/avatar.svg";
import PartnerLogo from "../../images/listing-card.svg";
import defaultLogo from "../../images/invalidLogo.svg";
import ROUTES from "../../routes/constant.route";
import { USER_ROLES } from "../../utils/constants";
import "./Header.scss";

const { Header } = Layout;
const { Paragraph } = Typography;
class AppHeaderContainer extends React.Component {
  state = {
    modalLoading: false,
    notificationsJSX: null,
    unReadNotificationsCount: 0,
    errorImage: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.notificationsData !== this.props.notificationsData) {
      this.renderNotifications();
    }
  }

  renderNotifications = () => {
    const { notificationsData } = this.props;
    const { notifications, unReadNotificationsCount } = notificationsData;
    const notificationsJSX =
      notifications &&
      notifications.map((notification, index) => (
        <Comment
          key={`notification-${Date.now() + index}`}
          content={
            <Paragraph
              ellipsis={{
                rows: 2,
                expandable: true,
              }}
              mark={!notification.isViewed}
              strong={notification.isViewed}
              type="secondary"
              title={notification.message}
            >
              {notification.message}
            </Paragraph>
          }
          datetime={
            <Tooltip title={moment(notification.dateCreated)}>
              <span>{moment(notification.dateCreated)}</span>
            </Tooltip>
          }
        />
      ));

    this.setState({
      notificationsJSX,
      unReadNotificationsCount,
    });
  };

  viewedNotifications = userPayload => {
    this.props.viewNotifications(userPayload);
  };

  onMenuClick = event => {
    const { key } = event;
    const { history, logout, showModal, userData } = this.props;
    // const userInfo = getUser() || {};
    let profileLink = "",
      companyProfileLink = "";

    if (userData?.userRole === "MERCHANT") {
      profileLink = `${ROUTES.EDIT_MERCHANT_USER.path}/${userData.userId}`;

      if (!userData.partnerId) {
        companyProfileLink = `404`;
      } else if (userData.userSubRole === USER_ROLES.MERCHANT_ASSOCIATE) {
        companyProfileLink = `${ROUTES.VIEW_PARTNER.path}/${userData.partnerId}`;
      } else if (userData.userSubRole === USER_ROLES.MERCHANT_MANAGER) {
        companyProfileLink = `${ROUTES.EDIT_PARTNER.path}/${userData.partnerId}`;
      }
    } else if (userData?.userRole === "ADMIN") {
      profileLink = `${ROUTES.EDIT_ADMIN_USER.path}/${userData.userId}`;
    } else {
      profileLink = "unknown";
      companyProfileLink = "unknown";
    }
    switch (key) {
      case "profile": {
        history.push(profileLink);
        return;
      }
      case "companyProfile": {
        history.push(companyProfileLink);
        return;
      }
      case "logout": {
        logout(this.props.history);
        return;
      }
      case "settings": {
        history.push(ROUTES.DASHBOARD.path);
        return;
      }
      case "notification": {
        showModal(true);
        return;
      }
      default: {
        history.push(ROUTES.DASHBOARD.path);
      }
    }
  };

  handleOk = async () => {
    const { showModal, notificationsData } = this.props;
    const { notifications } = notificationsData;
    const unReadNotifications = notifications.filter(notification => notification.isViewed === false);
    const unReadNotificationsIds = unReadNotifications.map(unReadNotification => unReadNotification.id);

    if (unReadNotifications.length) {
      this.setState({ modalLoading: true });
      this.viewedNotifications(unReadNotificationsIds);

      this.setState({
        unReadNotificationsCount: 0,
      });
    }

    this.setState({
      modalLoading: false,
    });

    showModal(false);
  };

  render() {
    const { showModal, isModalOpen, userData, isFixedLayout } = this.props;
    const { modalLoading, notificationsJSX, unReadNotificationsCount, errorImage } = this.state;

    const brandLogo = _get(userData, "partner.card");
    const brandName = _get(userData, "partner.name", "Outlet Not Available");
    return (
      <Header className="app-header">
        <Row type="flex" className="fields-row" gutter={0}>
          <Col span={20} xs={12} sm={20} md={20} lg={20} className="left-vertical-split">
            {userData?.userRole === "MERCHANT" ? (
              <div
                className={
                  isFixedLayout ? "app-header__title-fixed text-uppercase" : "app-header__title text-uppercase"
                }
              >
                <img
                  src={errorImage ? defaultLogo : brandLogo || PartnerLogo}
                  alt="brand"
                  width="50"
                  height="50"
                  onError={() => this.setState({ errorImage: true })}
                />
                <span className="color-grey-2 font-bold">{brandName}</span>
              </div>
            ) : null}
          </Col>
          <Col
            span={4}
            xs={12}
            sm={4}
            md={4}
            lg={4}
            className="left-vertical-split text-right app-header__secondary-menu-wrap"
          >
            <Dropdown
              trigger={["click"]}
              className="w-pc-99 secondary-menu-wrap__secondary-menu"
              key="more"
              overlay={
                <Menu className="app-header__menu" selectedKeys={[]} onClick={this.onMenuClick}>
                  <Menu.Item key="profile">
                    <UserOutlined className="icon" />
                    My Profile
                  </Menu.Item>
                  {userData?.userRole === USER_ROLES.MERCHANT || userData?.userRole === USER_ROLES.MERCHANT_ASSOCIATE ? (
                    <Menu.Item key="companyProfile">
                      <UserOutlined className="icon" />
                      Company Profile
                    </Menu.Item>
                  ) : null}

                  {/* <Menu.Item key="notification">
                    <Badge dot count={unReadNotificationsCount}>
                      <BellOutlined className="icon" />
                      Notifications
                    </Badge> 
                    </Menu.Item> */}
                  {/* <Menu.Item key="settings">
                    <SettingOutlined className="icon" />
                    Settings
                  </Menu.Item> */}
                  <Menu.Divider />
                  <Menu.Item key="logout">
                    <LogoutOutlined className="icon" />
                    Logout
                  </Menu.Item>
                </Menu>
              }
            >
              <Button
                className="vertical-middle secondary-menu__trigger"
                onClick={() => {
                  // console.log("secondary menu opened");
                }}
              >
                <span className="action account">
                  <Avatar size="small" className="avatar" src={AvatarLogo} alt="avatar" />
                  <span className="name">{_get(userData, "fullName", "user name")}</span>
                </span>
              </Button>
            </Dropdown>
          </Col>
        </Row>

        <AppModal
          title={
            <Badge count={unReadNotificationsCount} offset={[15, 5]}>
              APP NOTIFICATIONS
            </Badge>
          }
          width={700}
          visible={isModalOpen}
          onOk={this.handleOk}
          onCancel={() => {
            showModal(false);
          }}
          centered
          maxHeight="300px"
          overFlowY="auto"
          footer={[
            <Button
              key="back"
              onClick={() => {
                showModal(false);
              }}
            >
              Cancel
            </Button>,
            <Button key="submit" type="primary" loading={modalLoading} onClick={this.handleOk}>
              {parseInt(unReadNotificationsCount, 10) !== 0 ? "Mark all as Viewed" : "Ok"}
            </Button>,
          ]}
          afterClose={() => {
            // console.log("notification modal closed");
          }}
        >
          <strong>Most recent notifications:</strong>
          {notificationsJSX}
        </AppModal>
      </Header>
    );
  }
}

AppHeaderContainer.propTypes = {
  history: PropTypes.object,
  notificationsData: PropTypes.object,
  viewNotifications: PropTypes.func,
  showModal: PropTypes.func,
  isModalOpen: PropTypes.bool,
  logout: PropTypes.func,
  userData: PropTypes.object,
  isFixedLayout: PropTypes.bool,
};

export default AppHeaderContainer;
