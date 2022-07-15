import { produce } from "immer";
import ACTIONS from "../actions/types.actions";

const dealCategory = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.DEAL_CATEGORY_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.DEAL_CATEGORY_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.DEAL_CATEGORY_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.SELECTED_DEAL_CATEGORY_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.DEAL_CATEGORY_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default dealCategory;
