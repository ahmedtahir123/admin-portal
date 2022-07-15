import ACTIONS from "./types.actions";
import { throwError, to, toastMessage } from "../../utils/utils";
import UserService from "../../services/user.service";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";

export function adminRequest() {
  return { type: ACTIONS.ADMIN_REQUEST };
}

export function adminSuccess(response) {
  return { type: ACTIONS.ADMIN_SUCCESS, response };
}

export function adminError(error) {
  return { type: ACTIONS.ADMIN_ERROR, error };
}

export function adminListSuccess(response) {
  return { type: ACTIONS.ADMIN_LIST_SUCCESS, response };
}

export function selectedAdminSuccess(response) {
  return { type: ACTIONS.SELECTED_ADMIN_SUCCESS, response };
}

/* Async Actions */

export function getAdminUsers(query) {
  return async dispatch => {
    dispatch(adminRequest());
    try {
      const [err, response] = await to(UserService.getAllAdminUsers(query));
      if (err) throwError(err);
      dispatch(adminSuccess(response));
      dispatch(adminListSuccess(response.content));
    } catch (error) {
      dispatch(adminError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function addAdminUser(userInfo, params) {
  return async dispatch => {
    dispatch(adminRequest());
    try {
      const [err, response] = await to(UserService.addAdminUser(userInfo, params));
      if (err) throwError(err);
      dispatch(adminSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(adminError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function deleteAdminUsers(ids, query) {
  return async dispatch => {
    dispatch(adminRequest());
    try {
      const [err, response] = await to(UserService.deleteAdminUsers(ids));
      if (err) throwError(err);
      dispatch(getAdminUsers(query));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(adminError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}

export function updateUser(id, userInfo, params) {
  return async dispatch => {
    dispatch(adminRequest);
    try {
      const [err, response] = await to(UserService.updateAdmin(id, userInfo, params));
      if (err) throwError(err);
      dispatch(getUserById(id));
      toastMessage("success", SUCCESS_MESSAGE.EDITED);
    } catch (error) {
      dispatch(adminError(error));
      toastMessage("error", ERROR_MESSAGE.EDITED);
      throwError(error);
    }
  };
}

export function getUserById(id) {
  return async dispatch => {
    dispatch(adminRequest());
    try {
      const [err, response] = await to(UserService.getAdminById(id));
      if (err) throwError(err);
      dispatch(selectedAdminSuccess(response));
    } catch (error) {
      dispatch(adminError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}

export function enableDisableAdmin(ids, enabled, query) {
  return async dispatch => {
    dispatch(adminRequest());
    try {
      let err, response;
      if (enabled) {
        [err, response] = await to(UserService.enableAdmin(ids));
      } else {
        [err, response] = await to(UserService.disableAdmin(ids));
      }
      console.log("response", response);
      if (err) throwError(err);
      dispatch(getAdminUsers(query));
      toastMessage("success", SUCCESS_MESSAGE.ENABLED);
    } catch (error) {
      dispatch(adminError(error));
      toastMessage("error", ERROR_MESSAGE.ENABLED);
      throwError(error);
    }
  };
}

export function deleteAdminUser(id) {
  return async dispatch => {
    dispatch(adminRequest());
    try {
      const [err, response] = await to(UserService.deleteAdminUser(id));
      if (err) throwError(err);
      dispatch(adminSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(adminError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}
