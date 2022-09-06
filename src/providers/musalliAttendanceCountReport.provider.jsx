import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import MusalliAttendanceChangeRequestManagment from "../containers/MusalliAttendanceChangeRequestManagment/MusalliAttendanceChangeRequestManagment";
import MusalliAttendanceCountReportManagment from "../containers/MusalliAttendanceCountReport/MusalliAttendanceCountReportManagment";
import {
  // deleteAdminUsers,
  // enableDisableAdmin,
  getMusalliAttendanceCountReport,
} from "../store/actions/musalli_AttendanceCountReport.action";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMusalliAttendanceCountReport,
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
});

const MusalliAttendanceCountReportProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MusalliAttendanceCountReportManagment),
);

export default MusalliAttendanceCountReportProvider;
