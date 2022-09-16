import ACTIONS from "./types.actions";
import { throwError, to, toastMessage } from "../../utils/utils";
import musalliService from "../../services/musalli.service";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";

export function smsUtilityRequest() {
  return { type: ACTIONS.SMS_UTILITY_REQUEST };
}

export function smsUtilitySuccess(response) {
  return { type: ACTIONS.SMS_UTILITY_SUCCESS, response };
}

export function smsUtilityError(error) {
  return { type: ACTIONS.SMS_UTILITY_ERROR, error };
}

export function smsUtilityListSuccess(response) {
  return { type: ACTIONS.SMS_UTILITY_LIST_SUCCESS, response };
}

export function selectedSmsUtilitySuccess(response) {
  return { type: ACTIONS.SELECTED_SMS_UTILITY_SUCCESS, response };
}

/* Async Actions */

export function postMusalliSmsUtility(body, form) {
  return async dispatch => {
    dispatch(smsUtilityRequest());
    try {
      const [err, response] = await to(musalliService.postSmsUtility(body));
      if (err) throwError(err);
      toastMessage("success", SUCCESS_MESSAGE.MESSAGE);
      form.resetFields();
      dispatch(smsUtilitySuccess(response));
      dispatch(smsUtilityListSuccess(response.content));
    } catch (error) {
      dispatch(smsUtilityError(error));
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
