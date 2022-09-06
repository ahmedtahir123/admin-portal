import ACTIONS from "./types.actions";
import { throwError, to, toastMessage } from "../../utils/utils";
import baitussalamAppService from "../../services/baitussalam.service";
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

export function getProjects(query) {
  return async dispatch => {
    dispatch(adminRequest());
    try {
      const [err, response] = await to(baitussalamAppService.getAllProjects(query));
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

export function getBayanatCategory(query) {
  return async dispatch => {
    dispatch(adminRequest());
    try {
      const [err, response] = await to(baitussalamAppService.getBayanatCategory(query));
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

export function getDuasCategory(query) {
  return async dispatch => {
    dispatch(adminRequest());
    try {
      const [err, response] = await to(baitussalamAppService.getDuasCategory(query));
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

export function getDuas(query) {
  return async dispatch => {
    dispatch(adminRequest());
    try {
      const [err, response] = await to(baitussalamAppService.getDuas(query));
      if (err) throwError(err);
      dispatch(adminSuccess(response.content));
      dispatch(adminListSuccess(response));
    } catch (error) {
      dispatch(adminError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function getPublicationCategory(query) {
  return async dispatch => {
    dispatch(adminRequest());
    try {
      const [err, response] = await to(baitussalamAppService.getPublicationCategory(query));
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

export function getFeaturedVideos(query) {
  return async dispatch => {
    dispatch(adminRequest());
    try {
      const [err, response] = await to(baitussalamAppService.getFeaturedVideos(query));
      if (err) throwError(err);
      dispatch(adminSuccess(response.content));
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
      const [err, response] = await to(baitussalamAppService.addAdminUser(userInfo, params));
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
      const [err, response] = await to(baitussalamAppService.deleteAdminUsers(ids));
      if (err) throwError(err);
      //   dispatch(getAdminUsers(query));
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
      const [err, response] = await to(baitussalamAppService.updateAdmin(id, userInfo, params));
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
      const [err, response] = await to(baitussalamAppService.getAdminById(id));
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
        [err, response] = await to(baitussalamAppService.enableAdmin(ids));
      } else {
        [err, response] = await to(baitussalamAppService.disableAdmin(ids));
      }
      console.log("response", response);
      if (err) throwError(err);
      //   dispatch(getAdminUsers(query));
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
      const [err, response] = await to(baitussalamAppService.deleteAdminUser(id));
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

export function getAllNews(query) {
  return async dispatch => {
    dispatch(adminRequest());
    try {
      // eslint-disable-next-line prefer-const
      let [err, response] = await to(baitussalamAppService.getAllNews(query));
      if (err) throwError(err);
      dispatch(adminSuccess(response.content));
      response = Object.values(response).flat();
      dispatch(adminListSuccess(response));
    } catch (error) {
      dispatch(adminError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function getDonationCategories() {
  return async dispatch => {
    dispatch(adminRequest());
    try {
      const [err, response] = await to(baitussalamAppService.getDonationCategories());
      if (err) throwError(err);
      dispatch(adminSuccess(response.content));
      // response = Object.values(response).flat();
      dispatch(adminListSuccess(response));
    } catch (error) {
      dispatch(adminError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function getHijriDates() {
  return async dispatch => {
    dispatch(adminRequest());
    try {
      const [err, response] = await to(baitussalamAppService.getHijriDates());
      console.log(response, "responseresponse");
      console.log(err, "errerr");
      if (err) throwError(err);
      dispatch(adminSuccess(response.content));
      // response = Object.values(response).flat();
      dispatch(adminListSuccess(response));
    } catch (error) {
      dispatch(adminError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}
export function getOnlineCharity() {
  return async dispatch => {
    dispatch(adminRequest());
    try {
      const [err, response] = await to(baitussalamAppService.getOnlineCharity());
      if (err) throwError(err);
      dispatch(adminSuccess(response.content));
      // response = Object.values(response).flat();
      dispatch(adminListSuccess(response));
    } catch (error) {
      dispatch(adminError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function getBaitussalamVolunteers() {
  return async dispatch => {
    dispatch(adminRequest());
    try {
      const [err, response] = await to(baitussalamAppService.getBaitussalamVolunteers());
      if (err) throwError(err);
      dispatch(adminSuccess(response.content));
      // response = Object.values(response).flat();
      dispatch(adminListSuccess(response));
    } catch (error) {
      dispatch(adminError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function getCustomer() {
  return async dispatch => {
    dispatch(adminRequest());
    try {
      const [err, response] = await to(baitussalamAppService.getCustomer());
      if (err) throwError(err);
      dispatch(adminSuccess(response.content));
      // response = Object.values(response).flat();
      dispatch(adminListSuccess(response));
    } catch (error) {
      dispatch(adminError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function getBaitussalamAdminUser() {
  return async dispatch => {
    dispatch(adminRequest());
    try {
      const [err, response] = await to(baitussalamAppService.getBaitussalamAdminUser());
      if (err) throwError(err);
      dispatch(adminSuccess(response.content));
      // response = Object.values(response).flat();
      dispatch(adminListSuccess(response));
    } catch (error) {
      dispatch(adminError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}
