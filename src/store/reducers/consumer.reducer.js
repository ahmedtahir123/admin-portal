import { produce } from "immer";
import ACTIONS from "../actions/types.actions";
const consumer = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.CONSUMER_REQUEST:
      draft.loading = true;
      draft.error = null;
      return draft;
    case ACTIONS.CONSUMER_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.GET_CONSUMER_BY_ID_SUCCESS:
      draft.loading = false;
      draft.selected = action.response;
      return draft;
    case ACTIONS.GET_CONSUMER_ALL_USERS_SUCCESS:
      draft.loading = false;
      draft.value = action.response;
      draft.list = action.response.content;
      return draft;
    case ACTIONS.CONSUMER_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default consumer;
