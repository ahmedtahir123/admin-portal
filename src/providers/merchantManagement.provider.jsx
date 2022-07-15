import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import MerchantManagement from "../containers/MerchantManagement/MerchantManagement";
import { deleteAllUsers, enableDisableMerchant, getAllMerchantUsers } from "../store/actions/merchant.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllMerchantUsers,
      deleteAllUsers,
      enableDisableMerchant,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.merchant.loading,
  list: state.merchant.list,
  pagination: state.merchant.value,
  error: state.merchant.error,
});

const MerchantManagementProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(MerchantManagement));

export default MerchantManagementProvider;
