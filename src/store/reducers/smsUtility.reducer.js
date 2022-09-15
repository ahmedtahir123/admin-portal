import { produce } from "immer";
import ACTIONS from "../actions/types.actions";
const smsUtility = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.SMS_UTILITY_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.SMS_UTILITY_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.SMS_UTILITY_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.SELECTED_SMS_UTILITY_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.SMS_UTILITY_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default smsUtility;
