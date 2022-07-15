import _get from "lodash/get";
import { throwError, to, toastMessage } from "../../utils/utils";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";
import ACTIONS from "./types.actions";
import BrandService from "../../services/brand.service";
import UploadService from "../../services/upload.service";
import { uploadRequest, uploadSuccess, uploadError } from "./ui.actions";

export function brandRequest() {
  return { type: ACTIONS.BRAND_REQUEST };
}

export function bookBrandRequest() {
  return { type: ACTIONS.BOOK_BRAND_REQUEST };
}

export function brandSuccess(response) {
  return { type: ACTIONS.BRAND_SUCCESS, response };
}

export function brandError(error) {
  return { type: ACTIONS.BRAND_ERROR, error };
}

export function bookBrandError(error) {
  return { type: ACTIONS.BOOK_BRAND_ERROR, error };
}

export function brandIdSuccess(response) {
  return { type: ACTIONS.SELECTED_BRAND_SUCCESS, response };
}

export function brandListSuccess(response) {
  return { type: ACTIONS.BRAND_LIST_SUCCESS, response };
}

export function brandFilterListSuccess(response) {
  return { type: ACTIONS.BRAND_FILTER_LIST_SUCCESS, response };
}

export function selectedBrandSuccess(response) {
  return { type: ACTIONS.SELECTED_BRAND_SUCCESS, response };
}

export function bookBrandListSuccess(response) {
  return { type: ACTIONS.BOOK_BRAND_LIST_SUCCESS, response };
}

export function selectedBookBrandListSuccess(response) {
  return { type: ACTIONS.SELECTED_BOOK_BRAND_LIST_SUCCESS, response };
}

export function addSelectedBookBrandListSuccess(response) {
  return { type: ACTIONS.SELECTED_BOOK_BRAND_LIST_SUCCESS, response };
}

