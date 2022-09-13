import ACTIONS from "./types.actions";
import { throwError, to, toastMessage } from "../../utils/utils";
import musalliService from "../../services/musalli.service";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";

export function participantsByMosqueAndSessionRequest() {
  return { type: ACTIONS.PARTICIPANT_BY_MOSQUE_AND_SESSION_REQUEST };
}

export function participantsByMosqueAndSessionSuccess(response) {
  return { type: ACTIONS.PARTICIPANT_BY_MOSQUE_AND_SESSION_SUCCESS, response };
}

export function participantsByMosqueAndSessionError(error) {
  return { type: ACTIONS.PARTICIPANT_BY_MOSQUE_AND_SESSION_ERROR, error };
}

export function ParticipantsByMosqueAndSessionListSuccess(response) {
  return { type: ACTIONS.PARTICIPANT_BY_MOSQUE_AND_SESSION_LIST_SUCCESS, response };
}

export function selectedParticipantsByMosqueAndSessionSuccess(response) {
  return { type: ACTIONS.SELECTED_PARTICIPANT_BY_MOSQUE_AND_SESSION_SUCCESS, response };
}

/* Async Actions */

export function getMusalliParticipantsByMosqueAndSession(query) {
  return async dispatch => {
    dispatch(participantsByMosqueAndSessionRequest());
    try {
      const [err, response] = await to(musalliService.getAllParticipantsByMosqueAndSession(query));
      if (err) throwError(err);
      dispatch(participantsByMosqueAndSessionSuccess(response));
      dispatch(ParticipantsByMosqueAndSessionListSuccess(response.content));
    } catch (error) {
      dispatch(participantsByMosqueAndSessionError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
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
//       dispatch(getMusalliParticipant(query));
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
//       dispatch(getMusalliParticipant(query));
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
