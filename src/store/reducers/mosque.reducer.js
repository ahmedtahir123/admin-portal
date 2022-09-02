import { produce } from "immer";
import ACTIONS from "../actions/types.actions";
const mosque = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.MOSQUE_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.MOSQUE_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.MOSQUE_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.SELECTED_MOSQUE_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.MOSQUE_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default mosque;
