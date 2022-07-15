import { throwError, to, toastMessage } from "../../utils/utils";

import ACTIONS from "./types.actions";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";
import CampaignService from "../../services/campaign.service";

export function campaignRequest() {
  return { type: ACTIONS.CAMPAIGN_REQUEST };
}

export function campaignSuccess(response) {
  return { type: ACTIONS.CAMPAIGN_SUCCESS, response };
}

export function campaignError(error) {
  return { type: ACTIONS.CAMPAIGN_ERROR, error };
}

export function campaignIdSuccess(response) {
  return { type: ACTIONS.SELECTED_CAMPAIGN_SUCCESS, response };
}

export function campaignListSuccess(response) {
  return { type: ACTIONS.CAMPAIGN_LIST_SUCCESS, response };
}

export function selectedCampaignSuccess(response) {
  return { type: ACTIONS.SELECTED_CAMPAIGN_SUCCESS, response };
}

export function addCampaign(campaignInfo) {
  return async dispatch => {
    dispatch(campaignRequest());
    try {
      const [err, response] = await to(CampaignService.addCampaign(campaignInfo));
      if (err) throwError(err);
      dispatch(campaignSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(campaignError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function updateCampaign(id, campaignInfo) {
  return async dispatch => {
    dispatch(campaignRequest());
    try {
      const [err, response] = await to(CampaignService.updateCampaignById(id, campaignInfo));
      if (err) throwError(err);
      dispatch(campaignSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.EDITED);
    } catch (error) {
      dispatch(campaignError(error));
      toastMessage("error", ERROR_MESSAGE.EDITED);
      throwError(error);
    }
  };
}

export function getCampaignList(pageInfo) {
  return async dispatch => {
    dispatch(campaignRequest());
    try {
      const [err, response] = await to(CampaignService.getCampaignList(pageInfo));
      if (err) throwError(err);
      dispatch(campaignSuccess(response));
      dispatch(campaignListSuccess(response.content));
    } catch (error) {
      dispatch(campaignError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function getCampaignById(id) {
  return async dispatch => {
    dispatch(campaignRequest());
    try {
      const [err, response] = await to(CampaignService.getCampaignById(id));
      if (err) throwError(err);
      dispatch(selectedCampaignSuccess(response));
    } catch (error) {
      dispatch(campaignError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}

export function deleteCampaign(ids) {
  return async dispatch => {
    dispatch(campaignRequest());
    try {
      const [err, response] = await to(CampaignService.deleteCampaign(ids));
      if (err) throwError(err);
      dispatch(campaignSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(campaignError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}

export function updateCampaignActiveStatus(ids, enabled) {
  return async dispatch => {
    dispatch(campaignRequest());
    try {
      let err, response;
      if (enabled) {
        [err, response] = await to(CampaignService.enableCampaign(ids));
      } else {
        [err, response] = await to(CampaignService.disableCampaign(ids));
      }
      if (err) throwError(err);
      dispatch(campaignSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ENABLED);
    } catch (error) {
      dispatch(campaignError(error));
      toastMessage("error", ERROR_MESSAGE.ENABLED);
      throwError(error);
    }
  };
}
