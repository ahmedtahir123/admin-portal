import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
// import MusalliAttendanceChangeRequestManagment from "../containers/MusalliAttendanceChangeRequestManagment/MusalliAttendanceChangeRequestManagment";
import MusalliAttendanceBulkManagment from "../containers/MusalliAttendanceBulk/MusalliAttendanceBulkManagment";
import {
  // deleteAdminUsers,
  // enableDisableAdmin,
  getMusalliAttendanceBulk,
  postMusalliAttendanceBulk,
} from "../store/actions/musalli_AttendanceBulk.action";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMusalliAttendanceBulk,
      postMusalliAttendanceBulk,
      // deleteAdminUsers,
      // enableDisableAdmin,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.participant.loading,
  list: state.participant.value,
  error: state.participant.error,
  pagination: state.participant.value,

  mosqueOptionLoading: state.activeMosqueBySession.mosqueOptionLoading,
  // mosqueOptionvalue: state.activeMosqueBySession.value,
  mosqueOptionlist: state.activeMosqueBySession.mosqueOptionvalue,
  attendanceBulkPostLoading: state.musalliAttendanceBulk.loading,

  // activeSessionLoading: state.musalliGetAllActiveSession.loading,
  // activeSessionList: state.musalliGetAllActiveSession.list,
});

const MusalliAttendanceBulkProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MusalliAttendanceBulkManagment),
);

export default MusalliAttendanceBulkProvider;
