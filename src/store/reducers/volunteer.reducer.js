import { produce } from "immer";
import ACTIONS from "../actions/types.actions";
const admin = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.VOLUNTEER_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.VOLUNTEER_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.VOLUNTEER_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.SELECTED_VOLUNTEER_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.VOLUNTEER_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default admin;
