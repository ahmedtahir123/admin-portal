import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getVoucherRedemptionById,
  addVoucherRedemption,
  updateTicketWithAuthCode,
  updateTicketWithQRCode,
  voucherRedemptionModalChange,
} from "../store/actions/voucherRedemption.actions";
import AddEditVoucherRedemption from "../containers/AddEditVoucherRedemption/AddEditVoucherRedemption";

const mapDispatchToProps = dispatch => ({
  addVoucherRedemption: param => dispatch(addVoucherRedemption(param)),
  getVoucherRedemptionById: id => dispatch(getVoucherRedemptionById(id)),
  redeemWithCode: redemptionData => dispatch(updateTicketWithAuthCode(redemptionData)),
  redeemWithQR: redemptionData => dispatch(updateTicketWithQRCode(redemptionData)),
  voucherRedemptionModalChange: param => dispatch(voucherRedemptionModalChange(param)),
});

const mapStateToProps = state => ({
  loading: state.voucherRedemption.loading,
  voucherRedemption: state.voucherRedemption.selected,
  error: state.voucherRedemption.error,
  isModalShow: state.voucherRedemption.isModalShow,
});

const AddEditVoucherRedemptionProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddEditVoucherRedemption),
);

export default AddEditVoucherRedemptionProvider;
