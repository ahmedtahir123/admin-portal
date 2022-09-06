import { produce } from "immer";
import ACTIONS from "../actions/types.actions";
const activeMosqueBySession = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.ACTIVE_MOSQUE_BY_SESSION_REQUEST:
      draft.mosqueOptionLoading = true;
      return draft;
    case ACTIONS.ACTIVE_MOSQUE_BY_SESSION_SECCESS:
      draft.mosqueOptionLoading = false;
      draft.mosqueOptionerror = null;
      draft.mosqueOptionvalue = action.response;
      return draft;
    case ACTIONS.ACTIVE_MOSQUE_BY_SESSION_LIST_SUCCESS:
      draft.mosqueOptionLoading = false;
      draft.mosqueOptionerror = null;
      draft.mosqueOptionlist = action.response;
      return draft;
    case ACTIONS.SELECTED_ACTIVE_MOSQUE_BY_SESSION_SUCCESS:
      draft.mosqueOptionLoading = false;
      draft.mosqueOptionerror = null;
      draft.mosqueOptionselected = action.response;
      return draft;
    case ACTIONS.ACTIVE_MOSQUE_BY_SESSION_ERROR:
      draft.mosqueOptionLoading = false;
      draft.mosqueOptionerror = action.error;
      return draft;
    default:
      return draft;
  }
});

export default activeMosqueBySession;
