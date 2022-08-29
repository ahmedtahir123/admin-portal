import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AppFeaturedVideosManagement from "../containers/BaitussalamWeb&AppFeaturedVideosManagement/BaitussalamWeb&AppFeaturedVideosManagement";
// import { deleteAdminUsers, enableDisableAdmin, getFeaturedVideos } from "../store/actions/admin.actions";
import { deleteAdminUsers, enableDisableAdmin, getFeaturedVideos } from "../store/actions/baitussalamWeb&App.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFeaturedVideos,
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

const AppFeaturedVideosManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppFeaturedVideosManagement),
);

export default AppFeaturedVideosManagementProvider;
