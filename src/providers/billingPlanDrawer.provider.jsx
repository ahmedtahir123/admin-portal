import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import BillingPlanDrawerContainer from "../components/BillingPlanDrawer/BillingPlanDrawer";
import {
  getOutletBillingList,
  cloneBillingPlan,
  resumeBillingPlan,
  suspendBillingPlan,
  retireBillingPlan,
  updateBillingPlan,
  print,
  getBillingPlanById,
} from "../store/actions/outletBilling.action";
import { getPartnerList } from "../store/actions/partner.actions";
import { getBrandList } from "../store/actions/brand.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOutletBillingList,
      cloneBillingPlan,
      getPartnerList,
      getBrandList,
      resumeBillingPlan,
      suspendBillingPlan,
      retireBillingPlan,
      updateBillingPlan,
      print,
      getBillingPlanById,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.billingPlan.loading,
  brandsLoader: state.brand.loading,
  partnerLoader: state.partner.loading,
  brands: state.brand.list,
  partners: state.partner.list,
  billingPlan: state.billingPlan.selected,
});

const BillingPlanDrawerProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(BillingPlanDrawerContainer));

export default BillingPlanDrawerProvider;
