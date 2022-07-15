import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getVoucherRedemptionsList,
  deleteAllVoucherRedemptions,
  enableDisableVoucherRedemption,
  addVoucherRedemption,
} from "../store/actions/voucherRedemption.actions";
import VoucherRedemptionManagementContainer from "../containers/VoucherRedemptionManagement";

const mapDispatchToProps = dispatch => ({
  getVoucherRedemptionsList: query => dispatch(getVoucherRedemptionsList(query)),
  deleteAllVoucherRedemptions: selectedRows => dispatch(deleteAllVoucherRedemptions(selectedRows)),
  enableDisableVoucherRedemption: (ids, enabled) => dispatch(enableDisableVoucherRedemption(ids, enabled)),
  addVoucherRedemption: history => dispatch(addVoucherRedemption(history)),
});

const mapStateToProps = state => ({
  loading: state.voucherRedemption.loading,
  list: state.voucherRedemption.list,
  deals: state.voucherRedemption.value,
  pagination: state.voucherRedemption.value,
  error: state.voucherRedemption.error,
});

const VoucherRedemptionManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VoucherRedemptionManagementContainer),
);

export default VoucherRedemptionManagementProvider;
