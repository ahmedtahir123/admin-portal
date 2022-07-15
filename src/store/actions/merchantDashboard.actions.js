import _get from "lodash/get";
import { throwError, to, toastMessage, isJSON } from "../../utils/utils";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";

import ACTIONS from "./types.actions";
import merchantDashboardService from "../../services/merchantDashboardService";

export function dailyRecordRequest() {
  return { type: ACTIONS.MERCHANT_DAILY_RECORD_REQUEST };
}

export function dailyRecordSuccess(response) {
  return { type: ACTIONS.MERCHANT_DAILY_RECORD_SUCCESS, response };
}

export function dailyRecordError(error) {
  return { type: ACTIONS.MERCHANT_DAILY_RECORD_ERROR, error };
}

export function dailyRecordListSuccess(response) {
  return { type: ACTIONS.MERCHANT_DAILY_RECORD_LIST_SUCCESS, response };
}

export function getDailyRecordsList() {
  return async dispatch => {
    dispatch(dailyRecordRequest());
    try {
      const [err, response] = await to(merchantDashboardService.getDailyRecordsList());
      //   debugger;
      if (err) throwError(err);
      dispatch(dailyRecordSuccess(response));
      dispatch(dailyRecordListSuccess(response.content));
    } catch (error) {
      dispatch(dailyRecordError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}
