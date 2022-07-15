import { produce } from "immer";
import ACTIONS from "../actions/types.actions";
const changePartner = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.CHANGE_PARTNER_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.CHANGE_PARTNER_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.CHANGE_PARTNER_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default changePartner;
