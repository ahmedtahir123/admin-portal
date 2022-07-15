import _get from "lodash/get";
import { throwError, to, toastMessage, isJSON } from "../../utils/utils";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";

import ACTIONS from "./types.actions";
import bookManagementService from "../../services/book.service";
import { uploadRequest, uploadError, uploadSuccess } from "./ui.actions";
import UploadService from "../../services/upload.service";

export function bookRequest() {
  return { type: ACTIONS.BOOK_MANAGEMENT_REQUEST };
}

export function bookSuccess(response) {
  return { type: ACTIONS.BOOK_MANAGEMENT_SUCCESS, response };
}

export function bookError(error) {
  return { type: ACTIONS.BOOK_MANAGEMENT_ERROR, error };
}

export function bookIdSuccess(response) {
  return { type: ACTIONS.SELECTED_BOOK_MANAGEMENT_SUCCESS, response };
}

export function bookListSuccess(response) {
  return { type: ACTIONS.BOOK_MANAGEMENT_LIST_SUCCESS, response };
}

export function selectedBookSuccess(response) {
  return { type: ACTIONS.SELECTED_BOOK_MANAGEMENT_SUCCESS, response };
}
export function resetBooks() {
  return { type: ACTIONS.BOOK_MANAGEMENT_LIST_SUCCESS, response: [] };
}
export function updateBook(id, bookInfo, getProgress) {
  return async (dispatch, getState) => {
    const state = getState();
    const book = state.book.selected;
    dispatch(bookRequest());
    try {
      const imageUrls = bookInfo.imageUrls && bookInfo.imageUrls.length ? bookInfo.imageUrls : [];
      const coverImageUrl = bookInfo.coverImageUrl ? [bookInfo.coverImageUrl] : [];
      let err, response;
      let files = [];
      const oldBanners = [];

      if (imageUrls.length || coverImageUrl.length) {
        let newBanners = [];
        if (imageUrls.length) {
          newBanners = imageUrls.filter(banner => {
            if (!banner.file) oldBanners.push(banner);
            return banner.file;
          });
        }
        dispatch(uploadRequest());
        files = files.concat(newBanners, coverImageUrl);
        if (files && files.length) [err, response] = await to(UploadService.uploadUtil(files, getProgress));
        if (err) {
          toastMessage("error", err);
          dispatch(uploadError(err));
          bookInfo = {
            ...bookInfo,
            imageUrls: book.imageUrls,
            coverImageUrl: book.coverImageUrl,
          };
        } else {
          dispatch(uploadSuccess());
          const allBanners = [...oldBanners, ..._get(response, "image-gallery", [])];
          bookInfo = {
            ...bookInfo,
            imageUrls: allBanners,
            coverImageUrl: _get(response, "listing-card[0]") ? response["listing-card"][0].url : book.coverImageUrl,
          };
        }
      } else {
        bookInfo = {
          ...bookInfo,
          imageUrls: book.imageUrls,
          coverImageUrl: book.coverImageUrl,
        };
      }
      if (bookInfo.imageUrls != null) {
        bookInfo = {
          ...bookInfo,
          imageUrls: isJSON(bookInfo.imageUrls) ? bookInfo.imageUrls : JSON.stringify(bookInfo.imageUrls),
        };
      }
      [err, response] = await to(bookManagementService.updateBookById(id, bookInfo));
      if (err) throwError(err);
      dispatch(getBookById(id));

      toastMessage("success", SUCCESS_MESSAGE.EDITED);
    } catch (error) {
      dispatch(bookError(error));
      toastMessage("error", ERROR_MESSAGE.EDITED);
      throwError(error);
    }
  };
}

