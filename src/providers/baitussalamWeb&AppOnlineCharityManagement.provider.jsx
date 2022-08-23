import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AppOnlineCharityManagement from "../containers/BaitussalamWeb&AppOnlineCharityManagement/BaitussalamWeb&AppOnlineCharityManagement";
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

const AppOnlineCharityManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppOnlineCharityManagement),
);

export default AppOnlineCharityManagementProvider;
