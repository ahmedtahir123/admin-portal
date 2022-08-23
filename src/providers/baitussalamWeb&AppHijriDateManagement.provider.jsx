import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AppHijriDateManagement from "../containers/BaitussalamWeb&AppHijriDateManagement/BaitussalamWeb&AppHijriDateManagement";
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

const AppHijriDateManagementProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppHijriDateManagement));

export default AppHijriDateManagementProvider;
