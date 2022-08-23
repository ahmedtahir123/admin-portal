import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AppGuidesManagement from "../containers/BaitussalamWeb&AppGuidesManagement/BaitussalamWeb&AppGuidesManagement";
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

const AppGuidesManagementProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppGuidesManagement));

export default AppGuidesManagementProvider;
