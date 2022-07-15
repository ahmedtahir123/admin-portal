import { throwError, to, toastMessage } from "../../utils/utils";

import ACTIONS from "./types.actions";
import BookSubscriptionService from "../../services/bookSubscription.service";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";

export function bookSubscriptionRequest() {
  return { type: ACTIONS.BOOK_SUBSCRIPTION_REQUEST };
}

export function bookSubscriptionSuccess(response) {
  return { type: ACTIONS.BOOK_SUBSCRIPTION_SUCCESS, response };
}

export function bookSubscriptionError(error) {
  return { type: ACTIONS.BOOK_SUBSCRIPTION_ERROR, error };
}

export function bookSubscriptionIdSuccess(response) {
  return { type: ACTIONS.SELECTED_BOOK_SUBSCRIPTION_SUCCESS, response };
}

export function bookSubscriptionListSuccess(response) {
  return { type: ACTIONS.BOOK_SUBSCRIPTION_LIST_SUCCESS, response };
}

export function selectedBookSubscriptionSuccess(response) {
  return { type: ACTIONS.SELECTED_BOOK_SUBSCRIPTION_SUCCESS, response };
}
export function locationsSuccess(response) {
  return { type: ACTIONS.LOCATIONS_SUCCESS, response };
}

export function addBookSubscription(subscriptionInfo) {
  return async dispatch => {
    dispatch(bookSubscriptionRequest());
    try {
      const [err, response] = await to(BookSubscriptionService.addBookSubscription(subscriptionInfo));
      if (err) throwError(err);
      dispatch(bookSubscriptionSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(bookSubscriptionError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function regenerateCode(id) {
  return async dispatch => {
    try {
      const [err, response] = await to(BookSubscriptionService.regenerateCode(id));
      if (err) throwError(err);
      dispatch(getBookSubscriptionById(id));
    } catch (error) {
      dispatch(bookSubscriptionError());
      throwError(error);
    }
  };
}

export function updateBookSubscription(subscriptionInfo) {
  return async dispatch => {
    dispatch(bookSubscriptionRequest());
    try {
      const [err, response] = await to(BookSubscriptionService.updateBookSubscriptionById(subscriptionInfo));
      if (err) throwError(err);
      dispatch(bookSubscriptionSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.EDITED);
    } catch (error) {
      dispatch(bookSubscriptionError(error));
      toastMessage("error", ERROR_MESSAGE.EDITED);
      throwError(error);
    }
  };
}

export function getBookSubscriptionsList(pageInfo) {
  return async dispatch => {
    dispatch(bookSubscriptionRequest());
    try {
      const [err, response] = await to(BookSubscriptionService.getBookSubscriptionList(pageInfo));
      if (err) throwError(err);
      dispatch(bookSubscriptionSuccess(response));
      dispatch(bookSubscriptionListSuccess(response.content));
    } catch (error) {
      dispatch(bookSubscriptionError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function getBookSubscriptionById(subscriptionId) {
  return async dispatch => {
    dispatch(bookSubscriptionRequest());
    try {
      const [err, response] = await to(BookSubscriptionService.getBookSubscriptionById(subscriptionId));
      if (err) throwError(err);
      dispatch(selectedBookSubscriptionSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.INFO);
    } catch (error) {
      dispatch(bookSubscriptionError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}

export function deleteBookSubscriptions(selectedRows, query) {
  return async dispatch => {
    const body = {
      ids: selectedRows.split(","),
    };
    dispatch(bookSubscriptionRequest());
    try {
      const [err, response] = await to(BookSubscriptionService.deleteBookSubscriptions(body));
      if (err) throwError(err);
      dispatch(getBookSubscriptionsList(query));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(bookSubscriptionError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}

export function enableDisableBookSubscription(ids, enabled, query) {
  return async dispatch => {
    dispatch(bookSubscriptionRequest());
    try {
      const body = {
        ids: ids.split(","),
        isEnabled: enabled,
      };
      let err, response;
      if (enabled) {
        [err, response] = await to(BookSubscriptionService.enableBookSubscription(body));
      } else {
        [err, response] = await to(BookSubscriptionService.disableBookSubscription(body));
      }
      if (err) throwError(err);
      dispatch(getBookSubscriptionsList(query));
      toastMessage("success", SUCCESS_MESSAGE.ENABLED);
    } catch (error) {
      dispatch(bookSubscriptionError(error));
      toastMessage("error", ERROR_MESSAGE.ENABLED);
      throwError(error);
    }
  };
}

export function authorize(ids, status, query) {
  return async dispatch => {
    dispatch(bookSubscriptionRequest());
    try {
      const body = {
        ids: ids.split(","),
      };
      const [err, response] = await to(BookSubscriptionService.authoize(body));
      if (err) throwError(err);
      dispatch(getBookSubscriptionsList(query));
      toastMessage("success", SUCCESS_MESSAGE.AUTHORIZED);
    } catch (error) {
      dispatch(bookSubscriptionError(error));
      toastMessage("error", ERROR_MESSAGE.AUTHORIZED);
      throwError(error);
    }
  };
}

export function printCSV(id) {
  return async dispatch => {
    try {
      const [err, response] = await to(BookSubscriptionService.printCSV(id));
      if (err) throwError(err);
      if (response) {
        window.open(response);
      } else {
        toastMessage("error", ERROR_MESSAGE.FILE);
      }
    } catch (error) {
      throwError(error);
    }
  };
}

export function print(id) {
  return async dispatch => {
    try {
      const [err, response] = await to(BookSubscriptionService.print(id));
      if (response) {
        window.open(response);
      } else {
        toastMessage("error", ERROR_MESSAGE.FILE);
      }
      if (err) throwError(err);
    } catch (error) {
      toastMessage("error", ERROR_MESSAGE.FILE);
      dispatch(bookSubscriptionError(error));
    }
  };
}
