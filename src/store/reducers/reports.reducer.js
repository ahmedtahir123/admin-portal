import { produce } from "immer";
import ACTIONS from "../actions/types.actions";
const bookPurchaseReport = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.BOOK_ORDER_PURCHASE_REPORTS_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.BOOK_ORDER_PURCHASE_REPORTS_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.BOOK_ORDER_PURCHASE_REPORTS_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.BOOK_ORDER_PURCHASE_REPORTS_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default bookPurchaseReport;
