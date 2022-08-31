import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AppDonationCategoryManagement from "../containers/BaitussalamWeb&AppDonationCategoryManagement/BaitussalamWeb&AppDonationCategoryManagement";
import { deleteAdminUsers, enableDisableAdmin, getDonationCategory } from "../store/actions/baitussalamWeb&App.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getDonationCategory,
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

const AppDonationCategoryManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppDonationCategoryManagement),
);

export default AppDonationCategoryManagementProvider;
