import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addNewUser } from "../store/actions/user.actions";
import DashboardContainer from "../containers/Dashboard/Dashboard";

const mapDispatchToProps = dispatch => ({
  addNewUser: user => dispatch(addNewUser(user)),
});

const mapStateToProps = state => ({
  loading: state.user.loading,
  user: state.user.value,
  error: state.user.error,
});

const DashboardProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardContainer));

export default DashboardProvider;
