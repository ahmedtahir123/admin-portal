import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import MusalliAttendanceChangeRequestManagment from "../containers/MusalliAttendanceChangeRequestManagment/MusalliAttendanceChangeRequestManagment";
import MusalliAttendanceBulkManagment from "../containers/MusalliAttendanceBulk/MusalliAttendanceBulkManagment";
import {
  // deleteAdminUsers,
  // enableDisableAdmin,
  getMusalliAttendanceBulk,
} from "../store/actions/musalli_AttendanceBulk.actions";
import { getAllActiveMosqueBySession } from "../store/actions/musalli_attendanceDetailReport.action";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMusalliAttendanceBulk,
      getAllActiveMosqueBySession,
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
});

const MusalliAttendanceBulkProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MusalliAttendanceBulkManagment),
);

export default MusalliAttendanceBulkProvider;
