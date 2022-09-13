import { produce } from "immer";
import ACTIONS from "../actions/types.actions";
const musalliGetAllActiveSession = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.ACTIVE_SESSION_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.ACTIVE_SESSION_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.ACTIVE_SESSION_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.SELECTED_ACTIVE_SESSION_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.ACTIVE_SESSION_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default musalliGetAllActiveSession;
