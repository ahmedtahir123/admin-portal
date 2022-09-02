import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import MusalliAttendanceChangeRequestManagment from "../containers/MusalliAttendanceChangeRequestManagment/MusalliAttendanceChangeRequestManagment";
import {
  // deleteAdminUsers,
  // enableDisableAdmin,
  getMusalliAttendanceChangeRequest,
} from "../store/actions/musalli_attendanceChangeRequest.action";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMusalliAttendanceChangeRequest,
      // deleteAdminUsers,
      // enableDisableAdmin,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.participant.loading,
  list: state.participant.list,
  error: state.participant.error,
  pagination: state.participant.value,
});

const MusalliAttendanceChangeRequestProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MusalliAttendanceChangeRequestManagment),
);

export default MusalliAttendanceChangeRequestProvider;
