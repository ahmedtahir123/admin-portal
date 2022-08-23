import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AppDuasManagement from "../containers/BaitussalamWeb&AppDuasManagement/BaitussalamWeb&AppDuasManagement";
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

const AppDuasManagementProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppDuasManagement));

export default AppDuasManagementProvider;
