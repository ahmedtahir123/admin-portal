import _isEmpty from "lodash/isEmpty";
import { throwError, to, toastMessage } from "../../utils/utils";
import voucherRedemptionService from "../../services/voucherRedemption.service";

import ROUTES from "../../routes/constant.route";
import ACTIONS from "./types.actions";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";
import { getUser } from "../../utils/auth.utils";

export function voucherRedemptionRequest() {
  return { type: ACTIONS.VOUCHER_REDEMPTION_REQUEST };
}

export function voucherRedemptionSuccess(response) {
  return { type: ACTIONS.VOUCHER_REDEMPTION_SUCCESS, response };
}

export function voucherRedemptionError(error) {
  return { type: ACTIONS.VOUCHER_REDEMPTION_ERROR, error };
}

export function voucherRedemptionIdSuccess(response) {
  return { type: ACTIONS.SELECTED_VOUCHER_REDEMPTION_SUCCESS, response };
}

export function voucherRedemptionListSuccess(response) {
  return { type: ACTIONS.VOUCHER_REDEMPTION_LIST_SUCCESS, response };
}

export function selectedVoucherRedemptionSuccess(response) {
  return { type: ACTIONS.SELECTED_VOUCHER_REDEMPTION_SUCCESS, response };
}

export function voucherRedemptionModalChange(response) {
  return { type: ACTIONS.VOUCHER_REDEMPTION_MODAL_SHOW, response };
}

export function addVoucherRedemption(history) {
  return async (dispatch, getState) => {
    dispatch(voucherRedemptionRequest());
    try {
      const state = getState();
      const user = state.user.value;
      const body = {
        brandCode: user.partner.brand.code,
        brandName: user.partner.brand.name,
        partnerCode: user.partner.code,
        partnerName: user.partner.name,
        location: user.partner && user.partner.location ? user.partner.location : "Karachi",
        cityName: user.partner && user.partner.areaSegment ? user.partner.areaSegment.city : "Karachi",
      };
      const [err, response] = await to(voucherRedemptionService.addVoucherRedemption(body));
      if (err) throwError(err);
      // clear old ticket from reducer
      //  redirect with new ticket id
      dispatch(voucherRedemptionModalChange(false));
      dispatch(getVoucherRedemptionById(response.voucherRedeemedTicketId));
      toastMessage("success", "Ticket Created Successfully");
      history.push(`${ROUTES.EDIT_VOUCHER_REDEMPTION.path}/${response.voucherRedeemedTicketId}`);
    } catch (error) {
      dispatch(voucherRedemptionError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function updateVoucherRedemption(id, voucherRedemptionInfo) {
  return async dispatch => {
    dispatch(voucherRedemptionRequest());
    try {
      const [err, response] = await to(voucherRedemptionService.updateVoucherRedemptionById(id, voucherRedemptionInfo));
      if (err) throwError(err);
      dispatch(voucherRedemptionModalChange(false));
      dispatch(voucherRedemptionSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.EDITED);
    } catch (error) {
      dispatch(voucherRedemptionError(error));
      toastMessage("error", ERROR_MESSAGE.EDITED);
      throwError(error);
    }
  };
}

export function getVoucherRedemptionsList(pageInfo) {
  return async dispatch => {
    dispatch(voucherRedemptionRequest());
    try {
      // const state = getState();
      const localUser = getUser();
      const user = localUser;
      if (!_isEmpty(user) && !_isEmpty(user.partner)) {
        pageInfo.filters = { partnerCode: user.partner.code };
        const [err, response] = await to(voucherRedemptionService.getVoucherRedemptionsList(pageInfo));
        if (err) throwError(err);
        dispatch(voucherRedemptionSuccess(response));
        dispatch(voucherRedemptionListSuccess(response.content));
      } else {
        toastMessage("error", "User and Outlet is required!");
        throwError("User and Outlet is required!");
      }
    } catch (error) {
      dispatch(voucherRedemptionError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function getVoucherRedemptionById(id) {
  return async dispatch => {
    dispatch(voucherRedemptionRequest());
    try {
      const [err, response] = await to(voucherRedemptionService.getVoucherRedemptionById(id));
      if (err) throwError(err);
      dispatch(voucherRedemptionModalChange(false));
      dispatch(selectedVoucherRedemptionSuccess(response));
    } catch (error) {
      dispatch(voucherRedemptionError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}

export function deleteAllVoucherRedemptions(ids) {
  return async dispatch => {
    dispatch(voucherRedemptionRequest());
    try {
      const [err, response] = await to(voucherRedemptionService.deleteAllVoucherRedemptions(ids));
      if (err) throwError(err);
      dispatch(voucherRedemptionSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(voucherRedemptionError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}

export function enableDisableVoucherRedemption(ids, enabled) {
  return async dispatch => {
    dispatch(voucherRedemptionRequest());
    try {
      let err, response;
      if (enabled) {
        [err, response] = await to(voucherRedemptionService.enableVoucherRedemption(ids));
      } else {
        [err, response] = await to(voucherRedemptionService.disableVoucherRedemption(ids));
      }
      if (err) throwError(err);
      dispatch(voucherRedemptionSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ENABLED);
    } catch (error) {
      dispatch(voucherRedemptionError(error));
      toastMessage("error", ERROR_MESSAGE.ENABLED);
      throwError(error);
    }
  };
}

export function updateTicketWithAuthCode(redeemWithCode) {
  return async dispatch => {
    dispatch(voucherRedemptionRequest());
    try {
      const [err, response] = await to(voucherRedemptionService.updateTicketWithAuthCode(redeemWithCode));
      if (err) throwError(err);
      if (response.reason && response.reason.length) {
        dispatch(voucherRedemptionModalChange(true));
      }
      dispatch(selectedVoucherRedemptionSuccess(response));
    } catch (error) {
      dispatch(voucherRedemptionError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}

export function updateTicketWithQRCode(redemptionData) {
  return async dispatch => {
    dispatch(voucherRedemptionRequest());
    try {
      const [err, response] = await to(voucherRedemptionService.updateTicketWithQRCode(redemptionData));
      if (err) throwError(err);
      if (response.reason && response.reason.length) {
        dispatch(voucherRedemptionModalChange(true));
      }
      dispatch(selectedVoucherRedemptionSuccess(response));
    } catch (error) {
      dispatch(voucherRedemptionError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}
