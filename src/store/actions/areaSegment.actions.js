import { throwError, to, toastMessage } from "../../utils/utils";
import AreaSegmentService from "../../services/areaSegment.service";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";

import ACTIONS from "./types.actions";

export function segmentRequest() {
  return { type: ACTIONS.AREA_SEGMENT_REQUEST };
}

export function segmentSuccess(response) {
  return { type: ACTIONS.AREA_SEGMENT_SUCCESS, response };
}

export function stateSuccess(response) {
  return { type: ACTIONS.AREA_STATE_SUCCESS, response };
}

export function segmentError(error) {
  return { type: ACTIONS.AREA_SEGMENT_ERROR, error };
}

export function segmentIdSuccess(response) {
  return { type: ACTIONS.SELECTED_AREA_SEGMENT_SUCCESS, response };
}

export function segmentListSuccess(response) {
  return { type: ACTIONS.AREA_SEGMENT_LIST_SUCCESS, response };
}

export function locationsSuccess(response) {
  return { type: ACTIONS.LOCATIONS_SUCCESS, response };
}

export function selectedSegmentSuccess(response) {
  return { type: ACTIONS.SELECTED_AREA_SEGMENT_SUCCESS, response };
}

export function addSegment(segmentInfo) {
  return async dispatch => {
    dispatch(segmentRequest());
    try {
      const [err, response] = await to(AreaSegmentService.addAreaSegment(segmentInfo));
      if (err) throwError(err);
      dispatch(segmentSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(segmentError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function updateSegment(id, segmentInfo) {
  return async dispatch => {
    dispatch(segmentRequest());
    try {
      const [err, response] = await to(AreaSegmentService.updateSegmentById(id, segmentInfo));
      if (err) throwError(err);
      dispatch(segmentSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.EDITED);
    } catch (error) {
      dispatch(segmentError(error));
      toastMessage("error", ERROR_MESSAGE.EDITED);
      throwError(error);
    }
  };
}

export function getStateById(id) {
  return async dispatch => {
    dispatch(segmentRequest());
    try {
      const [err, response] = await to(AreaSegmentService.getStateById(id));
      if (err) throwError(err);
      dispatch(segmentSuccess(response));
      dispatch(segmentListSuccess(response.content));
    } catch (error) {
      dispatch(segmentError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}

export function getSegmentList(query) {
  return async dispatch => {
    dispatch(segmentRequest());
    try {
      const [err, response] = await to(AreaSegmentService.getSegmentsList(query));
      if (err) throwError(err);
      dispatch(segmentSuccess(response));
      dispatch(segmentListSuccess(response.content));
    } catch (error) {
      dispatch(segmentError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function getSegmentById(id) {
  return async dispatch => {
    dispatch(segmentRequest());
    try {
      const [err, response] = await to(AreaSegmentService.getSegmentById(id));
      if (err) throwError(err);
      dispatch(selectedSegmentSuccess(response));
    } catch (error) {
      dispatch(segmentError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}

export function getState() {
  return async dispatch => {
    dispatch(segmentRequest());
    try {
      const [err, response] = await to(AreaSegmentService.getState());
      if (err) throwError(err);
      dispatch(stateSuccess(response));
      // toastMessage("success", SUCCESS_MESSAGE.LIST);
    } catch (error) {
      dispatch(segmentError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function getLocations(state) {
  let err, response;
  return async dispatch => {
    try {
      if (state) {
        [err, response] = await to(AreaSegmentService.getCities(state));
      } else {
        [err, response] = await to(AreaSegmentService.getCity());
      }
      if (err) throwError(err);
      dispatch(locationsSuccess(response));
    } catch (error) {
      throwError(error);
    }
  };
}

export function deleteAllSegments(selectedRows, query) {
  return async dispatch => {
    dispatch(segmentRequest());
    try {
      const [err, response] = await to(AreaSegmentService.deleteAllSegments(selectedRows));
      if (err) throwError(err);
      dispatch(getSegmentList(query));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(segmentError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}
export function enableDisableSegmentCategories(ids, enabled, query) {
  return async dispatch => {
    dispatch(segmentRequest());
    try {
      let err, response;
      if (enabled) {
        [err, response] = await to(AreaSegmentService.enableSegmentCategories(ids));
      } else {
        [err, response] = await to(AreaSegmentService.disableSegmentCategories(ids));
      }
      if (err) throwError(err);
      dispatch(getSegmentList(query));
      toastMessage("success", SUCCESS_MESSAGE.ENABLED);
    } catch (error) {
      dispatch(segmentError(error));
      toastMessage("error", ERROR_MESSAGE.ENABLED);
      throwError(error);
    }
  };
}

export function deleteArea(id) {
  return async dispatch => {
    dispatch(segmentRequest());
    try {
      const [err, response] = await to(AreaSegmentService.deleteAreaById(id));
      if (err) throwError(err);
      dispatch(segmentSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(segmentError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}
