import { produce } from "immer";
import ACTIONS from "../actions/types.actions";
const session = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.SESSION_USER_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.SESSION_USER_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.GET_SESSION_ALL_USERS_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.GET_SESSION_ALL_USERS_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.GET_SESSION_USERBYID_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.SESSION_USER_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default session;
