import { produce } from "immer";
import ACTIONS from "../actions/types.actions";

const merchantDashboard = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.MERCHANT_DAILY_RECORD_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.MERCHANT_DAILY_RECORD_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.MERCHANT_DAILY_RECORD_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.MERCHANT_DAILY_RECORD_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default merchantDashboard;
