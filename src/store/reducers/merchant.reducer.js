import { produce } from "immer";
import ACTIONS from "../actions/types.actions";
const merchant = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.MERCHANT_USER_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.MERCHANT_USER_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.GET_MERCHANT_ALL_USERS_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.GET_MERCHANT_ALL_USERS_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.GET_MERCHANT_USERBYID_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.SELECTED_MERCHANT_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.MERCHANT_USER_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default merchant;
