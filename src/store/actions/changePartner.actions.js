import ACTIONS from "./types.actions";
import UserService from "../../services/user.service";
import { throwError, to, toastMessage } from "../../utils/utils";

import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";

export function changePartnerRequest() {
  return { type: ACTIONS.CHANGE_PARTNER_REQUEST };
}

export function changePartnerSuccess(response) {
  return { type: ACTIONS.CHANGE_PARTNER_SUCCESS, response };
}

export function changePartnerError(error) {
  return { type: ACTIONS.CHANGE_PARTNER_ERROR, error };
}

export function getUserTypes() {
  return async dispatch => {
    dispatch(changePartnerRequest());
    try {
      const [err1, response] = await to(UserService.getUserTypes());
      if (err1) throwError(err1);
      dispatch(changePartnerSuccess(response));
    } catch (error) {
      dispatch(changePartnerError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}
