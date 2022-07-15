import { produce } from "immer";
import ACTIONS from "../actions/types.actions";

const campaignStatus = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.CAMPAIGN_STATUS_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.CAMPAIGN_STATUS_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.CAMPAIGN_STATUS_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.SELECTED_CAMPAIGN_STATUS_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.CAMPAIGN_STATUS_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default campaignStatus;
