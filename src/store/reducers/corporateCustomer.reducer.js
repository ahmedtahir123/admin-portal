import { produce } from "immer";
import ACTIONS from "../actions/types.actions";

const corporateCustomer = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.CORPORATE_CLIENT_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.CORPORATE_CLIENT_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.CORPORATE_CLIENT_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.SELECTED_CORPORATE_CLIENT_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.CORPORATE_CLIENT_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default corporateCustomer;
