import { produce } from "immer";
import ACTIONS from "../actions/types.actions";
const musalliAttendanceBulk = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.MUSALLI_ATTENDANCE_BULK_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.MUSALLI_ATTENDANCE_BULK_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.MUSALLI_ATTENDANCE_BULK_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.SELECTED_MUSALLI_ATTENDANCE_BULK_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.MUSALLI_ATTENDANCE_BULK_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default musalliAttendanceBulk;
