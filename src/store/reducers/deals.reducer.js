import { produce } from "immer";
import ACTIONS from "../actions/types.actions";

const deals = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.DEAL_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.DEAL_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.DEAL_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.DEAL_FILTER_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.filteredList = action.response;
      return draft;
    case ACTIONS.SELECTED_DEAL_REQUEST:
      draft.selectedDealsLoading = true;
      return draft;
    case ACTIONS.SELECTED_DEAL_ERROR:
      draft.selectedDealsLoading = false;
      draft.error = action.error;
      return draft;
    case ACTIONS.SELECTED_DEAL_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.SELECTED_DEAL_LIST_SUCCESS:
      draft.selectedDealsLoading = false;
      draft.error = null;
      draft.selectedList = action.response;
      return draft;
    case ACTIONS.DEAL_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    case ACTIONS.POPULAR_DEALS_REQUEST:
      draft.popularDealLoading = true;
      return draft;
    case ACTIONS.POPULAR_DEALS_ERROR:
      draft.popularDealLoading = false;
      draft.error = action.error;
      return draft;
    case ACTIONS.POPULAR_DEALS_LIST_SUCCESS:
      draft.popularDealLoading = false;
      draft.error = null;
      draft.popularDeals = action.response;
      return draft;
    default:
      return draft;
  }
});

export default deals;
