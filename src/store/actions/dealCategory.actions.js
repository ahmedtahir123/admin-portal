import _get from "lodash/get";
import DealService from "../../services/deal.service";
import UploadService from "../../services/upload.service";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../utils/constants";
import { throwError, to, toastMessage, isJSON } from "../../utils/utils";
import ACTIONS from "./types.actions";

export function dealCategoryRequest() {
  return { type: ACTIONS.DEAL_CATEGORY_REQUEST };
}

export function dealCategorySuccess(response) {
  return { type: ACTIONS.DEAL_CATEGORY_SUCCESS, response };
}

export function dealCategoryListSuccess(response) {
  return { type: ACTIONS.DEAL_CATEGORY_LIST_SUCCESS, response };
}

export function selectedDealCategorySuccess(response) {
  return { type: ACTIONS.SELECTED_DEAL_CATEGORY_SUCCESS, response };
}

export function dealCategoryError(error) {
  return { type: ACTIONS.DEAL_CATEGORY_ERROR, error };
}

export function uploadRequest() {
  return { type: ACTIONS.UPLOAD_REQUEST };
}

export function uploadSuccess(response) {
  return { type: ACTIONS.UPLOAD_SUCCESS, response };
}

export function uploadError(error) {
  return { type: ACTIONS.UPLOAD_ERROR, error };
}

export function getDealCategoriesList(query) {
  return async dispatch => {
    dispatch(dealCategoryRequest());
    try {
      const [err, response] = await to(DealService.getDealCategoriesList(query));
      if (err) throwError(err);
      dispatch(dealCategorySuccess(response));
      dispatch(dealCategoryListSuccess(response.content));
    } catch (error) {
      dispatch(dealCategoryError(error));
      toastMessage("error", ERROR_MESSAGE.LISt);
      throwError(error);
    }
  };
}

export function deleteDealCategories(ids, query) {
  return async dispatch => {
    dispatch(dealCategoryRequest());
    try {
      const [err, response] = await to(DealService.deleteDealCategories(ids));
      if (err) throwError(err);
      dispatch(getDealCategoriesList(query));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(dealCategoryError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}

export function enableDisableDealCategories(ids, enabled, query) {
  return async dispatch => {
    dispatch(dealCategoryRequest());
    try {
      let err, response;
      if (enabled) {
        [err, response] = await to(DealService.enableDealCategories(ids));
      } else {
        [err, response] = await to(DealService.disableDealCategories(ids));
      }
      if (err) throwError(err);
      dispatch(getDealCategoriesList(query));
      toastMessage("success", SUCCESS_MESSAGE.ENABLED);
    } catch (error) {
      dispatch(dealCategoryError(error));
      toastMessage("error", ERROR_MESSAGE.ENABLED);
      throwError(error);
    }
  };
}

export function addDealCategory(category, getProgress) {
  return async dispatch => {
    dispatch(dealCategoryRequest());
    try {
      const imageUrls = category.imageUrls && category.imageUrls.length ? category.imageUrls : [];
      const logoUrl = category.logoUrl ? [category.logoUrl] : [];
      let err, response;
      let files = [];
      if (imageUrls.length || logoUrl.length) {
        dispatch(uploadRequest());
        files = files.concat(imageUrls, logoUrl);
        [err, response] = await to(UploadService.uploadUtil(files, getProgress));
        if (err) {
          toastMessage("error", err);
          dispatch(uploadError(err));
        } else {
          dispatch(uploadSuccess());
        }
        category = {
          ...category,
          imageUrls: _get(response, "image-gallery") ? response["image-gallery"] : null,
          logoUrl: _get(response, "listing-card[0]") ? response["listing-card"][0].url : null,
        };
      }
      if (category.imageUrls != null) {
        category = {
          ...category,
          imageUrls: isJSON(category.imageUrls) ? category.imageUrls : JSON.stringify(category.imageUrls),
        };
      }
      [err, response] = await to(DealService.addDealCategory(category));
      if (err) throwError(err);
      dispatch(dealCategorySuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(dealCategoryError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function getDealCategoryById(id) {
  return async dispatch => {
    dispatch(dealCategoryRequest());
    try {
      const [err, response] = await to(DealService.getDealCategoryById(id));
      if (err) throwError(err);
      dispatch(selectedDealCategorySuccess(response));
    } catch (error) {
      dispatch(dealCategoryError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}

export function updateDealCategory(id, dealCategory, getProgress) {
  return async (dispatch, getState) => {
    const state = getState();
    const category = state.dealCategory.selected;
    dispatch(dealCategoryRequest());
    try {
      const imageUrls = dealCategory.imageUrls && dealCategory.imageUrls.length ? dealCategory.imageUrls : [];
      const logoUrl = dealCategory.logoUrl ? [dealCategory.logoUrl] : [];
      let err, response;
      let files = [];
      const oldBanners = [];

      if (imageUrls.length || logoUrl.length) {
        let newBanners = [];
        if (imageUrls.length) {
          newBanners = imageUrls.filter(banner => {
            if (!banner.file) oldBanners.push(banner);
            return banner.file;
          });
        }
        dispatch(uploadRequest());
        files = files.concat(newBanners, logoUrl);
        if (files && files.length) [err, response] = await to(UploadService.uploadUtil(files, getProgress));
        if (err) {
          toastMessage("error", err);
          dispatch(uploadError(err));
          dealCategory = {
            ...dealCategory,
            imageUrls: category.imageUrls,
            logoUrl: category.logoUrl,
          };
        } else {
          dispatch(uploadSuccess());
          const allBanners = [...oldBanners, ..._get(response, "image-gallery", [])];
          dealCategory = {
            ...dealCategory,
            imageUrls: allBanners,
            logoUrl: _get(response, "listing-card[0]") ? response["listing-card"][0].url : category.logoUrl,
          };
        }
      } else {
        dealCategory = {
          ...dealCategory,
          imageUrls: category.imageUrls,
          logoUrl: category.logoUrl,
        };
      }
      if (dealCategory.imageUrls != null) {
        dealCategory = {
          ...dealCategory,
          imageUrls: isJSON(dealCategory.imageUrls) ? dealCategory.imageUrls : JSON.stringify(dealCategory.imageUrls),
        };
      }
      [err, response] = await to(DealService.updateDealCategoryById(id, dealCategory));
      if (err) throwError(err);
      dispatch(getDealCategoryById(id));
      toastMessage("success", SUCCESS_MESSAGE.EDITED);
    } catch (error) {
      dispatch(dealCategoryError(error));
      toastMessage("error", ERROR_MESSAGE.EDITED);
      throwError(error);
    }
  };
}
