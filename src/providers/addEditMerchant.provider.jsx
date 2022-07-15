import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AddEditMerchantContainer from "../containers/AddEditMerchant/AddEditMerchant";
import {
  addMerchantUser,
  deleteMerchant,
  getUserById,
  selectedMerchantSuccess,
  updateMerchant,
  changeMerchantRole,
  verifyMerchant,
} from "../store/actions/merchant.actions";

import { selectedPartnerSuccess } from "../store/actions/partner.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateMerchant,
      getUserById,
      addMerchantUser,
      deleteMerchant,
      clearMerchant: selectedMerchantSuccess,
      changeRole: changeMerchantRole,
      verifyMerchant,
      clearPartner: selectedPartnerSuccess,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.merchant.loading,
  error: state.merchant.error,
  merchant: state.merchant.selected,
  partner: state.partner.selected,
  partnerLoading: state.partner.loading,
});

const AddEditMerchantUserProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditMerchantContainer));

export default AddEditMerchantUserProvider;
