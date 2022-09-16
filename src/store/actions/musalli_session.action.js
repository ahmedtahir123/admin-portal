import ACTIONS from "./types.actions";
import { throwError, to, toastMessage } from "../../utils/utils";
import musalliService from "../../services/musalli.service";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";

export function sessionRequest() {
  return { type: ACTIONS.SESSION_REQUEST };
}

export function sessionSuccess(response) {
  return { type: ACTIONS.SESSION_SUCCESS, response };
}

export function sessionError(error) {
  return { type: ACTIONS.SESSION_ERROR, error };
}

export function sessionListSuccess(response) {
  return { type: ACTIONS.SESSION_LIST_SUCCESS, response };
}

export function selectedSessionSuccess(response) {
  return { type: ACTIONS.SELECTED_SESSION_SUCCESS, response };
}

export function resetSelectedData() {
  return { type: ACTIONS.RESET_SESSION_SELECTED_DATA };
}

/* Async Actions */

export function getMusalliSession(query) {
  return async dispatch => {
    dispatch(sessionRequest());
    try {
      const [err, response] = await to(musalliService.getMusalliSession(query));
      if (err) throwError(err);
      dispatch(sessionSuccess(response));
      dispatch(sessionListSuccess(response));
    } catch (error) {
      dispatch(sessionError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

// Get Musalli Session By ID For Edit

export function getMusalliSessionById(id) {
  return async dispatch => {
    dispatch(sessionRequest());
    try {
      const [err, response] = await to(musalliService.getMusalliSessionById(id));
      if (err) throwError(err);
      dispatch(selectedSessionSuccess(response));
    } catch (error) {
      dispatch(sessionError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}

// Update Musalli Session

export function updateMusalliSession(id, userInfo, params) {
  return async dispatch => {
    dispatch(sessionRequest());
    try {
      const [err, response] = await to(musalliService.updateMusalliSession(id, userInfo, params));
      if (err) throwError(err);
      // dispatch(getUserById(id));
      toastMessage("success", SUCCESS_MESSAGE.EDITED);
    } catch (error) {
      dispatch(sessionError(error));
      toastMessage("error", ERROR_MESSAGE.EDITED);
      throwError(error);
    }
  };
}

export function createMusalliSession(userInfo, params) {
  return async dispatch => {
    dispatch(sessionRequest());
    try {
      const [err, response] = await to(musalliService.createMusalliSession(userInfo, params));
      if (err) throwError(err);
      dispatch(sessionSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(sessionError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function resetData() {
  return async dispatch => {
    dispatch(resetSelectedData());
  };
}

// export function addParticipantUser(userInfo, params) {
//   return async dispatch => {
//     dispatch(participantRequest());
//     try {
//       const [err, response] = await to(musalliService.addParticipantUser(userInfo, params));
//       if (err) throwError(err);
//       dispatch(participantSuccess(response));
//       toastMessage("success", SUCCESS_MESSAGE.ADDED);
//     } catch (error) {
//       dispatch(participantError(error));
//       toastMessage("error", ERROR_MESSAGE.ADDED);
//       throwError(error);
//     }
//   };
// }

// export function deleteParticipantUsers(ids, query) {
//   return async dispatch => {
//     dispatch(participantRequest());
//     try {
//       const [err, response] = await to(musalliService.deleteParticipantUsers(ids));
//       if (err) throwError(err);
//       dispatch(getMusalliSession(query));
//       toastMessage("success", SUCCESS_MESSAGE.DELETED);
//     } catch (error) {
//       dispatch(participantError(error));
//       toastMessage("error", ERROR_MESSAGE.DELETED);
//       throwError(error);
//     }
//   };
// }

// export function updateUser(id, userInfo, params) {
//   return async dispatch => {
//     dispatch(participantRequest);
//     try {
//       const [err, response] = await to(musalliService.updateParticipant(id, userInfo, params));
//       if (err) throwError(err);
//       dispatch(getUserById(id));
//       toastMessage("success", SUCCESS_MESSAGE.EDITED);
//     } catch (error) {
//       dispatch(participantError(error));
//       toastMessage("error", ERROR_MESSAGE.EDITED);
//       throwError(error);
//     }
//   };
// }

// export function getUserById(id) {
//   return async dispatch => {
//     dispatch(participantRequest());
//     try {
//       const [err, response] = await to(musalliService.getParticipantById(id));
//       if (err) throwError(err);
//       dispatch(selectedParticipantSuccess(response));
//     } catch (error) {
//       dispatch(participantError(error));
//       toastMessage("error", ERROR_MESSAGE.INFO);
//       throwError(error);
//     }
//   };
// }

// export function enableDisableParticipant(ids, enabled, query) {
//   return async dispatch => {
//     dispatch(participantRequest());
//     try {
//       let err, response;
//       if (enabled) {
//         [err, response] = await to(musalliService.enableParticipant(ids));
//       } else {
//         [err, response] = await to(musalliService.disableParticipant(ids));
//       }
//       console.log("response", response);
//       if (err) throwError(err);
//       dispatch(getMusalliSession(query));
//       toastMessage("success", SUCCESS_MESSAGE.ENABLED);
//     } catch (error) {
//       dispatch(participantError(error));
//       toastMessage("error", ERROR_MESSAGE.ENABLED);
//       throwError(error);
//     }
//   };
// }

// export function deleteParticipantUser(id) {
//   return async dispatch => {
//     dispatch(participantRequest());
//     try {
//       const [err, response] = await to(musalliService.deleteParticipantUser(id));
//       if (err) throwError(err);
//       dispatch(participantSuccess(response));
//       toastMessage("success", SUCCESS_MESSAGE.DELETED);
//     } catch (error) {
//       dispatch(participantError(error));
//       toastMessage("error", ERROR_MESSAGE.DELETED);
//       throwError(error);
//     }
//   };
// }
