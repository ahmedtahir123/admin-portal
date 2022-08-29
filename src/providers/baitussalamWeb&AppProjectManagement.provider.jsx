import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import BaitussalamWebAndAppProjectManagement from "../containers/BaitussalamWeb&AppProjectManagement/BaitussalamWeb&AppProjectManagement";
// import { deleteAdminUsers, enableDisableAdmin, getProjects } from "../store/actions/admin.actions";
import { deleteAdminUsers, enableDisableAdmin, getProjects } from "../store/actions/baitussalamWeb&App.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProjects,
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

const BaitussalamWebAndAppProjectManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BaitussalamWebAndAppProjectManagement),
);

export default BaitussalamWebAndAppProjectManagementProvider;
