import _get from "lodash/get";
import { throwError, to, toastMessage, isJSON } from "../../utils/utils";
import DealService from "../../services/deal.service";

import ACTIONS from "./types.actions";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";
import { uploadRequest, uploadError, uploadSuccess } from "./ui.actions";
import UploadService from "../../services/upload.service";
import { getBrandById } from "./brand.actions";

export function dealRequest() {
  return { type: ACTIONS.DEAL_REQUEST };
}

export function selectedDealRequest() {
  return { type: ACTIONS.SELECTED_DEAL_REQUEST };
}

export function popularDealRequest() {
  return { type: ACTIONS.POPULAR_DEALS_REQUEST };
}

export function dealSuccess(response) {
  return { type: ACTIONS.DEAL_SUCCESS, response };
}

export function dealError(error) {
  return { type: ACTIONS.DEAL_ERROR, error };
}

export function selectedDealError(error) {
  return { type: ACTIONS.SELECTED_DEAL_ERROR, error };
}

export function popularDealError(error) {
  return { type: ACTIONS.POPULAR_DEALS_ERROR, error };
}

export function dealIdSuccess(response) {
  return { type: ACTIONS.SELECTED_DEAL_SUCCESS, response };
}

export function dealListSuccess(response) {
  return { type: ACTIONS.DEAL_LIST_SUCCESS, response };
}

export function dealFilterListSuccess(response) {
  return { type: ACTIONS.DEAL_FILTER_LIST_SUCCESS, response };
}

export function selectedDealSuccess(response) {
  return { type: ACTIONS.SELECTED_DEAL_SUCCESS, response };
}

export function selectedDealListSuccess(response) {
  return { type: ACTIONS.SELECTED_DEAL_LIST_SUCCESS, response };
}

export function popularSelectedDealListSuccess(response) {
  return { type: ACTIONS.POPULAR_DEALS_LIST_SUCCESS, response };
}

