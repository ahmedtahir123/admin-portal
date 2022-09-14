import { produce } from "immer";
import ACTIONS from "../actions/types.actions";
const musalliParticipantsByMosqueAndSession = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.PARTICIPANT_BY_MOSQUE_AND_SESSION_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.PARTICIPANT_BY_MOSQUE_AND_SESSION_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.PARTICIPANT_BY_MOSQUE_AND_SESSION_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.SELECTED_PARTICIPANT_BY_MOSQUE_AND_SESSION_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.PARTICIPANT_BY_MOSQUE_AND_SESSION_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default musalliParticipantsByMosqueAndSession;
