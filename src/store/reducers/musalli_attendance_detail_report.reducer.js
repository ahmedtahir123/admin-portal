import { produce } from "immer";
import ACTIONS from "../actions/types.actions";
const musalliAttendanceDetailReport = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.MUSALLI_ATTENDANCE_DETAIL_REPORT_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.MUSALLI_ATTENDANCE_DETAIL_REPORT_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.MUSALLI_ATTENDANCE_DETAIL_REPORT_LIST_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.list = action.response;
      return draft;
    case ACTIONS.SELECTED_MUSALLI_ATTENDANCE_DETAIL_REPORT_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.selected = action.response;
      return draft;
    case ACTIONS.MUSALLI_ATTENDANCE_DETAIL_REPORT_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default musalliAttendanceDetailReport;
