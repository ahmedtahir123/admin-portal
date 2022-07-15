import { produce } from "immer";
import ACTIONS from "../actions/types.actions";

const brand = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.BRAND_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.BRAND_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.BRAND_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.BRAND_FILTER_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.filteredList = action.response;
      return draft;
    case ACTIONS.SELECTED_BRAND_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.BRAND_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    case ACTIONS.BOOK_BRAND_REQUEST:
      draft.bookLoading = true;
      return draft;
    case ACTIONS.BOOK_BRAND_LIST_SUCCESS:
      draft.bookLoading = false;
      draft.error = null;
      draft.bookBrandList = action.response;
      return draft;
    case ACTIONS.SELECTED_BOOK_BRAND_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selectedBookBrandList = action.response;
      return draft;
    case ACTIONS.ADD_SELECTED_BOOK_BRAND_LIST_SUCCESS:
      draft.selectedBookBrandList = action.response;
      return draft;
    case ACTIONS.BOOK_BRAND_ERROR:
      draft.bookLoading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default brand;
