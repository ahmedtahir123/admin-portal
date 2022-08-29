import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AppDuasManagement from "../containers/BaitussalamWeb&AppDuasManagement/BaitussalamWeb&AppDuasManagement";
import { deleteAdminUsers, enableDisableAdmin, getDuas } from "../store/actions/baitussalamWeb&App.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getDuas,
      deleteAdminUsers,
      enableDisableAdmin,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.admin.loading,
  list: state.admin.value,
  error: state.admin.error,
  pagination: state.admin.list,
});

const AppDuasManagementProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppDuasManagement));

export default AppDuasManagementProvider;
