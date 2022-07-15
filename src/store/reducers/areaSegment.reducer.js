import { produce } from "immer";
import ACTIONS from "../actions/types.actions";

const areaSegment = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.AREA_SEGMENT_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.AREA_STATE_SUCCESS:
      draft.loading = false;
      draft.state = action.response;
      return draft;
    case ACTIONS.AREA_SEGMENT_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.LOCATIONS_SUCCESS:
      draft.loading = false;
      draft.cities = action.response;
      return draft;
    case ACTIONS.AREA_SEGMENT_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.SELECTED_AREA_SEGMENT_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.AREA_SEGMENT_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default areaSegment;
