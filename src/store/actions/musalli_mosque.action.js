import ACTIONS from "./types.actions";
import { throwError, to, toastMessage } from "../../utils/utils";
import musalliService from "../../services/musalli.service";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";

export function mosqueRequest() {
  return { type: ACTIONS.MOSQUE_REQUEST };
}

export function mosqueSuccess(response) {
  return { type: ACTIONS.MOSQUE_SUCCESS, response };
}

export function mosqueError(error) {
  return { type: ACTIONS.MOSQUE_ERROR, error };
}

export function mosqueListSuccess(response) {
  return { type: ACTIONS.MOSQUE_LIST_SUCCESS, response };
}

export function selectedMosqueSuccess(response) {
  return { type: ACTIONS.SELECTED_MOSQUE_SUCCESS, response };
}

/* Async Actions */

export function getAllMosque(query) {
  return async dispatch => {
    dispatch(mosqueRequest());
    try {
      const [err, response] = await to(musalliService.getAllMosque(query));
      if (err) throwError(err);
      dispatch(mosqueSuccess(response));
      dispatch(mosqueListSuccess(response.content));
    } catch (error) {
      dispatch(mosqueError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

// export function addMosque(userInfo, params) {
//   return async dispatch => {
//     dispatch(mosqueRequest());
//     try {
//       const [err, response] = await to(musalliService.addMosque(userInfo, params));
//       if (err) throwError(err);
//       dispatch(mosqueSuccess(response));
//       toastMessage("success", SUCCESS_MESSAGE.ADDED);
//     } catch (error) {
//       dispatch(mosqueError(error));
//       toastMessage("error", ERROR_MESSAGE.ADDED);
//       throwError(error);
//     }
//   };
// }

// export function deleteMosque(ids, query) {
//   return async dispatch => {
//     dispatch(mosqueRequest());
//     try {
//       const [err, response] = await to(musalliService.deleteMosque(ids));
//       if (err) throwError(err);
//       dispatch(getAllMosque(query));
//       toastMessage("success", SUCCESS_MESSAGE.DELETED);
//     } catch (error) {
//       dispatch(mosqueError(error));
//       toastMessage("error", ERROR_MESSAGE.DELETED);
//       throwError(error);
//     }
//   };
// }

// export function updateMosque(id, userInfo, params) {
//   return async dispatch => {
//     dispatch(mosqueRequest);
//     try {
//       const [err, response] = await to(musalliService.updateMosque(id, userInfo, params));
//       if (err) throwError(err);
//       dispatch(getMosqueById(id));
//       toastMessage("success", SUCCESS_MESSAGE.EDITED);
//     } catch (error) {
//       dispatch(mosqueError(error));
//       toastMessage("error", ERROR_MESSAGE.EDITED);
//       throwError(error);
//     }
//   };
// }

// export function getMosqueById(id) {
//   return async dispatch => {
//     dispatch(mosqueRequest());
//     try {
//       const [err, response] = await to(musalliService.getMosqueById(id));
//       if (err) throwError(err);
//       dispatch(selectedMosqueSuccess(response));
//     } catch (error) {
//       dispatch(mosqueError(error));
//       toastMessage("error", ERROR_MESSAGE.INFO);
//       throwError(error);
//     }
//   };
// }

// export function enableDisableMosque(ids, enabled, query) {
//   return async dispatch => {
//     dispatch(mosqueRequest());
//     try {
//       let err, response;
//       if (enabled) {
//         [err, response] = await to(musalliService.enableMosque(ids));
//       } else {
//         [err, response] = await to(musalliService.disableMosque(ids));
//       }
//       console.log("response", response);
//       if (err) throwError(err);
//       dispatch(getMusalliMosque(query));
//       toastMessage("success", SUCCESS_MESSAGE.ENABLED);
//     } catch (error) {
//       dispatch(mosqueError(error));
//       toastMessage("error", ERROR_MESSAGE.ENABLED);
//       throwError(error);
//     }
//   };
// }
