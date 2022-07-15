import { throwError, to, toastMessage } from "../../utils/utils";

import ACTIONS from "./types.actions";
import DesignerService from "../../services/landingPageDesigner.services";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";

export function designerRequest() {
  return { type: ACTIONS.DESIGNER_REQUEST };
}

export function designerSuccess(response) {
  return { type: ACTIONS.DESIGNER_SUCCESS, response };
}

export function designerError(error) {
  return { type: ACTIONS.DESIGNER_ERROR, error };
}

export function addDesigner(info) {
  return async dispatch => {
    dispatch(designerRequest());
    try {
      const [err, response] = await to(DesignerService.addDesigner(info));
      if (err) throwError(err);
      dispatch(designerSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(designerError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function getDesigner(info) {
  return async dispatch => {
    dispatch(designerRequest());
    try {
      const [err, response] = await to(DesignerService.getDesigner(info));
      if (err) throwError(err);
      dispatch(designerSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.LIST);
    } catch (error) {
      dispatch(designerError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function updateDesigner(id, info) {
  return async dispatch => {
    dispatch(designerRequest());
    try {
      const [err, response] = await to(DesignerService.updateDesigner(id, info));
      if (err) throwError(err);
      dispatch(designerSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.LIST);
    } catch (error) {
      dispatch(designerError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}