export function addBrand(brandInfo, getProgress) {
  return async dispatch => {
    dispatch(brandRequest());
    try {
      const banners = brandInfo.banners && brandInfo.banners.length ? brandInfo.banners : [];
      const logo = brandInfo.logo ? [brandInfo.logo] : [];
      const card = brandInfo.card ? [brandInfo.card] : [];
      let err, response;
      let files = [];
      if (logo.length || banners.length || card.length) {
        dispatch(uploadRequest());
        files = files.concat(banners, logo, card);
        [err, response] = await to(UploadService.uploadUtil(files, getProgress));
        if (err) {
          toastMessage("error", err);
          dispatch(uploadError(err));
        } else {
          dispatch(uploadSuccess());
        }
        brandInfo = {
          ...brandInfo,
          banners: !_get(response, "image-gallery") ? [] : response["image-gallery"],
          logo: !_get(response, "listing-logo[0]") ? null : response["listing-logo"][0].url,
          card: !_get(response, "listing-card[0]") ? null : response["listing-card"][0].url,
        };
      }
      [err, response] = await to(BrandService.addBrand(brandInfo));
      if (err) throwError(err);
      dispatch(brandSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(brandError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function updateBrand(code, brandInfo, getProgress) {
  return async (dispatch, getState) => {
    const state = getState();
    const brand = state.brand.selected;
    dispatch(brandRequest());
    try {
      const banners = brandInfo.banners && brandInfo.banners.length ? brandInfo.banners : [];
      const logo = brandInfo.logo ? [brandInfo.logo] : [];
      const card = brandInfo.card ? [brandInfo.card] : [];
      let err, response;
      let files = [];
      // eslint-disable-next-line prefer-const
      let oldBanners = [];
      if (logo.length || banners.length || card.length) {
        let newBanners = [];
        if (banners.length) {
          newBanners = banners.filter(banner => {
            if (!banner.file) oldBanners.push(banner);
            return banner.file;
          });
        }

        files = files.concat(newBanners, logo, card);
        if (files && files.length) {
          dispatch(uploadRequest());
          [err, response] = await to(UploadService.uploadUtil(files, getProgress));
        }
        if (err) {
          toastMessage("error", err);
          dispatch(uploadError(err));
          brandInfo = {
            ...brandInfo,
            banners: brand.banners,
            logo: brand.logo,
            card: brand.card,
          };
        } else {
          dispatch(uploadSuccess());
          const allBanners = [...oldBanners, ..._get(response, "image-gallery", [])];
          brandInfo = {
            ...brandInfo,
            banners: allBanners,
            logo: _get(response, "listing-logo[0]") ? response["listing-logo"][0].url : brand.logo,
            card: _get(response, "listing-card[0]") ? response["listing-card"][0].url : brand.card,
          };
        }
      } else {
        brandInfo = {
          ...brandInfo,
          banners: brand.banners,
          logo: brand.logo,
          card: brand.card,
        };
      }
      [err, response] = await to(BrandService.updateBrand(code, brandInfo));
      if (err) throwError(err);
      dispatch(getBrandById(code));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(brandError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}
export function getBrandNamesList(queryParam) {
  return async dispatch => {
    dispatch(brandRequest());
    try {
      const [err, response] = await to(BrandService.getBrandNamesList(queryParam));
      if (err) throwError(err);
      dispatch(brandFilterListSuccess(response.content));
      return response.content;
    } catch (error) {
      dispatch(brandError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      return throwError(error);
    }
  };
}
export function getBrandList(query) {
  return async dispatch => {
    dispatch(brandRequest());
    try {
      const [err, response] = await to(BrandService.getBrandList(query));
      if (err) throwError(err);
      dispatch(brandSuccess(response));
      dispatch(brandListSuccess(response.content));
      return response.content;
    } catch (error) {
      dispatch(brandError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      return throwError(error);
    }
  };
}
export function enableDisableBrandList(ids, enabled, query) {
  return async dispatch => {
    dispatch(brandRequest());
    try {
      let err, response;
      if (enabled) {
        [err, response] = await to(BrandService.enableBrandList(ids));
      } else {
        [err, response] = await to(BrandService.disableBrandList(ids));
      }
      if (err) throwError(err);
      dispatch(getBrandList(query));
      toastMessage("success", SUCCESS_MESSAGE.ENABLED);
    } catch (error) {
      dispatch(brandError(error));
      toastMessage("error", ERROR_MESSAGE.ENABLED);
      throwError(error);
    }
  };
}
export function getBrandById(id) {
  return async dispatch => {
    dispatch(brandRequest());
    try {
      const [err, response] = await to(BrandService.getBrandById(id));
      if (err) throwError(err);
      dispatch(selectedBrandSuccess(response));
    } catch (error) {
      dispatch(brandError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}

export function deleteAllBrands(ids, query) {
  console.log("deleteAllBrands -> ids", ids);
  return async dispatch => {
    dispatch(brandRequest());
    try {
      const [err, response] = await to(BrandService.deleteAllBrands(ids));
      if (err) throwError(err);
      dispatch(getBrandList(query));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(brandError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}

export function deleteBrand(id) {
  return async dispatch => {
    dispatch(brandRequest());
    try {
      const [err, response] = await to(BrandService.deleteBrandById(id));
      if (err) throwError(err);
      dispatch(brandSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(brandError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}

export function getBookBrandList(bookCode, query) {
  return async dispatch => {
    dispatch(bookBrandRequest());
    try {
      const [err, response] = await to(BrandService.getBookBrandList(bookCode, query));
      if (err) throwError(err);
      dispatch(bookBrandListSuccess(response));
    } catch (error) {
      dispatch(bookBrandError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function getSelectedBrandList(bookCode, pageInfo) {
  return async dispatch => {
    dispatch(brandRequest());
    try {
      const [err, response] = await to(BrandService.getSelectedBrandList(bookCode, pageInfo));
      if (err) throwError(err);
      dispatch(selectedBookBrandListSuccess(response));
    } catch (error) {
      dispatch(brandError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function addSelectedBrand(bookCode, brandCodes) {
  return async dispatch => {
    dispatch(brandRequest());
    try {
      const [err, response] = await to(BrandService.addSelectedBrands(bookCode, brandCodes.toString()));
      if (err) throwError(err);
      dispatch(addSelectedBookBrandListSuccess([]));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(bookBrandError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function removeSelectedBrand(bookCode, brandCodes) {
  return async dispatch => {
    dispatch(brandRequest());
    try {
      const [err, response] = await to(BrandService.removeSelectedBrands(bookCode, brandCodes.toString()));
      if (err) throwError(err);
      dispatch(addSelectedBookBrandListSuccess([]));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(bookBrandError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}
