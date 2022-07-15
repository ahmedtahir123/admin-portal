import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import MerchantProfileContainer from "../containers/MerchantProfile/MerchantProfile";
import { getUserById, updateMerchant } from "../store/actions/merchant.actions";
import { userSuccess } from "../store/actions/user.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateMerchant,
      getUserById,
      updateUserInStore: userSuccess,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  user: state.user.value,
  loading: state.merchant.loading,
  error: state.merchant.error,
  merchant: state.merchant.selected,
});

const MerchantProfileProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(MerchantProfileContainer));

export default MerchantProfileProvider;
