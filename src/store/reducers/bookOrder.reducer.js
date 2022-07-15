import { produce } from "immer";
import ACTIONS from "../actions/types.actions";

const bookOrder = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.BOOK_ORDERS_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.BOOK_ORDERS_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.BOOK_ORDERS_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.SELECTED_BOOK_ORDERS_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.BOOK_ORDERS_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default bookOrder;
