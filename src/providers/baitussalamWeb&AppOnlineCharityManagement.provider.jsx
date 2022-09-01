import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AppOnlineCharityManagement from "../containers/BaitussalamWeb&AppOnlineCharityManagement/BaitussalamWeb&AppOnlineCharityManagement";
import { deleteAdminUsers, enableDisableAdmin, getOnlineCharity } from "../store/actions/baitussalamWeb&App.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOnlineCharity,
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

const AppOnlineCharityManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppOnlineCharityManagement),
);

export default AppOnlineCharityManagementProvider;
