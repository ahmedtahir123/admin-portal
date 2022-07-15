import { produce } from "immer";
import ACTIONS from "../actions/types.actions";
const admin = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.ADMIN_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.ADMIN_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.ADMIN_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.SELECTED_ADMIN_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.ADMIN_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default admin;
