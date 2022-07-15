import { produce } from "immer";
import ACTIONS from "../actions/types.actions";

const billingPlan = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.BILLING_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.BILLING_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.BILLING_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.BILLING_FILTER_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.filteredList = action.response;
      return draft;
    case ACTIONS.SELECTED_BILLING_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.BILLING_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    case ACTIONS.LOCATIONS_SUCCESS:
      draft.locations = action.response;
      return draft;
    default:
      return draft;
  }
});

export default billingPlan;
