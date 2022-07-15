import _get from "lodash/get";
import { throwError, to, toastMessage } from "../../utils/utils";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";
import ACTIONS from "./types.actions";
import CorporateCustomerService from "../../services/corporateCustomer.service";
import UploadService from "../../services/upload.service";
import { uploadRequest, uploadError, uploadSuccess } from "./ui.actions";

export function corporateClientRequest() {
  return { type: ACTIONS.CORPORATE_CLIENT_REQUEST };
}

export function corporateClientSuccess(response) {
  return { type: ACTIONS.CORPORATE_CLIENT_SUCCESS, response };
}

export function corporateClientError(error) {
  return { type: ACTIONS.CORPORATE_CLIENT_ERROR, error };
}

export function corporateClientIdSuccess(response) {
  return { type: ACTIONS.SELECTED_CORPORATE_CLIENT_SUCCESS, response };
}

export function corporateClientListSuccess(response) {
  return { type: ACTIONS.CORPORATE_CLIENT_LIST_SUCCESS, response };
}

export function selectedCorporateClientSuccess(response) {
  return { type: ACTIONS.SELECTED_CORPORATE_CLIENT_SUCCESS, response };
}

export function addCorporateClient(clientInfo, getProgress) {
  return async dispatch => {
    dispatch(corporateClientRequest());
    try {
      const logoUrl = clientInfo.logoUrl ? [clientInfo.logoUrl] : [];
      let err, response;
      let files = [];
      if (logoUrl.length) {
        dispatch(uploadRequest());
        files = files.concat(logoUrl);
        [err, response] = await to(UploadService.uploadUtil(files, getProgress));
        if (err) {
          toastMessage("error", err);
          dispatch(uploadError(err));
        } else {
          dispatch(uploadSuccess());
        }
        clientInfo = {
          ...clientInfo,
          logoUrl: _get(response, "corporate-logo[0]") ? response["corporate-logo"][0].url : null,
        };
      }
      [err, response] = await to(CorporateCustomerService.addCorporateClient(clientInfo));
      if (err) throwError(err);
      dispatch(corporateClientSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(corporateClientError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function getCorporateClientList(pageInfo) {
  return async dispatch => {
    dispatch(corporateClientRequest());
    try {
      const [err, response] = await to(CorporateCustomerService.getCorporateClientList(pageInfo));
      if (err) throwError(err);
      dispatch(corporateClientSuccess(response));
      dispatch(corporateClientListSuccess(response.content));
    } catch (error) {
      dispatch(corporateClientError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function getCorporateClientById(clientId) {
  return async dispatch => {
    dispatch(corporateClientRequest());
    try {
      const [err, response] = await to(CorporateCustomerService.getCorporateClientById(clientId));
      if (err) throwError(err);
      toastMessage("success", SUCCESS_MESSAGE.INFO);
      dispatch(selectedCorporateClientSuccess(response));
    } catch (error) {
      dispatch(corporateClientError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}

export function deleteAllCorporateClient() {
  return async dispatch => {
    dispatch(corporateClientRequest());
    try {
      const [err, response] = await to(CorporateCustomerService.deleteAllClientCustomer());
      if (err) throwError(err);
      dispatch(corporateClientSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(corporateClientError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}
export function deleteCorporateClient(code) {
  return async dispatch => {
    dispatch(corporateClientRequest());
    try {
      const [err, response] = await to(CorporateCustomerService.deleteCorporateClientById(code));
      if (err) throwError(err);
      dispatch(corporateClientSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(corporateClientError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}
export function updateCorporateClient(id, clientInfo, getProgress) {
  return async (dispatch, getState) => {
    const state = getState();
    const client = state.corporateCustomer.selected;
    dispatch(corporateClientRequest());
    try {
      const logoUrl = clientInfo.logoUrl ? [clientInfo.logoUrl] : [];
      let err, response;
      let files = [];
      if (logoUrl.length) {
        dispatch(uploadRequest());
        files = files.concat(logoUrl);
        [err, response] = await to(UploadService.uploadUtil(files, getProgress));
        if (err) {
          toastMessage("error", err);
          dispatch(uploadError(err));
          clientInfo = {
            ...clientInfo,
            logoUrl: client.logoUrl,
          };
        } else {
          dispatch(uploadSuccess());
          clientInfo = {
            ...clientInfo,
            logoUrl: _get(response, "corporate-logo[0]") ? response["corporate-logo"][0].url : null,
          };
        }
      } else {
        clientInfo = {
          ...clientInfo,
          logoUrl: client.logoUrl,
        };
      }
      [err, response] = await to(CorporateCustomerService.updateCorporateClient(id, clientInfo));
      if (err) throwError(err);
      dispatch(getCorporateClientById(id));
      toastMessage("success", SUCCESS_MESSAGE.EDITED);
    } catch (error) {
      dispatch(corporateClientError(error));
      toastMessage("error", ERROR_MESSAGE.EDITED);
      throwError(error);
    }
  };
}

export function enableDisableCorporateClient(ids, enabled, query) {
  return async dispatch => {
    dispatch(corporateClientRequest());
    try {
      const body = {
        ids: ids.split(","),
        isEnabled: enabled,
      };
      console.log(body);
      let err, response;
      if (enabled) {
        [err, response] = await to(CorporateCustomerService.enableCorporateClient(body));
      } else {
        [err, response] = await to(CorporateCustomerService.disableCorporateClient(body));
      }
      if (err) throwError(err);
      dispatch(getCorporateClientList(query));
      toastMessage("success", SUCCESS_MESSAGE.ENABLED);
    } catch (error) {
      dispatch(corporateClientError(error));
      toastMessage("error", ERROR_MESSAGE.ENABLED);
      throwError(error);
    }
  };
}

export function getCorporateClientNames() {
  return async dispatch => {
    dispatch(corporateClientRequest());
    try {
      const [err, response] = await to(CorporateCustomerService.getAllCorporateClientNames());
      if (err) throwError(err);
      dispatch(corporateClientListSuccess(response));
    } catch (error) {
      dispatch(corporateClientError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}
