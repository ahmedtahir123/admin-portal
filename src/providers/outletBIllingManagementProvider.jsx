import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import OutletBillingManagement from "../containers/OutletBillingManagment/OutletBillingManagment";
import {
  getOutletBillingList,
  addOutletBilling,
  print,
  getLocations,
  getBillingPlanById,
  resumeBillingPlan,
  suspendBillingPlan,
  retireBillingPlan,
  cloneBillingPlan,
  updateBillingPlan,
} from "../store/actions/outletBilling.action";
import { getPartnerList } from "../store/actions/partner.actions";
import { getBrandList } from "../store/actions/brand.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPartnerList,
      getBrandList,
      getOutletBillingList,
      print,
      getLocations,
      getBillingPlanById,
      resumeBillingPlan,
      suspendBillingPlan,
      retireBillingPlan,
      addOutletBilling,
      cloneBillingPlan,
      updateBillingPlan,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.billingPlan.loading,
  brandsLoader: state.brand.loading,
  partnerLoader: state.partner.loading,
  dataSource: state.billingPlan.list,
  billingPlan: state.billingPlan.selected,
  pagination: state.billingPlan.value,
  error: state.partner.error,
  brands: state.brand.list,
  locations: state.billingPlan.locations,
  partners: state.partner.list,
});

const OutletBillingManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutletBillingManagement),
);

export default OutletBillingManagementProvider;
