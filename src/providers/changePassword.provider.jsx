import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { changePassword } from "../store/actions/user.actions";
import ChangePasswordContainer from "../containers/ChangePassword";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePassword,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.user.loading,
  user: state.user.value,
  error: state.user.error,
});

const ChangePasswordProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePasswordContainer));

export default ChangePasswordProvider;
