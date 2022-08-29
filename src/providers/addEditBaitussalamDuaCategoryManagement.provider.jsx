import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AddEditAppDuaCategoryManagement from "../containers/AddEditBaitussalamWeb&AppDuaCategoryManagement/AddEditBaitussalamWeb&AppDuaCategoryManagement";
import { deleteAdminUsers, enableDisableAdmin, getDuasCategory } from "../store/actions/baitussalamWeb&App.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getDuasCategory,
      deleteAdminUsers,
      enableDisableAdmin,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.admin.loading,
  list: state.admin.value,
  error: state.admin.error,
  pagination: state.admin.value,
});

const AddEditAppDuaCategoryManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddEditAppDuaCategoryManagement),
);

export default AddEditAppDuaCategoryManagementProvider;
