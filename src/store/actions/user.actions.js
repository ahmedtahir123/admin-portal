import find from "lodash/find";
import _get from "lodash/get";
import ACTIONS from "./types.actions";
import UserService from "../../services/user.service";
import { throwError, to, toastMessage } from "../../utils/utils";
import { setUser, removeUser } from "../../utils/auth.utils";
import permissionsUtil from "../../utils/permissions.util";
import ROUTES from "../../routes/constant.route";
import {
  permissions,
  merchantPermission,
  merchantAssociatePermission,
  baitussalamWebAppPermission,
} from "../../__mocks__/permissions";
import { SUCCESS_MESSAGE, ERROR_MESSAGE, USER_ROLES } from "../../utils/constants";
import { getPartnerById } from "./partner.actions";
import PartnerService from "../../services/partner.service";

export function appReset() {
  return { type: ACTIONS.APP_RESET };
}
export function userRequest() {
  return { type: ACTIONS.USER_REQUEST };
}

export function userSuccess(response) {
  return { type: ACTIONS.USER_SUCCESS, response };
}

export function getUserNotificationsSuccess(response) {
  return { type: ACTIONS.GET_USER_NOTIFICATIONS_SUCCESS, response };
}

export function getAllUsersSuccess(response) {
  return { type: ACTIONS.GET_ALL_USERS_SUCCESS, response };
}

export function getUserByIdSuccess(response) {
  return { type: ACTIONS.GET_USERBYID_SUCCESS, response };
}

export function userError(error) {
  return { type: ACTIONS.USER_ERROR, error };
}

export function login(userInfo) {
  return async dispatch => {
    dispatch(userRequest());
    // email: admin@test.com
    // pass: admin123
    const clientId = userInfo.userType === "MERCHANT" ? "merchant-client" : "bgn-admin-client";
    // delete userInfo.userType;
    let partner, err, response;

    const params = new URLSearchParams();

    params.append("grant_type", "password");
    params.append("client_id", "bs-admin-client");
    params.append("username", userInfo.emailAddress);
    params.append("client_secret", "pin");
    params.append("password", userInfo.password);

    try {
      [err, response] = await to(UserService.login(params));
      if (err || !response) {
        throwError(err);
      }
      // response = {
      //   userId: "bf18c7b4-2d82-4ca9-b08b-9d54b888809b",
      //   emailAddress: "asfar@bgn.com",
      //   firstName: "Asfar",
      //   lastName: "Ali",
      //   userRole: userInfo.userType,
      //   fullName: "Asfar Ali",
      //   userCapabilities: {
      //     changePassword: "enable",
      //     viewDeals: "enable",
      //     redeemDeals: "enable",
      //     dealsGift: "disable",
      //   },
      // };
      // setUser({ ...response });

      console.log("logged in user ==>", response);
      if (response.userRole === "MERCHANT") {
        const { partnerId } = response;
        if (partnerId) {
          [err, partner] = await to(PartnerService.getPartnerById(partnerId));
          if (err || !response) {
            // throwError(err);
            toastMessage("error", "Unable to get Outlet information");
          }
        }
        if (response.userSubRole === USER_ROLES.MERCHANT_ASSOCIATE) {
          setUser({ ...response, permissions: merchantAssociatePermission, partner });
          permissionsUtil.setPermissions(merchantAssociatePermission);
        } else if (response.userSubRole === USER_ROLES.MERCHANT_MANAGER) {
          setUser({ ...response, permissions: merchantPermission, partner });
          permissionsUtil.setPermissions(merchantPermission);
        }
      } else if (userInfo.userType === "BAITUSSALAM") {
        setUser({ ...response, permissions }, response.access_token); // Add 2nd argument "TOKEN 123" if you wanna skip auth work
        permissionsUtil.setPermissions(baitussalamWebAppPermission);
      } else {
        // setUser({ ...response, permissions }, "TOKEN 123"); // uncomment this if you wanna skip auth work
        setUser({ ...response, permissions }, response.access_token); // Add 2nd argument "TOKEN 123" if you wanna skip auth work
        permissionsUtil.setPermissions(permissions);
      }

      dispatch(userSuccess(response));
    } catch (error) {
      dispatch(userError(error));
      throwError(error);
    }
  };
}

export function logout(history) {
  return async dispatch => {
    dispatch(userRequest());
    try {
      // const [err, response] = await to(UserService.logout());
      // if (err) throwError(err);
      removeUser();
      dispatch(appReset());
      history.push(ROUTES.LOGIN);
    } catch (error) {
      dispatch(userError(error));
      toastMessage("error", "Unable to Logout, please try again");
      throwError(error);
    }
  };
}

export function getUserNotifications(userInfo) {
  return async dispatch => {
    dispatch(userRequest());
    try {
      const [err, userNotificationsData] = await to(UserService.getNotifications(userInfo));
      if (err) throwError(err);
      const { notificationData } = userNotificationsData.ui;
      console.log(notificationData);
      dispatch(getUserNotificationsSuccess(notificationData));
      return;
    } catch (error) {
      dispatch(userError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}

export function viewUserNotifications(userInfo) {
  return async dispatch => {
    dispatch(userRequest());
    try {
      const [err, userNotificationsData] = await to(UserService.viewNotifications(userInfo));
      if (err) throwError(err);
      const { notificationData } = userNotificationsData.ui;
      console.log(notificationData);
      dispatch(getUserNotificationsSuccess(notificationData));
      return;
    } catch (error) {
      dispatch(userError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function addNewUser(info) {
  return async dispatch => {
    dispatch(userRequest());
    try {
      const [err, curator] = await to(UserService.createProject(info));
      if (err) throwError(err);
      dispatch(userSuccess(curator));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
      return;
    } catch (error) {
      dispatch(userError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function getAllUsers() {
  return async dispatch => {
    dispatch(userRequest());
    try {
      const [err, response] = await to(UserService.getAllUsers());
      if (err) throwError(err);
      dispatch(getAllUsersSuccess(response));
    } catch (error) {
      dispatch(userError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function deleteAllUsers() {
  return async dispatch => {
    dispatch(userRequest());
    try {
      const [err, response] = await to(UserService.deleteAllUsers());
      if (err) throwError(err);
      dispatch(getAllUsersSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(userError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}

export function getUserById(id) {
  return async dispatch => {
    dispatch(userRequest());
    try {
      const [err, response] = await to(UserService.getAllUsers());
      if (err) throwError(err);
      const userById = find(response, data => Number(data.id) === Number(id));
      dispatch(getUserByIdSuccess(userById));
    } catch (error) {
      dispatch(userError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}

export function changePassword(body, page, history) {
  return async dispatch => {
    dispatch(userRequest());
    try {
      const [err, response] = await to(UserService.changePassword(body, page));
      if (err) throwError(err);
      toastMessage("success", "Password Reset Successfully");
      history.goBack();
    } catch (error) {
      dispatch(userError(error));
      throwError(error);
    }
  };
}
