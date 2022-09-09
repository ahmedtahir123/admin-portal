import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import MusalliAttendanceDetailReportManagment from "../containers/MusalliAttendanceDetailReportManagment/MusalliAttendanceDetailReportManagment";
import SMSUtilityManagment from "../containers/SMSUtilityManagment/SMSUtilityManagment";
import { deleteAdminUsers, enableDisableAdmin, getAdminUsers } from "../store/actions/admin.actions";
import { getAllActiveMosqueBySession } from "../store/actions/musalli_attendanceDetailReport.action";
import { getMusalliParticipant } from "../store/actions/musalli_participant.action";
import { getMusalliVolunteer } from "../store/actions/musalli_volunteer.action";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAdminUsers,
      deleteAdminUsers,
      enableDisableAdmin,
      getAllActiveMosqueBySession,
      getMusalliParticipant,
      getMusalliVolunteer,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.admin.loading,
  list: state.admin.list,
  error: state.admin.error,
  pagination: state.admin.value,
  mosqueOptionLoading: state.activeMosqueBySession.mosqueOptionLoading,
  mosqueOptionlist: state.activeMosqueBySession.mosqueOptionvalue,
  participantOptionLoading: state.participant.loading,
  participantOptionList: state.participant.value,
  volunteerOptionLoading: state.participant.loading,
  volunteerOptionList: state.participant.value,
});

const SMSUtilityProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(SMSUtilityManagment));

export default SMSUtilityProvider;
