import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AppAdminUserManagement from "../containers/BaitussalamWeb&AppAdminUserManagement/BaitussalamWeb&AppAdminUserManagement";
import {
  deleteAdminUsers,
  enableDisableAdmin,
  getBaitussalamAdminUser,
} from "../store/actions/baitussalamWeb&App.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBaitussalamAdminUser,
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

const BaitussalamWebAndAppAdminUserManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppAdminUserManagement),
);

export default BaitussalamWebAndAppAdminUserManagementProvider;
