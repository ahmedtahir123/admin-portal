import ACTIONS from "./types.actions";
import { throwError, to, toastMessage } from "../../utils/utils";
import musalliService from "../../services/musalli.service";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";

export function volunteerRequest() {
  return { type: ACTIONS.VOLUNTEER_REQUEST };
}

export function volunteerSuccess(response) {
  return { type: ACTIONS.VOLUNTEER_SUCCESS, response };
}

export function volunteerError(error) {
  return { type: ACTIONS.VOLUNTEER_ERROR, error };
}

export function volunteerListSuccess(response) {
  return { type: ACTIONS.VOLUNTEER_LIST_SUCCESS, response };
}

export function selectedVolunteerSuccess(response) {
  return { type: ACTIONS.SELECTED_VOLUNTEER_SUCCESS, response };
}

export function resetSelectedData() {
  return { type: ACTIONS.RESET_SESSION_SELECTED_DATA };
}

/* Async Actions */

export function getMusalliVolunteer(query) {
  // console.log("FUNRUN");

  return async dispatch => {
    dispatch(volunteerRequest());
    try {
      const [err, response] = await to(musalliService.getMusalliVolunteer(query));
      if (err) throwError(err);
      dispatch(volunteerSuccess(response));
      dispatch(volunteerListSuccess(response.content));
    } catch (error) {
      dispatch(volunteerError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

// Get Volunteer By Id

export function getMusalliVolunteerById(id) {
  return async dispatch => {
    dispatch(volunteerRequest());
    try {
      const [err, response] = await to(musalliService.getMusalliVolunteerById(id));
      if (err) throwError(err);
      dispatch(selectedVolunteerSuccess(response));
    } catch (error) {
      dispatch(volunteerError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}

export function updateVolunteer(id, body, params, onCancel) {
  return async dispatch => {
    dispatch(volunteerRequest());
    try {
      const [err, response] = await to(musalliService.updateVolunteer(id, body, params));
      if (err) throwError(err);
      // dispatch(getMusalliVolunteerById(id));
      onCancel();
      toastMessage("success", SUCCESS_MESSAGE.EDITED);
    } catch (error) {
      dispatch(volunteerError(error));
      toastMessage("error", ERROR_MESSAGE.EDITED);
      throwError(error);
    }
  };
}

export function addVolunteer(body, params, onCancel) {
  console.log(body, "responseresponseresponseresponse");
  return async dispatch => {
    dispatch(volunteerRequest());
    try {
      const [err, response] = await to(musalliService.addVolunteer(body, params));
      if (err) throwError(err);
      // dispatch(participantSuccess(response));
      onCancel();
      console.log(response, "responseresponseresponseresponse");
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(volunteerError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      console.log(error, "responseresponseresponseresponse");
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
//       dispatch(getMusalliVolunteer(query));
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
//       dispatch(getMusalliVolunteer(query));
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
