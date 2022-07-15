import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import CopyPlanDrawerContainer from "../components/CopyPlanDrawer/CopyPlanDrawer";
import { getOutletBillingList, cloneBillingPlan, getLocations } from "../store/actions/outletBilling.action";
import { getPartnerList } from "../store/actions/partner.actions";
import { getBrandList } from "../store/actions/brand.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getOutletBillingList,
      cloneBillingPlan,
      getLocations,
      getPartnerList,
      getBrandList,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.billingPlan.loading,
  brandsLoader: state.brand.loading,
  partnerLoader: state.partner.loading,
  dataSource: state.billingPlan.list,
  brands: state.brand.list,
  locations: state.billingPlan.locations,
  partners: state.partner.list,
});

const CopyPlanDrawerProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(CopyPlanDrawerContainer));

export default CopyPlanDrawerProvider;
