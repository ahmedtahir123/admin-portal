import { produce } from "immer";
import ACTIONS from "../actions/types.actions";

const profiler = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.PROFILER_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.PROFILER_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.PROFILER_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.SELECTED_PROFILER_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.PROFILER_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    case ACTIONS.SWIMLANE_SUCCESS:
      draft.loading = false;
      draft.swimlanes = action.response;
      return draft;
    default:
      return draft;
  }
});

export default profiler;