export function addDeal(dealInfo, getProgress) {
  return async dispatch => {
    dispatch(dealRequest());
    try {
      const imageUrls = dealInfo.imageUrls && dealInfo.imageUrls.length ? dealInfo.imageUrls : [];
      const bannerImageUrl = dealInfo.bannerImageUrl ? [dealInfo.bannerImageUrl] : [];
      let err, response;
      let files = [];
      if (imageUrls.length || bannerImageUrl.length) {
        dispatch(uploadRequest());
        files = files.concat(imageUrls, bannerImageUrl);
        [err, response] = await to(UploadService.uploadUtil(files, getProgress));
        if (err) {
          toastMessage("error", err);
          dispatch(uploadError(err));
        } else {
          dispatch(uploadSuccess());
        }
        dealInfo = {
          ...dealInfo,
          imageUrls: _get(response, "image-gallery") ? response["image-gallery"] : null,
          bannerImageUrl: _get(response, "listing-card[0]") ? response["listing-card"][0].url : null,
        };
      }
      if (dealInfo.imageUrls != null) {
        dealInfo = {
          ...dealInfo,
          imageUrls: isJSON(dealInfo.imageUrls) ? dealInfo.imageUrls : JSON.stringify(dealInfo.imageUrls),
        };
      }
      [err, response] = await to(DealService.addDeal(dealInfo));
      if (err) throwError(err);
      dispatch(dealSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(dealError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function updateDeal(id, dealInfo, getProgress) {
  return async (dispatch, getState) => {
    const state = getState();
    const deal = state.deals.selected;
    dispatch(dealRequest());
    try {
      const imageUrls = dealInfo.imageUrls && dealInfo.imageUrls.length ? dealInfo.imageUrls : [];
      const bannerImageUrl = dealInfo.bannerImageUrl ? [dealInfo.bannerImageUrl] : [];
      let err, response;
      let files = [];
      const oldBanners = [];

      if (imageUrls.length || bannerImageUrl.length) {
        let newBanners = [];
        if (imageUrls.length) {
          newBanners = imageUrls.filter(banner => {
            if (!banner.file) oldBanners.push(banner);
            return banner.file;
          });
        }
        files = files.concat(newBanners, bannerImageUrl);
        if (files && files.length) {
          dispatch(uploadRequest());
          [err, response] = await to(UploadService.uploadUtil(files, getProgress));
        }
        if (err) {
          toastMessage("error", err);
          dispatch(uploadError(err));
          dealInfo = {
            ...dealInfo,
            imageUrls: deal.imageUrls,
            bannerImageUrl: deal.bannerImageUrl,
          };
        } else {
          dispatch(uploadSuccess());
          const allBanners = [...oldBanners, ..._get(response, "image-gallery", [])];
          dealInfo = {
            ...dealInfo,
            imageUrls: allBanners,
            bannerImageUrl: _get(response, "listing-card[0]") ? response["listing-card"][0].url : deal.bannerImageUrl,
          };
        }
      } else {
        dealInfo = {
          ...dealInfo,
          imageUrls: deal.imageUrls,
          bannerImageUrl: deal.bannerImageUrl,
        };
      }
      if (dealInfo.imageUrls != null) {
        dealInfo = {
          ...dealInfo,
          imageUrls: isJSON(dealInfo.imageUrls) ? dealInfo.imageUrls : JSON.stringify(dealInfo.imageUrls),
        };
      }
      [err, response] = await to(DealService.updateDealById(id, dealInfo));
      if (err) throwError(err);
      dispatch(getDealById(id));
      toastMessage("success", SUCCESS_MESSAGE.EDITED);
    } catch (error) {
      dispatch(dealError(error));
      toastMessage("error", ERROR_MESSAGE.EDITED);
      throwError(error);
    }
  };
}

export function getDealsList(pageInfo, isFilter) {
  return async dispatch => {
    dispatch(dealRequest());
    try {
      const [err, response] = await to(DealService.getDealsList(pageInfo));
      if (err) throwError(err);
      if (isFilter) {
        dispatch(dealFilterListSuccess(response.content));
      } else {
        dispatch(dealListSuccess(response.content));
      }
      dispatch(dealSuccess(response));
    } catch (error) {
      dispatch(dealError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function getSelectedDealsList(bookCode, pageInfo) {
  return async dispatch => {
    dispatch(selectedDealRequest());
    try {
      const [err, response] = await to(DealService.getSelectedDealsList(bookCode, pageInfo));
      if (err) throwError(err);
      dispatch(selectedDealListSuccess(response));
    } catch (error) {
      dispatch(selectedDealError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function getSelectedPopularDealsList(bookCode, pageInfo) {
  return async dispatch => {
    dispatch(popularDealRequest());
    try {
      const [err, response] = await to(DealService.getSelectedPopularDealsList(bookCode, pageInfo));
      if (err) throwError(err);
      dispatch(popularSelectedDealListSuccess(response));
    } catch (error) {
      dispatch(popularDealError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function addSelectedPopularDeals(bookCode, dealCodes) {
  return async dispatch => {
    dispatch(popularDealRequest());
    try {
      const [err, response] = await to(DealService.addSelectedPopularDeals(bookCode, dealCodes.toString()));
      if (err) throwError(err);
      dispatch(popularSelectedDealListSuccess([]));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(popularDealError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function removeSelectedPopularDeals(bookCode, dealCodes) {
  return async dispatch => {
    dispatch(popularDealRequest());
    try {
      const [err, response] = await to(DealService.removeSelectedPopularDeals(bookCode, dealCodes.toString()));
      if (err) throwError(err);
      dispatch(popularSelectedDealListSuccess([]));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(popularDealError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}

export function getDealById(id) {
  return async dispatch => {
    dispatch(dealRequest());
    try {
      const [err, response] = await to(DealService.getDealById(id));
      if (err) throwError(err);
      // if (response && response.brandCode) {
      //   const code = response.brandCode;
      //   // TODO: should be provided by backend
      //   dispatch(getBrandById(code));
      // }
      dispatch(selectedDealSuccess(response));
    } catch (error) {
      dispatch(dealError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}

export function deleteAllDeals(ids, query) {
  return async dispatch => {
    dispatch(dealRequest());
    try {
      const [err, response] = await to(DealService.deleteAllDeals(ids));
      if (err) throwError(err);
      dispatch(getDealsList(query));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(dealError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}

export function enableDisableDeal(ids, enabled, query) {
  return async dispatch => {
    dispatch(dealRequest());
    try {
      let err, response;
      if (enabled) {
        [err, response] = await to(DealService.enableDeal(ids));
      } else {
        [err, response] = await to(DealService.disableDeal(ids));
      }
      if (err) throwError(err);
      dispatch(getDealsList(query));
      toastMessage("success", SUCCESS_MESSAGE.ENABLED);
    } catch (error) {
      dispatch(dealError(error));
      toastMessage("error", ERROR_MESSAGE.ENABLED);
      throwError(error);
    }
  };
}

export function removeSelectedDeal(bookCode, ids) {
  return async dispatch => {
    dispatch(selectedDealRequest());
    try {
      const [err, response] = await to(DealService.removeSelectedDeal(bookCode, ids));
      if (err) throwError(err);
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(selectedDealError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}

export function addSelectedDeal(bookCode, ids) {
  return async dispatch => {
    dispatch(selectedDealRequest());
    try {
      const [err, response] = await to(DealService.addSelectedDeal(bookCode, ids));
      if (err) throwError(err);
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(selectedDealError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}
