import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AppBayanatCategoryManagement from "../containers/BaitussalamWeb&AppBayanatCategoryManagement/BaitussalamWeb&AppBayanatCategoryManagement";
import { deleteAdminUsers, enableDisableAdmin, getBayanatCategory } from "../store/actions/baitussalamWeb&App.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBayanatCategory,
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

const AppBayanatCategoryManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppBayanatCategoryManagement),
);

export default AppBayanatCategoryManagementProvider;
