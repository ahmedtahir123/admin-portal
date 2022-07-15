import _get from "lodash/get";
import { func } from "prop-types";
import { throwError, to, toastMessage } from "../../utils/utils";
import ACTIONS from "./types.actions";
import bookOrderManagementService from "../../services/bookOrderManagement.service";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../utils/constants";
import { uploadRequest, uploadSuccess, uploadError } from "./ui.actions";
import UploadService from "../../services/upload.service";

export function bookOrdersRequest() {
  return { type: ACTIONS.BOOK_ORDERS_REQUEST };
}

export function bookOrdersSuccess(response) {
  return { type: ACTIONS.BOOK_ORDERS_SUCCESS, response };
}

export function bookOrdersError(error) {
  return { type: ACTIONS.BOOK_ORDERS_ERROR, error };
}

export function bookIdOrdersSuccess(response) {
  return { type: ACTIONS.SELECTED_BOOK_ORDERS_SUCCESS, response };
}

export function bookOrdersListSuccess(response) {
  return { type: ACTIONS.BOOK_ORDERS_LIST_SUCCESS, response };
}

export function selectedBookOrdersSuccess(response) {
  return { type: ACTIONS.SELECTED_BOOK_ORDERS_SUCCESS, response };
}
export function updateBookOrdersById(bookInfo, getProgress) {
  return async (dispatch, getState) => {
    const state = getState();
    const book = state.bookOrder.selected;
    dispatch(bookOrdersRequest());
    try {
      const card = bookInfo.bannerImageUrl ? [bookInfo.bannerImageUrl] : [];
      let err, response;
      let files = [];
      if (card.length) {
        dispatch(uploadRequest());
        files = files.concat(card);
        [err, response] = await to(UploadService.uploadUtil(files, getProgress));
        if (err) {
          toastMessage("error", err);
          dispatch(uploadError(err));
        } else {
          dispatch(uploadSuccess());
          bookInfo = {
            ...bookInfo,
            card: bookInfo.bannerImageUrl,
          };
        }
        bookInfo = {
          ...bookInfo,
          card: _get(response, "coporate-logo[0]") ? response["corporate-logo"][0].url : null,
        };
      } else {
        bookInfo = {
          ...bookInfo,
          card: bookInfo.bannerImageUrl,
        };
      }

      [err, response] = await to(bookOrderManagementService.updateBookOrdersById(bookInfo));
      if (err) throwError(err);
      dispatch(selectedBookOrdersSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.EDITED);
    } catch (error) {
      dispatch(bookOrdersError(error));
      toastMessage("error", ERROR_MESSAGE.EDITED);
      throwError(error);
    }
  };
}

