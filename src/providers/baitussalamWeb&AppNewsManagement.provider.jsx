import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AppNewsManagement from "../containers/BaitussalamWeb&AppNewsManagement/BaitussalamWeb&AppNewsManagement";
import { deleteAdminUsers, enableDisableAdmin, getAllNews } from "../store/actions/baitussalamWeb&App.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllNews,
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

const AppNewsManagementProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppNewsManagement));

export default AppNewsManagementProvider;
