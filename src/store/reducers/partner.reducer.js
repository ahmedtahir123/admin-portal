import { produce } from "immer";
import ACTIONS from "../actions/types.actions";

const partner = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.PARTNER_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.PARTNER_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.PARTNER_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.PARTNER_FILTER_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.filteredList = action.response;
      return draft;
    case ACTIONS.SELECTED_PARTNER_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.PARTNER_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default partner;
