import { throwError, to, toastMessage } from "../../utils/utils";
import UserService from "../../services/user.service";

import ACTIONS from "./types.actions";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";
import { getPartnerById } from "./partner.actions";

export function merchantUserRequest() {
  return { type: ACTIONS.MERCHANT_USER_REQUEST };
}

export function merchantUserSuccess(response) {
  return { type: ACTIONS.MERCHANT_USER_SUCCESS, response };
}

export function getAllMerchantUsersSuccess(response) {
  return { type: ACTIONS.GET_MERCHANT_ALL_USERS_SUCCESS, response };
}

export function getAllMerchantUsersListSuccess(response) {
  return { type: ACTIONS.GET_MERCHANT_ALL_USERS_LIST_SUCCESS, response };
}

export function merchantError(error) {
  return { type: ACTIONS.MERCHANT_USER_ERROR, error };
}

export function selectedMerchantSuccess(response) {
  return { type: ACTIONS.SELECTED_MERCHANT_SUCCESS, response };
}

export function getUserByIdSuccess(response) {
  return { type: ACTIONS.GET_MERCHANT_USERBYID_SUCCESS, response };
}

export function addMerchantUser(userInfo, params) {
  console.log("addMerchantUser -> params", params);
  return async dispatch => {
    dispatch(merchantUserRequest());
    try {
      const [err, response] = await to(UserService.addMerchant(userInfo, params));
      if (err) throwError(err);
      dispatch(merchantUserSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(merchantError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function getAllMerchantUsers(query) {
  return async dispatch => {
    dispatch(merchantUserRequest());
    try {
      const [err, response] = await to(UserService.getAllMerchantUsers(query));
      if (err) throwError(err);
      dispatch(getAllMerchantUsersSuccess(response));
      dispatch(getAllMerchantUsersListSuccess(response.content));
    } catch (error) {
      dispatch(merchantError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function getUserById(id) {
  return async dispatch => {
    dispatch(merchantUserRequest());
    try {
      const [err, response] = await to(UserService.getMerchantById(id));
      console.log("getUserById -> response", response);
      if (err) throwError(err);
      if (response && response.partnerId) {
        dispatch(getPartnerById(response.partnerId));
      } else {
        toastMessage("error", "Outlet not available");
      }
      dispatch(getUserByIdSuccess(response));
    } catch (error) {
      dispatch(merchantError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}

export function deleteAllUsers(ids, query) {
  return async dispatch => {
    dispatch(merchantUserRequest());
    try {
      const [err, response] = await to(UserService.deleteAllMerchant(ids));
      if (err) throwError(err);
      dispatch(getAllMerchantUsers(query));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(merchantError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}

export function enableDisableMerchant(ids, enabled, query) {
  return async dispatch => {
    dispatch(merchantUserRequest());
    try {
      let err, response;
      if (enabled) {
        [err, response] = await to(UserService.enableMerchant(ids));
      } else {
        [err, response] = await to(UserService.disableMerchant(ids));
      }
      console.log(response);
      if (err) throwError(err);
      dispatch(getAllMerchantUsers(query));
      toastMessage("success", SUCCESS_MESSAGE.ENABLED);
    } catch (error) {
      dispatch(merchantError(error));
      toastMessage("error", ERROR_MESSAGE.ENABLED);
      throwError(error);
    }
  };
}

export function updateMerchant(id, payload, params) {
  return async dispatch => {
    dispatch(merchantUserRequest());
    try {
      const [err, response] = await to(UserService.updateMerchantById(id, payload, params));
      if (err) throwError(err);
      dispatch(selectedMerchantSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.EDITED);
    } catch (error) {
      dispatch(merchantError(error));
      toastMessage("error", ERROR_MESSAGE.EDITED);
      throwError(error);
    }
  };
}

export function deleteMerchant(id) {
  return async dispatch => {
    dispatch(merchantUserRequest());
    try {
      const [err, response] = await to(UserService.deleteMerchant(id));
      if (err) throwError(err);
      dispatch(merchantUserSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(merchantError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}

export function changeMerchantRole(params) {
  return async dispatch => {
    dispatch(merchantUserRequest());
    try {
      const [err, response] = await to(UserService.changeMerchantRole(params));
      if (err) throwError(err);
      toastMessage("success", SUCCESS_MESSAGE.EDITED);
    } catch (error) {
      dispatch(merchantError(error));
      toastMessage("error", ERROR_MESSAGE.EDITED);
      throwError(error);
    }
  };
}

export function verifyMerchant(userId) {
  return async dispatch => {
    dispatch(merchantUserRequest());
    try {
      const [err, response] = await to(UserService.verifyMerchant(userId));
      dispatch(getUserById(userId));
      toastMessage("success", SUCCESS_MESSAGE.EDITED);
      if (err) throwError(err);
    } catch (error) {
      dispatch(merchantError(error));
      toastMessage("error", ERROR_MESSAGE.EDITED);
      throwError(error);
    }
  };
}
