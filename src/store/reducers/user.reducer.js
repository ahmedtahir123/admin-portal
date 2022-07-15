import { produce } from "immer";
import ACTIONS from "../actions/types.actions";
const user = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.USER_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.USER_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.GET_USER_CAPABILITIES_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.capabilities = action.response;
      return draft;
    case ACTIONS.GET_USER_NOTIFICATIONS_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.notificationsData = action.response;
      return draft;
    case ACTIONS.GET_ALL_USERS_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.GET_USERBYID_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.USER_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default user;
