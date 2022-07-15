import { produce } from "immer";
import ACTIONS from "../actions/types.actions";

const campaign = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.CAMPAIGN_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.CAMPAIGN_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.CAMPAIGN_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.SELECTED_CAMPAIGN_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.CAMPAIGN_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default campaign;
