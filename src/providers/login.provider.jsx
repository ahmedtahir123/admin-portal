import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LoginContainer from "../containers/Login/Login";
import { login } from "../store/actions/user.actions";

const mapDispatchToProps = dispatch => ({
  login: (user, history) => dispatch(login(user, history)),
});

const mapStateToProps = state => ({
  loading: state.user.loading,
  user: state.user.value,
  error: state.user.error,
});

const LoginProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));

export default LoginProvider;
