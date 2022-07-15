import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import ChangePartnerContainer from "../containers/ChangePartner/ChangePartner";
import { getUserTypes } from "../store/actions/changePartner.actions";
import { getDealCategoriesList } from "../store/actions/dealCategory.actions";
import { getBrandNamesList } from "../store/actions/brand.actions";
import { getPartnerList, partnerFilterListSuccess } from "../store/actions/partner.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserTypes,
      getDealCategoriesList,
      getBrandNamesList,
      getPartnerList,
      resetFilteredPartnerList: () => dispatch(partnerFilterListSuccess([])),
    },
    dispatch,
  );

const mapStateToProps = state => ({
  partnerLoading: state.partner.loading,
  brandLoading: state.brand.loading,
  categoryLoading: state.dealCategory.loading,
  filteredBrands: state.brand.filteredList,
  dealCategories: state.dealCategory.list,
  filteredPartners: state.partner.filteredList,
  partners: state.partner.list,
});

const ChangePartnerProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePartnerContainer));

export default ChangePartnerProvider;
