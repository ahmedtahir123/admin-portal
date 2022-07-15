import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SessionManagement from "../containers/SessionManagment/SessionManagment";
import { getAllSessionUsers, revokeAllSessionUsers } from "../store/actions/session.actions";

const mapDispatchToProps = dispatch => ({
  getAllSessionUsers: query => dispatch(getAllSessionUsers(query)),
  revokeAllSessionUsers: () => dispatch(revokeAllSessionUsers()),
});

const mapStateToProps = state => ({
  loading: state.session.loading,
  dataSource: state.session.list,
  session: state.session.value,
  error: state.session.error,
});

const SessionManagementProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionManagement));

export default SessionManagementProvider;
