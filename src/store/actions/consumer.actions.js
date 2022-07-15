import _get from "lodash/get";
import { throwError, to, toastMessage } from "../../utils/utils";
import ConsumerService from "../../services/consumer.service";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";

import ACTIONS from "./types.actions";
import { uploadSuccess, uploadError, uploadRequest } from "./ui.actions";
import UploadService from "../../services/upload.service";

export const consumerRequest = () => ({ type: ACTIONS.CONSUMER_REQUEST });

export const consumerSuccess = response => ({ type: ACTIONS.CONSUMER_SUCCESS, response });

export const consumerError = error => ({ type: ACTIONS.CONSUMER_ERROR, error });

export const getConsumerByIdSuccess = response => ({ type: ACTIONS.GET_CONSUMER_BY_ID_SUCCESS, response });

export const getAllConsumersSuccess = response => ({ type: ACTIONS.GET_CONSUMER_ALL_USERS_SUCCESS, response });

export function resetConsumer() {
  return { type: ACTIONS.GET_CONSUMER_BY_ID_SUCCESS, response: [] };
}

export const addNewConsumer = (consumerInfo, getProgress) => async dispatch => {
  dispatch(consumerRequest());
  try {
    if (_get(consumerInfo, "displayPicture.file")) {
      const files = [consumerInfo.displayPicture];
      const [err, response] = await to(UploadService.uploadUtil(files, getProgress));
      if (err) {
        toastMessage("error", err);
        dispatch(uploadError(err));
        // throwError(err);
      } else {
        dispatch(uploadSuccess());
      }
      const displayPicture = _get(response, "display-pic[0]") ? response["display-pic"][0].url : null;
      consumerInfo = { ...consumerInfo, displayPicture };
    }
    const [err, response] = await to(ConsumerService.addConsumer(consumerInfo));
    if (err) {
      consumerError(err);
      throwError(err);
    } else {
      dispatch(consumerSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    }
  } catch (error) {
    dispatch(consumerError(error));
    toastMessage("error", ERROR_MESSAGE.ADDED);
    throwError(error);
  }
};

export const getConsumerById = id => async dispatch => {
  dispatch(consumerRequest());
  try {
    const [err, response] = await to(ConsumerService.getConsumerById(id));
    if (err) {
      consumerError(err);
      throwError(err);
    } else {
      dispatch(getConsumerByIdSuccess(response));
    }
  } catch (error) {
    dispatch(consumerError(error));
    toastMessage("error", ERROR_MESSAGE.INFO);
    throwError(error);
  }
};

export const updateConsumer = (id, body, getProgress) => async dispatch => {
  dispatch(consumerRequest());
  try {
    if (_get(body, "displayPicture.file")) {
      dispatch(uploadRequest());
      const files = [body.displayPicture];
      const [err, response] = await to(UploadService.uploadUtil(files, getProgress));
      if (err) {
        toastMessage("error", err);
        dispatch(uploadError(err));
      } else {
        dispatch(uploadSuccess());
      }
      const displayPicture = _get(response, "display-pic[0]") ? response["display-pic"][0].url : null;
      body = { ...body, displayPicture };
    }
    const [err, response] = await to(ConsumerService.updateConsumer(id, body));
    if (err) throwError(err);
    dispatch(getConsumerById(id));
    toastMessage("success", SUCCESS_MESSAGE.EDITED);
  } catch (error) {
    dispatch(consumerError(error));
    toastMessage("error", ERROR_MESSAGE.EDITED);
    throwError(error);
  }
};

export const getAllConsumers = query => async dispatch => {
  dispatch(consumerRequest());
  try {
    const [err, response] = await to(ConsumerService.getAllConsumers(query));
    if (err) {
      consumerError(err);
      throwError(err);
    } else {
      dispatch(getAllConsumersSuccess(response));
    }
  } catch (error) {
    dispatch(consumerError(error));
    toastMessage("error", ERROR_MESSAGE.INFO);
    throwError(error);
  }
};

export const deleteAllConsumers = (ids, query) => async dispatch => {
  dispatch(consumerRequest());
  try {
    const [err, response] = await to(ConsumerService.deleteAllConsumers(ids));
    if (err) throwError(err);
    dispatch(getAllConsumers(query));
    // dispatch(consumerSuccess(response));
    toastMessage("success", SUCCESS_MESSAGE.DELETED);
  } catch (error) {
    dispatch(consumerError(error));
    toastMessage("error", ERROR_MESSAGE.DELETED);
    throwError(error);
  }
};

export function enableDisableConsumers(ids, enabled, query) {
  return async dispatch => {
    dispatch(consumerRequest());
    try {
      let err, response;
      if (enabled) {
        [err, response] = await to(ConsumerService.enableConsumers(ids));
      } else {
        [err, response] = await to(ConsumerService.disableConsumers(ids));
      }
      if (err) throwError(err);
      dispatch(getAllConsumers(query));
      toastMessage("success", SUCCESS_MESSAGE.ENABLED);
    } catch (error) {
      dispatch(consumerError(error));
      toastMessage("error", ERROR_MESSAGE.ENABLED);
      throwError(error);
    }
  };
}

export function deleteConsumer(id) {
  return async dispatch => {
    dispatch(consumerRequest());
    try {
      const [err, response] = await to(ConsumerService.deleteConsumer(id));
      if (err) throwError(err);
      dispatch(getConsumerByIdSuccess({}));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(consumerError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}
