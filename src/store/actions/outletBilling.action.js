import { throwError, to, toastMessage } from "../../utils/utils";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";

import ACTIONS from "./types.actions";
import BillingService from "../../services/billingPlan.services";

export function outletBillingRequest() {
  return { type: ACTIONS.BILLING_REQUEST };
}

export function outletBillingSuccess(response) {
  return { type: ACTIONS.BILLING_SUCCESS, response };
}

export function outletBillingError(error) {
  return { type: ACTIONS.BILLING_ERROR, error };
}

export function outletBillingListSuccess(response) {
  return { type: ACTIONS.BILLING_LIST_SUCCESS, response };
}

export function outletBillingFilterListSuccess(response) {
  return { type: ACTIONS.BILLING_FILTER_LIST_SUCCESS, response };
}

export function selectedBillingSuccess(response) {
  return { type: ACTIONS.SELECTED_BILLING_SUCCESS, response };
}
export function locationsSuccess(response) {
  return { type: ACTIONS.LOCATIONS_SUCCESS, response };
}

export function addOutletBilling(Info) {
  return async dispatch => {
    dispatch(outletBillingRequest());
    try {
      const [err, response] = await to(BillingService.addOutletBilling(Info));
      if (err) throwError(err);
      dispatch(outletBillingSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(outletBillingError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function getOutletBillingList(query) {
  return async dispatch => {
    dispatch(outletBillingRequest());
    try {
      const [err, response] = await to(BillingService.getOutletBillingList(query));
      if (err) throwError(err);
      dispatch(outletBillingSuccess(response));
      dispatch(outletBillingListSuccess(response.content));
    } catch (error) {
      dispatch(outletBillingError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function updateBillingPlan(code, Info) {
  return async dispatch => {
    dispatch(outletBillingRequest());
    try {
      const [err, response] = await to(BillingService.updateBillingPlanById(code, Info));
      if (err) throwError(err);
      dispatch(getBillingPlanById(code));
      toastMessage("success", SUCCESS_MESSAGE.EDITED);
      dispatch(getOutletBillingList());
    } catch (error) {
      dispatch(outletBillingError(error));
      toastMessage("error", ERROR_MESSAGE.EDITED);
      throwError(error);
    }
  };
}

export function getBillingPlanById(billingId) {
  return async dispatch => {
    dispatch(outletBillingRequest());
    try {
      const [err, response] = await to(BillingService.getBillingPlanById(billingId));
      if (err) throwError(err);
      dispatch(selectedBillingSuccess(response));
    } catch (error) {
      dispatch(outletBillingError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}
export function cloneBillingPlan(Id, query) {
  return async dispatch => {
    dispatch(outletBillingRequest());
    try {
      const [err, response] = await to(BillingService.cloneBillingPlan(Id));
      if (err) throwError(err);
      dispatch(selectedBillingSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.CLONE);
      dispatch(getOutletBillingList(query));
    } catch (error) {
      dispatch(outletBillingError(error));
      toastMessage("error", ERROR_MESSAGE.CLONE);
      throwError(error);
    }
  };
}

export function print(id) {
  return async dispatch => {
    try {
      const [err, response] = await to(BillingService.print(id));
      window.open(response);
      if (err) throwError(err);
    } catch (error) {
      toastMessage("error", ERROR_MESSAGE.FILE);
      dispatch(outletBillingError(error));
    }
  };
}
export function resumeBillingPlan(id, query) {
  return async dispatch => {
    try {
      const [err, response] = await to(BillingService.resumeBillingPlan(id));
      if (err) throwError(err);
      dispatch(outletBillingSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.RESUME);
      dispatch(getOutletBillingList(query));
    } catch (error) {
      toastMessage("error", ERROR_MESSAGE.RESUME);
      dispatch(outletBillingError(error));
    }
  };
}
export function suspendBillingPlan(id, query) {
  return async dispatch => {
    try {
      const [err, response] = await to(BillingService.suspendBillingPlan(id));
      if (err) throwError(err);
      dispatch(outletBillingSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.SUSPEND);
      dispatch(getOutletBillingList(query));
    } catch (error) {
      toastMessage("error", ERROR_MESSAGE.SUSPEND);
      dispatch(outletBillingError(error));
    }
  };
}

export function retireBillingPlan(id, query) {
  return async dispatch => {
    try {
      const [err, response] = await to(BillingService.retireBillingPlan(id));
      if (err) throwError(err);
      dispatch(outletBillingSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.RETIRED);
      dispatch(getOutletBillingList(query));
    } catch (error) {
      toastMessage("error", ERROR_MESSAGE.RETIRE);
      dispatch(outletBillingError(error));
    }
  };
}

export function getLocations() {
  return async dispatch => {
    try {
      const [err, response] = await to(BillingService.getCities());
      if (err) throwError(err);
      dispatch(locationsSuccess(response));
    } catch (error) {
      throwError(error);
    }
  };
}
