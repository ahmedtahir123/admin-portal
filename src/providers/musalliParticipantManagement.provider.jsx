import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import MusalliParticipantManagement from "../containers/MusalliParticipantManagement/MusalliParticipantManagement";
// import { deleteAdminUsers, enableDisableAdmin, getMusalliParticipant } from "../store/actions/admin.actions";
import {
  // deleteAdminUsers,
  // enableDisableAdmin,
  getMusalliParticipant,
} from "../store/actions/musalli_participant.action";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMusalliParticipant,
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

  mosqueOptionLoading: state.activeMosqueBySession.mosqueOptionLoading,
  mosqueOptionlist: state.activeMosqueBySession.mosqueOptionlist,
  activeSessionList: state.musalliGetAllActiveSession.list,
});

const MusalliParticipantManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MusalliParticipantManagement),
);

export default MusalliParticipantManagementProvider;
