import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import MusalliVolunteerManagement from "../containers/MusalliVolunteerManagement/MusalliVolunteerManagement";
import {
  // deleteAdminUsers, enableDisableAdmin,
  getMusalliVolunteer,
} from "../store/actions/musalli_volunteer.action";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMusalliVolunteer,
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

const MusalliVolunteerManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MusalliVolunteerManagement),
);

export default MusalliVolunteerManagementProvider;
