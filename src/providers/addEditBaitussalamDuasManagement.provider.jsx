import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AddEditAppDuasManagement from "../containers/AddEditBaitussalamWeb&AppDuasManagement/AddEditBaitussalamWeb&AppDuasManagement";
import { deleteAdminUsers, enableDisableAdmin, getAdminUsers } from "../store/actions/admin.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAdminUsers,
      deleteAdminUsers,
      enableDisableAdmin,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.admin.loading,
  list: state.admin.list,
  error: state.admin.error,
  pagination: state.admin.value,
});

const AddEditAppDuasManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddEditAppDuasManagement),
);

export default AddEditAppDuasManagementProvider;