export function addBook(bookInfo, getProgress) {
  return async dispatch => {
    dispatch(bookRequest());
    try {
      const imageUrls = bookInfo.imageUrls && bookInfo.imageUrls.length ? bookInfo.imageUrls : [];
      const coverImageUrl = bookInfo.coverImageUrl ? [bookInfo.coverImageUrl] : [];
      let err, response;
      let files = [];
      if (imageUrls.length || coverImageUrl.length) {
        dispatch(uploadRequest());
        files = files.concat(imageUrls, coverImageUrl);
        [err, response] = await to(UploadService.uploadUtil(files, getProgress));
        if (err) {
          toastMessage("error", err);
          dispatch(uploadError(err));
        } else {
          dispatch(uploadSuccess());
        }
        bookInfo = {
          ...bookInfo,
          imageUrls: _get(response, "image-gallery") ? response["image-gallery"] : null,
          coverImageUrl: _get(response, "listing-card[0]") ? response["listing-card"][0].url : null,
        };
      }
      if (bookInfo.imageUrls != null) {
        bookInfo = {
          ...bookInfo,
          imageUrls: isJSON(bookInfo.imageUrls) ? bookInfo.imageUrls : JSON.stringify(bookInfo.imageUrls),
        };
      }
      [err, response] = await to(bookManagementService.addBook(bookInfo));
      if (err) throwError(err);
      dispatch(bookSuccess(response));

      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(bookError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function getBooksList(pageInfo) {
  return async dispatch => {
    dispatch(bookRequest());
    try {
      const [err, response] = await to(bookManagementService.getBooksList(pageInfo));
      if (err) throwError(err);
      dispatch(bookSuccess(response));
      dispatch(bookListSuccess(response.content));
    } catch (error) {
      dispatch(bookError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function getBookById(Id) {
  return async dispatch => {
    dispatch(bookRequest());
    try {
      const [err, response] = await to(bookManagementService.getBookById(Id));
      if (err) throwError(err);
      dispatch(selectedBookSuccess(response));
    } catch (error) {
      dispatch(bookError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}

export function deleteAllBooks(ids, query) {
  return async dispatch => {
    dispatch(bookRequest());
    try {
      const [err, response] = await to(bookManagementService.deleteAllBook(ids));
      if (err) throwError(err);
      dispatch(getBooksList(query));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(bookError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}

export function enableDisableBooks(ids, enabled, query) {
  return async dispatch => {
    dispatch(bookRequest());
    try {
      let err, response;
      if (enabled) {
        [err, response] = await to(bookManagementService.enableBooks(ids));
      } else {
        [err, response] = await to(bookManagementService.disableBooks(ids));
      }
      if (err) throwError(err);
      dispatch(getBooksList(query));
      toastMessage("success", SUCCESS_MESSAGE.ENABLED);
    } catch (error) {
      dispatch(bookError(error));
      toastMessage("error", ERROR_MESSAGE.ENABLED);
      throwError(error);
    }
  };
}

export function getBooksByLocation(code) {
  return async dispatch => {
    dispatch(bookRequest());
    try {
      const [err, response] = await to(bookManagementService.getBooksByLocation(code));
      if (err) throwError(err);
      dispatch(bookListSuccess(response));
    } catch (error) {
      dispatch(bookError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function printCSV(id) {
  return async dispatch => {
    try {
      const [err, response] = await to(bookManagementService.printCSV(id));
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

export function publishUnPublishBook(codes, publish, query) {
  return async dispatch => {
    dispatch(bookRequest());
    try {
      let err, response;
      if (publish) {
        [err, response] = await to(bookManagementService.publishBook(codes));
      } else {
        [err, response] = await to(bookManagementService.unpublishBook(codes));
      }
      if (err) throwError(err);
      // if (query) {
      //   dispatch(getBooksList(query));
      // } else {
      dispatch(getBookById(codes[0]));
      // }
      toastMessage("success", SUCCESS_MESSAGE.PUBLISHED);
    } catch (error) {
      dispatch(bookError(error));
      toastMessage("error", ERROR_MESSAGE.PUBLISHED);
      throwError(error);
    }
  };
}
