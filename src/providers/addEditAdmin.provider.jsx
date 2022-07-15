import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  addAdminUser,
  getUserById,
  updateUser,
  deleteAdminUser,
  enableDisableAdmin,
} from "../store/actions/admin.actions";
import AddEditAdminContainer from "../containers/AddEditAdmin/AddEditAdmin";

const mapDispatchToProps = dispatch => ({
  addAdminUser: (userInfo, params) => dispatch(addAdminUser(userInfo, params)),
  getUserById: id => dispatch(getUserById(id)),
  updateUser: (id, userInfo, params) => dispatch(updateUser(id, userInfo, params)),
  deleteAdminUser: id => dispatch(deleteAdminUser(id)),
  enableDisableAdmin: (id, enabled) => dispatch(enableDisableAdmin(id, enabled)),
});

const mapStateToProps = state => ({
  loading: state.admin.loading,
  selected: state.admin.selected,
  error: state.admin.error,
});

const AddEditAdminProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditAdminContainer));

export default AddEditAdminProvider;
