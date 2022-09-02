import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import MusalliSessionManagement from "../containers/MusalliSessionManagement/MusalliSessionManagement";
import {
  // deleteAdminUsers, enableDisableAdmin,
  getMusalliSession,
} from "../store/actions/musalli_session.action";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMusalliSession,
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

const MusalliSessionManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MusalliSessionManagement),
);

export default MusalliSessionManagementProvider;
