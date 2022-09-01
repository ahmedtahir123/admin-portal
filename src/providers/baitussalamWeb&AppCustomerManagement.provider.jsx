import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AppCustomerManagement from "../containers/BaitussalamWeb&AppCustomerManagement/BaitussalamWeb&AppCustomerManagement";
import { deleteAdminUsers, enableDisableAdmin, getCustomer } from "../store/actions/baitussalamWeb&App.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCustomer,
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

const AppCustomerManagementProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppCustomerManagement));

export default AppCustomerManagementProvider;
