import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import MusalliPaymentManagement from "../containers/MusalliPaymentManagement/MusalliPaymentManagement";
import {
  // deleteAdminUsers, enableDisableAdmin,
  getMusalliPayment,
} from "../store/actions/musalli_payment.action";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMusalliPayment,
      // deleteAdminUsers,
      // enableDisableAdmin,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.participant.loading,
  list: state.participant.list,
  error: state.participant.error,
  pagination: state.participant.value,

  activeSessionLoading: state.musalliGetAllActiveSession.loading,
  activeSessionList: state.musalliGetAllActiveSession.list,
});

const MusalliPaymentManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MusalliPaymentManagement),
);

export default MusalliPaymentManagementProvider;
