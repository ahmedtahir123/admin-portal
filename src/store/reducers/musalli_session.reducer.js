import { produce } from "immer";
import ACTIONS from "../actions/types.actions";
const musalliSession = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.SESSION_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.SESSION_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.SESSION_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.SELECTED_SESSION_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.SESSION_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    case ACTIONS.RESET_SESSION_SELECTED_DATA:
      draft.loading = false;
      draft.selected = {};
      return draft;
    default:
      return draft;
  }
});

export default musalliSession;
