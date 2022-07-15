import { produce } from "immer";
import ACTIONS from "../actions/types.actions";

const campaignStatus = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.VOUCHER_REDEMPTION_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.VOUCHER_REDEMPTION_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.VOUCHER_REDEMPTION_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.SELECTED_VOUCHER_REDEMPTION_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.VOUCHER_REDEMPTION_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    case ACTIONS.VOUCHER_REDEMPTION_MODAL_SHOW:
      draft.isModalShow = action.response;
      return draft;
    default:
      return draft;
  }
});

export default campaignStatus;