export function printCSV(id) {
  return async dispatch => {
    try {
      const [err, response] = await to(bookOrderManagementService.printCSV(id));
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

export function regenerateCode(id) {
  return async dispatch => {
    try {
      const [err, response] = await to(bookOrderManagementService.regenerateCode(id));
      if (err) throwError(err);
      dispatch(getBookOrdersById(id));
    } catch (error) {
      dispatch(bookOrdersError());
      throwError(error);
    }
  };
}

// export function addBookOrder(bookInfo) {
//   return async dispatch => {
//     dispatch(bookOrdersRequest());
//     try {
//       const [err, response] = await to(bookOrderManagementService.addBookOrder(bookInfo));
//       if (err) throwError(err);
//       dispatch(bookOrdersSuccess(response));
//     } catch (error) {
//       dispatch(bookOrdersError(error));
//       throwError(error);
//     }
//   };
// }
export function addBookOrder(bookInfo, getProgress) {
  return async dispatch => {
    dispatch(bookOrdersRequest());
    try {
      const card = bookInfo.bannerImageUrl ? [bookInfo.bannerImageUrl] : [];
      let err, response;
      let files = [];
      if (card.length) {
        dispatch(uploadRequest());
        files = files.concat(card);
        [err, response] = await to(UploadService.uploadUtil(files, getProgress));

        if (err) {
          toastMessage("error", err);
          dispatch(uploadError(err));
        } else {
          dispatch(uploadSuccess());
        }
        bookInfo = {
          ...bookInfo,
          card: _get(response, "coporate-logo[0]") ? response["corporate-logo"][0].url : null,
        };
      }
      [err, response] = await to(bookOrderManagementService.addBookOrder(bookInfo));
      if (err) throwError(err);
      dispatch(bookOrdersSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(bookOrdersError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function enableDisableBookSubscription(ids, enabled, query) {
  return async dispatch => {
    dispatch(bookOrdersRequest());
    try {
      const body = {
        ids: ids.split(","),
        isEnabled: enabled,
      };
      let err, response;
      if (enabled) {
        [err, response] = await to(bookOrderManagementService.enableBookSubscription(body));
      } else {
        [err, response] = await to(bookOrderManagementService.disableBookSubscription(body));
      }
      if (err) throwError(err);
      dispatch(getBookOrdersList(query));
      toastMessage("success", SUCCESS_MESSAGE.ENABLED);
    } catch (error) {
      dispatch(bookOrdersError(error));
      toastMessage("error", ERROR_MESSAGE.ENABLED);
      throwError(error);
    }
  };
}

export function authorize(ids, status, query) {
  return async dispatch => {
    dispatch(bookOrdersRequest());
    try {
      const body = {
        ids: ids.split(","),
      };
      const [err, response] = await to(bookOrderManagementService.authoize(body));
      if (err) throwError(err);
      toastMessage("success", SUCCESS_MESSAGE.AUTHORIZED);
      dispatch(getBookOrdersList(query));
    } catch (error) {
      dispatch(bookOrdersError(error));
      toastMessage("error", ERROR_MESSAGE.AUTHORIZED);
      throwError(error);
    }
  };
}

export function reject(id, info) {
  return async dispatch => {
    dispatch(bookOrdersRequest());
    try {
      const body = {
        id,
        rejectionReason: info || "N/A",
      };
      const [err, response] = await to(bookOrderManagementService.reject(body));
      if (err) throwError(err);
      dispatch(getBookOrdersById(id));
      toastMessage("success", SUCCESS_MESSAGE.EDITED);
    } catch (error) {
      dispatch(bookOrdersError(error));
      toastMessage("error", ERROR_MESSAGE.EDITED);
      throwError(error);
    }
  };
}

export function getBookOrdersList(pageInfo) {
  return async dispatch => {
    dispatch(bookOrdersRequest());
    try {
      const [err, response] = await to(bookOrderManagementService.getBookOrdersList(pageInfo));
      if (err) throwError(err);
      dispatch(bookOrdersSuccess(response));
      dispatch(bookOrdersListSuccess(response.content));
    } catch (error) {
      toastMessage("error", ERROR_MESSAGE.LIST);
      dispatch(bookOrdersError(error));
      throwError(error);
    }
  };
}

export function getBookOrdersById(Id) {
  return async dispatch => {
    dispatch(bookOrdersRequest());
    try {
      const [err, response] = await to(bookOrderManagementService.getBookOrdersById(Id));
      if (err) throwError(err);
      toastMessage("success", SUCCESS_MESSAGE.INFO);
      dispatch(selectedBookOrdersSuccess(response));
    } catch (error) {
      toastMessage("error", ERROR_MESSAGE.INFO);
      dispatch(bookOrdersError(error));
      throwError(error);
    }
  };
}

export function deleteBookOrders(selectedRows, query) {
  return async dispatch => {
    const body = {
      ids: selectedRows.split(","),
    };
    dispatch(bookOrdersRequest());
    try {
      const [err, response] = await to(bookOrderManagementService.deleteBookOrders(body));
      if (err) throwError(err);
      dispatch(getBookOrdersList(query));
    } catch (error) {
      dispatch(bookOrdersError(error));
      throwError(error);
    }
  };
}

export function deliveryStatus(id, info, query) {
  return async dispatch => {
    const ids = id.split(",");
    const body = {
      ids,
      shippingStatus: info,
    };
    dispatch(bookOrdersRequest());
    try {
      const [err, response] = await to(bookOrderManagementService.deliveryStatus(body));
      if (err) throwError(err);
      if (!query) {
        toastMessage("success", SUCCESS_MESSAGE.EDITED);
        dispatch(getBookOrdersById(id));
      } else {
        toastMessage("success", SUCCESS_MESSAGE.EDITED);
        dispatch(getBookOrdersList(query));
      }
    } catch (error) {
      toastMessage("error", ERROR_MESSAGE.EDITED);
      dispatch(bookOrdersError(error));
      throwError(error);
    }
  };
}
export function paymentStatus(id, info, query) {
  return async dispatch => {
    const ids = id.split(",");
    const body = {
      ids,
      paymentStatus: info,
    };
    dispatch(bookOrdersRequest());
    try {
      const [err, response] = await to(bookOrderManagementService.paymentStatus(body));
      if (err) throwError(err);
      if (!query) {
        toastMessage("success", SUCCESS_MESSAGE.EDITED);
        dispatch(getBookOrdersById(id));
      } else {
        toastMessage("success", SUCCESS_MESSAGE.EDITED);
        dispatch(getBookOrdersList(query));
      }
    } catch (error) {
      toastMessage("error", ERROR_MESSAGE.EDITED);
      dispatch(bookOrdersError(error));
      throwError(error);
    }
  };
}
export function sendEmail(id) {
  return async dispatch => {
    try {
      const [err, response] = await to(bookOrderManagementService.sendEmail(id));
      if (err) throwError(err);
      toastMessage("success", SUCCESS_MESSAGE.EMAIL);
    } catch (error) {
      toastMessage("error", ERROR_MESSAGE.EMAIL);
      dispatch(bookOrdersError(error));
    }
  };
}
export function print(id) {
  return async dispatch => {
    try {
      const [err, response] = await to(bookOrderManagementService.print(id));
      window.open(response);
      if (err) throwError(err);
    } catch (error) {
      toastMessage("error", ERROR_MESSAGE.FILE);
      dispatch(bookOrdersError(error));
    }
  };
}
