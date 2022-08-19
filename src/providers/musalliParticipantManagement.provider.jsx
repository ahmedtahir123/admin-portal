import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import MusalliParticipantManagement from "../containers/MusalliParticipantManagement/MusalliParticipantManagement";
import { deleteAdminUsers, enableDisableAdmin, getAdminUsers } from "../store/actions/admin.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAdminUsers,
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

const MusalliParticipantManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MusalliParticipantManagement),
);

export default MusalliParticipantManagementProvider;
