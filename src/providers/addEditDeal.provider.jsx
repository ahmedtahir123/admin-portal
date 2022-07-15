import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addDeal, getDealById, updateDeal, deleteAllDeals } from "../store/actions/deals.actions";
import AddEditDealContainer from "../containers/AddEditDeal";
import { getDealCategoriesList } from "../store/actions/dealCategory.actions";
import { getPartnerList } from "../store/actions/partner.actions";
import { getBrandNamesList } from "../store/actions/brand.actions";

const mapDispatchToProps = dispatch => ({
  addDeal: (deal, getProgress) => dispatch(addDeal(deal, getProgress)),
  getDealById: id => dispatch(getDealById(id)),
  updateDeal: (id, dealInfo, getProgress) => dispatch(updateDeal(id, dealInfo, getProgress)),
  getDealCategoriesList: pageInfo => dispatch(getDealCategoriesList(pageInfo)),
  getBrandNamesList: pageInfo => dispatch(getBrandNamesList(pageInfo)),
  deleteAllDeals: id => dispatch(deleteAllDeals(id)),
  getPartnerList: pageInfo => dispatch(getPartnerList(pageInfo)),
});

const mapStateToProps = state => ({
  loading: state.deals.loading,
  deal: state.deals.selected,
  error: state.deals.error,
  categories: state.dealCategory.list,
  partners: state.partner.list,
  filteredBrands: state.brand.filteredList,
  brandLoader: state.brand.loading,
  uploadLoader: state.ui.loading,
});

const AddEditDealProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditDealContainer));

export default AddEditDealProvider;
