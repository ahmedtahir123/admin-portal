import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import MusalliAttendanceDetailReportManagment from "../containers/MusalliAttendanceDetailReportManagment/MusalliAttendanceDetailReportManagment";
import {
  // deleteAdminUsers,
  // enableDisableAdmin,
  getAllActiveMosqueBySession,
  getAttendanceDetailReport,
} from "../store/actions/musalli_attendanceDetailReport.action";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllActiveMosqueBySession,
      getAttendanceDetailReport,
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
  mosqueOptionlist: state.activeMosqueBySession.mosqueOptionvalue,
});

const MusalliAttendanceDetailReportProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MusalliAttendanceDetailReportManagment),
);

export default MusalliAttendanceDetailReportProvider;
