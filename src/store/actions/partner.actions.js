import _get from "lodash/get";
import { throwError, to, toastMessage } from "../../utils/utils";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";

import ACTIONS from "./types.actions";
import PartnerService from "../../services/partner.service";
import UploadService from "../../services/upload.service";
import { uploadRequest, uploadSuccess, uploadError } from "./ui.actions";

export function partnerRequest() {
  return { type: ACTIONS.PARTNER_REQUEST };
}

export function partnerSuccess(response) {
  return { type: ACTIONS.PARTNER_SUCCESS, response };
}

export function partnerError(error) {
  return { type: ACTIONS.PARTNER_ERROR, error };
}

export function partnerListSuccess(response) {
  return { type: ACTIONS.PARTNER_LIST_SUCCESS, response };
}

export function partnerFilterListSuccess(response) {
  return { type: ACTIONS.PARTNER_FILTER_LIST_SUCCESS, response };
}

export function selectedPartnerSuccess(response) {
  return { type: ACTIONS.SELECTED_PARTNER_SUCCESS, response };
}

export function addPartner(partnerInfo, getProgress) {
  return async dispatch => {
    dispatch(partnerRequest());
    try {
      const documents = partnerInfo.documents && partnerInfo.documents.length ? partnerInfo.documents : [];
      const banners = partnerInfo.banners && partnerInfo.banners.length ? partnerInfo.banners : [];
      const card = partnerInfo.card ? [partnerInfo.card] : [];
      let err, response;
      let files = [];
      if (documents.length || banners.length || card.length) {
        dispatch(uploadRequest());
        files = files.concat(banners, documents, card);
        [err, response] = await to(UploadService.uploadUtil(files, getProgress));
        if (err) {
          toastMessage("error", err);
          dispatch(uploadError(err));
        } else {
          dispatch(uploadSuccess());
        }
        partnerInfo = {
          ...partnerInfo,
          banners: _get(response, "image-gallery") ? response["image-gallery"] : [],
          documents: _get(response, "files-gallery") ? response["files-gallery"] : null,
          card: _get(response, "listing-card[0]") ? response["listing-card"][0].url : null,
        };
      }
      [err, response] = await to(PartnerService.addPartner(partnerInfo));
      if (err) throwError(err);
      dispatch(partnerSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(partnerError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function getPartnerList(query, isFilter) {
  return async dispatch => {
    dispatch(partnerRequest());
    try {
      const [err, response] = await to(PartnerService.getPartnerList(query));
      if (err) throwError(err);
      if (isFilter) {
        dispatch(partnerFilterListSuccess(response.content));
      } else {
        dispatch(partnerSuccess(response));
        dispatch(partnerListSuccess(response.content));
      }
    } catch (error) {
      dispatch(partnerError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function enableDisablePartner(ids, enabled, query) {
  return async dispatch => {
    dispatch(partnerRequest());
    try {
      let err, response;
      if (enabled) {
        [err, response] = await to(PartnerService.enablePartner(ids));
      } else {
        [err, response] = await to(PartnerService.disablePartner(ids));
      }
      if (err) throwError(err);
      toastMessage("success", SUCCESS_MESSAGE.ENABLED);
      dispatch(getPartnerList(query));
    } catch (error) {
      dispatch(partnerError(error));
      toastMessage("error", ERROR_MESSAGE.ENABLED);
      throwError(error);
    }
  };
}

export function updatePartner(code, partnerInfo, getProgress) {
  return async (dispatch, getState) => {
    const state = getState();
    const partner = state.partner.selected;
    dispatch(partnerRequest());
    try {
      const documents = partnerInfo.documents && partnerInfo.documents.length ? partnerInfo.documents : [];
      const banners = partnerInfo.banners && partnerInfo.banners.length ? partnerInfo.banners : [];
      const card = partnerInfo.card ? [partnerInfo.card] : [];
      let err, response;
      let files = [];
      // eslint-disable-next-line prefer-const
      let oldDocuments = [];
      // eslint-disable-next-line prefer-const
      let oldBanners = [];

      if (documents.length || banners.length || card.length) {
        let newDocuments = [],
          newBanners = [];
        if (documents.length) {
          newDocuments = documents.filter(doc => {
            if (!doc.file) oldDocuments.push(doc);
            return doc.file;
          });
        }
        if (banners.length) {
          newBanners = banners.filter(banner => {
            if (!banner.file) oldBanners.push(banner);
            return banner.file;
          });
        }
        dispatch(uploadRequest());
        files = files.concat(newBanners, newDocuments, card);
        if (files && files.length) [err, response] = await to(UploadService.uploadUtil(files, getProgress));
        if (err) {
          toastMessage("error", err);
          dispatch(uploadError(err));
          partnerInfo = {
            ...partnerInfo,
            banners: partner.banners,
            documents: partner.documents,
            card: partner.card,
          };
        } else {
          dispatch(uploadSuccess());
          const allBanners = [...oldBanners, ..._get(response, "image-gallery", [])];
          const allDocumnets = [...(oldDocuments || []), ..._get(response, "files-gallery", [])];
          partnerInfo = {
            ...partnerInfo,
            banners: allBanners,
            documents: allDocumnets,
            card: _get(response, "listing-card[0]") ? response["listing-card"][0].url : partner.card,
          };
        }
      } else {
        partnerInfo = {
          ...partnerInfo,
          banners: partner.banners,
          documents: partner.documents,
          card: partner.card,
        };
      }
      [err, response] = await to(PartnerService.updatePartnerById(code, partnerInfo));
      if (err) throwError(err);
      dispatch(getPartnerById(code));
      toastMessage("success", SUCCESS_MESSAGE.EDITED);
    } catch (error) {
      dispatch(partnerError(error));
      toastMessage("error", ERROR_MESSAGE.EDITED);
      throwError(error);
    }
  };
}

export function getPartnerById(partnerId) {
  return async dispatch => {
    dispatch(partnerRequest());
    try {
      const [err, response] = await to(PartnerService.getPartnerById(partnerId));
      if (err) throwError(err);
      dispatch(selectedPartnerSuccess(response));
    } catch (error) {
      dispatch(partnerError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}

export function deletePartner(partnerId) {
  return async dispatch => {
    dispatch(partnerRequest());
    try {
      const [err, response] = await to(PartnerService.deletePartnerById(partnerId));
      if (err) throwError(err);
      dispatch(partnerSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(partnerError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}

export function deleteAllPartner(ids, query) {
  return async dispatch => {
    dispatch(partnerRequest());
    try {
      const [err, response] = await to(PartnerService.deletePartners(ids));
      if (err) throwError(err);
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
      dispatch(getPartnerList(query));
    } catch (error) {
      dispatch(partnerError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}

export function updatePartnerStatus(code, status) {
  return async dispatch => {
    dispatch(partnerRequest());
    try {
      const [err, response] = await to(PartnerService.updatePartnerStatus(code, status));
      if (err) throwError(err);
      toastMessage("success", SUCCESS_MESSAGE.EDITED);
      dispatch(getPartnerById(code));
    } catch (error) {
      dispatch(partnerError(error));
      toastMessage("error", ERROR_MESSAGE.EDITED);
      throwError(error);
    }
  };
}
