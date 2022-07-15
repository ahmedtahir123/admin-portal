import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addNewUser } from "../store/actions/user.actions";
import ProfileContainer from "../containers/Profile/Profile";

const mapDispatchToProps = dispatch => ({
  addNewUser: user => dispatch(addNewUser(user)),
});

const mapStateToProps = state => ({
  loading: state.user.loading,
  user: state.user.value,
  error: state.user.error,
  list: state.user.content,
});

// loading: state.deals.loading,
// list: state.deals.list,
// deals: state.deals.value,
// error: state.deals.error,
const ProfileProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileContainer));

export default ProfileProvider;
