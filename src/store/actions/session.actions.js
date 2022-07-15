import { throwError, to, toastMessage } from "../../utils/utils";
import SessionService from "../../services/session.service";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";

import ACTIONS from "./types.actions";

export function sessionUserRequest() {
  return { type: ACTIONS.SESSION_USER_REQUEST };
}

export function sessionUserSuccess(response) {
  return { type: ACTIONS.SESSION_USER_SUCCESS, response };
}

export function getAllSessionUsersSuccess(response) {
  return { type: ACTIONS.GET_SESSION_ALL_USERS_SUCCESS, response };
}

export function getAllSessionUsersListSuccess(response) {
  return { type: ACTIONS.GET_SESSION_ALL_USERS_LIST_SUCCESS, response };
}

export function sessionError(error) {
  return { type: ACTIONS.SESSION_USER_ERROR, error };
}

export function getUserByIdSuccess(response) {
  return { type: ACTIONS.GET_SESSION_USERBYID_SUCCESS, response };
}

export function getAllSessionUsers(query) {
  return async dispatch => {
    dispatch(sessionUserRequest());
    try {
      const [err, response] = await to(SessionService.getAllSessionUsers(query));
      if (err) throwError(err);
      dispatch(getAllSessionUsersSuccess(response));
      dispatch(getAllSessionUsersListSuccess(response.content));
    } catch (error) {
      dispatch(sessionError(error));

      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function revokeAllSessionUsers() {
  return async dispatch => {
    dispatch(sessionUserRequest());
    try {
      const [err, response] = await to(SessionService.revokeAllSessionUsers());
      if (err) throwError(err);
      dispatch(getAllSessionUsersSuccess(response));
    } catch (error) {
      dispatch(sessionError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}
