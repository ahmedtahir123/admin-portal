import { produce } from "immer";
import ACTIONS from "../actions/types.actions";

const book = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.BOOK_MANAGEMENT_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.BOOK_MANAGEMENT_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.BOOK_MANAGEMENT_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.SELECTED_BOOK_MANAGEMENT_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.BOOK_MANAGEMENT_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default book;
