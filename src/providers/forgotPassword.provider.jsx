import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { login } from "../store/actions/user.actions";
import ForgotPasswordContainer from "../containers/ForgotPassword";

const mapDispatchToProps = dispatch => ({
  forgotPassword: (user, history) => dispatch(login(user, history)),
});

const mapStateToProps = state => ({
  loading: state.user.loading,
  user: state.userData,
  error: state.user.error,
});

const ForgotPasswordProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer));

export default ForgotPasswordProvider;
