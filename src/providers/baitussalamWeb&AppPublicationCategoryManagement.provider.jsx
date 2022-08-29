import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AppPublicationCategoryManagement from "../containers/BaitussalamWeb&AppPublicationCategoryManagement/BaitussalamWeb&AppPublicationCategoryManagement";
import {
  deleteAdminUsers,
  enableDisableAdmin,
  getPublicationCategory,
} from "../store/actions/baitussalamWeb&App.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPublicationCategory,
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

const AppPublicationCategoryManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppPublicationCategoryManagement),
);

export default AppPublicationCategoryManagementProvider;
