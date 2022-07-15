// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
// import {
//   getUserCapabilities,
//   getUserNotifications,
//   viewUserNotifications,
//   logout,
// } from "../store/actions/user.actions";
// import { showModal } from "../store/actions/ui.actions";
// import PrivateRouteContainer from "../containers/PrivateRoute/PrivateRoute";

// const mapDispatchToProps = dispatch => ({
//   getUserCapabilities: (user, history) => dispatch(getUserCapabilities(user, history)),
//   getUserNotifications: (user, history) => dispatch(getUserNotifications(user, history)),
//   viewUserNotifications: (user, history) => dispatch(viewUserNotifications(user, history)),
//   showModal: (bool, history) => dispatch(showModal(bool, history)),
//   logout: history => dispatch(logout(history)),
// });

// const mapStateToProps = state => ({
//   loading: state.user.loading,
//   userData: state.user.value,
//   capabilities: state.user.capabilities,
//   notificationsData: state.user.notificationsData,
//   error: state.user.error,
//   isModalOpen: state.ui.isModalOpen,
// });

// const PrivateRouteProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRouteContainer));

// export default PrivateRouteProvider;
