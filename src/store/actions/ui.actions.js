import ACTIONS from "./types.actions";
import { throwError, toastMessage } from "../../utils/utils";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";

export function uiRequest() {
  return { type: ACTIONS.UI_REQUEST };
}

export function uiSuccess(response) {
  return { type: ACTIONS.UI_SUCCESS, response };
}

export function uiError(error) {
  return { type: ACTIONS.UI_ERROR, error };
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

export function showModal(bool) {
  return async dispatch => {
    dispatch(uiRequest());
    try {
      dispatch(uiSuccess(bool));
      return;
    } catch (error) {
      dispatch(uiError(error));
      throwError(error);
    }
  };
}
