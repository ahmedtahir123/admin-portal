import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import MainLayoutContainer from "../containers/MainLayout";
import { showModal } from "../store/actions/ui.actions";
import { getUserNotifications, logout, userSuccess, viewUserNotifications } from "../store/actions/user.actions";
import { getLocations, getState } from "../store/actions/areaSegment.actions";
import { musalliGetAllActiveSession } from "../store/actions/master.action";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserNotifications,
      viewUserNotifications,
      showModal,
      logout,
      updateUserInStore: userSuccess,
      getCities: getLocations,
      getStates: getState,
      musalliGetAllActiveSession,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.user.loading,
  user: state.user.value,
  capabilities: state.user.capabilities,
  notificationsData: state.user.notificationsData,
  error: state.user.error,
  isModalOpen: state.ui.isModalOpen,

  activeSessionLoading: state.musalliGetAllActiveSession.loading,
  activeSessionList: state.musalliGetAllActiveSession.list,
});

const MainLayoutProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(MainLayoutContainer));

export default MainLayoutProvider;
