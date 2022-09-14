import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import MusalliAttendanceDetailReportManagment from "../containers/MusalliAttendanceDetailReportManagment/MusalliAttendanceDetailReportManagment";
import SMSUtilityManagment from "../containers/SMSUtilityManagment/SMSUtilityManagment";
import { deleteAdminUsers, enableDisableAdmin, getAdminUsers } from "../store/actions/admin.actions";
import { getMusalliParticipant } from "../store/actions/musalli_participant.action";
import { getMusalliVolunteer } from "../store/actions/musalli_volunteer.action";
import { getMusalliParticipantsByMosqueAndSession } from "../store/actions/musalli_participantsByMosqueAndSession.action";
import { getMusalliVolunteerByMosqueAndSession } from "../store/actions/musalli_volunteerByMosqueAndSession.action";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAdminUsers,
      deleteAdminUsers,
      enableDisableAdmin,
      getMusalliParticipant,
      getMusalliVolunteer,
      getMusalliParticipantsByMosqueAndSession,
      getMusalliVolunteerByMosqueAndSession,
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
  participantOptionList: state.participant.list,
  volunteerOptionLoading: state.volunteer.loading,
  volunteerOptionList: state.volunteer.list,
  participantsByMosqueAndSessionOptionLoading: state.participantsByMosqueAndSession.loading,
  participantsByMosqueAndSessionOptionList: state.participantsByMosqueAndSession.list,
  volunteerByMosqueAndSessionOptionList: state.volunteerByMosqueAndSession.list,
});

const SMSUtilityProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(SMSUtilityManagment));

export default SMSUtilityProvider;
