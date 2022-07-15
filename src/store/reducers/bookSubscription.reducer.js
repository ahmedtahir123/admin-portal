import { produce } from "immer";
import ACTIONS from "../actions/types.actions";

const bookSubscription = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.BOOK_SUBSCRIPTION_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.BOOK_SUBSCRIPTION_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.BOOK_SUBSCRIPTION_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.SELECTED_BOOK_SUBSCRIPTION_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.BOOK_SUBSCRIPTION_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    case ACTIONS.LOCATIONS_SUCCESS:
      draft.locations = action.response;
      return draft;
    default:
      return draft;
  }
});

export default bookSubscription;
