import { throwError, to, toastMessage } from "../../utils/utils";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";

import ACTIONS from "./types.actions";
import campaignStatusConsoleService from "../../services/campaignStatusConsole.service";

export function campaignStatusRequest() {
  return { type: ACTIONS.CAMPAIGN_STATUS_REQUEST };
}

export function campaignStatusSuccess(response) {
  return { type: ACTIONS.CAMPAIGN_STATUS_SUCCESS, response };
}

export function campaignStatusError(error) {
  return { type: ACTIONS.CAMPAIGN_STATUS_ERROR, error };
}

export function campaignStatusIdSuccess(response) {
  return { type: ACTIONS.SELECTED_CAMPAIGN_STATUS_SUCCESS, response };
}

export function campaignStatusListSuccess(response) {
  return { type: ACTIONS.CAMPAIGN_STATUS_LIST_SUCCESS, response };
}

export function selectedCampaignStatusSuccess(response) {
  return { type: ACTIONS.SELECTED_CAMPAIGN_STATUS_SUCCESS, response };
}
export function updateCampaignStatus(id, campaignStatusInfo) {
  return async dispatch => {
    dispatch(campaignStatusRequest());
    try {
      const [err, response] = await to(campaignStatusConsoleService.updateCampaignStatusById(id, campaignStatusInfo));
      if (err) throwError(err);
      dispatch(campaignStatusSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.EDITED);
    } catch (error) {
      dispatch(campaignStatusError(error));
      toastMessage("error", ERROR_MESSAGE.EDITED);
      throwError(error);
    }
  };
}

export function addCampaignStatus(campaignStatusInfo) {
  return async dispatch => {
    dispatch(campaignStatusRequest());
    try {
      const [err, response] = await to(campaignStatusConsoleService.addCampaignStatus(campaignStatusInfo));
      if (err) throwError(err);
      dispatch(campaignStatusSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(campaignStatusError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function getCampaignStatusList(pageInfo) {
  return async dispatch => {
    dispatch(campaignStatusRequest());
    try {
      const [err, response] = await to(campaignStatusConsoleService.getCampaignStatussList(pageInfo));
      if (err) throwError(err);
      dispatch(campaignStatusSuccess(response));
      dispatch(campaignStatusListSuccess(response.content));
    } catch (error) {
      dispatch(campaignStatusError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}
export function enableDisableCampaignStatus(ids, enabled) {
  return async dispatch => {
    dispatch(campaignStatusSuccess());
    try {
      let err, response;
      if (enabled) {
        [err, response] = await to(campaignStatusConsoleService.enableCampaignList(ids));
      } else {
        [err, response] = await to(campaignStatusConsoleService.disableCampaignList(ids));
      }
      if (err) throwError(err);
      dispatch(campaignStatusSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ENABLED);
    } catch (error) {
      dispatch(campaignStatusError(error));
      toastMessage("error", ERROR_MESSAGE.ENABLED);
      throwError(error);
    }
  };
}
export function getCampaignStatusById(Id) {
  return async dispatch => {
    dispatch(campaignStatusRequest());
    try {
      const [err, response] = await to(campaignStatusConsoleService.getCampaignStatusById(Id));
      if (err) throwError(err);
      dispatch(selectedCampaignStatusSuccess(response));
    } catch (error) {
      dispatch(campaignStatusError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}

export function deleteAllCampaignStatus(id) {
  return async dispatch => {
    dispatch(campaignStatusRequest());
    try {
      const [err, response] = await to(campaignStatusConsoleService.deleteAllCampaignStatus(id));
      if (err) throwError(err);
      dispatch(campaignStatusSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(campaignStatusError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}
