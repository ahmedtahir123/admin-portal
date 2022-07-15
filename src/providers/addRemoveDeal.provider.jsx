import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

import {
  getDealsList,
  dealFilterListSuccess,
  getSelectedDealsList,
  removeSelectedDeal,
  addSelectedDeal,
} from "../store/actions/deals.actions";
import AddRemoveDealContainer from "../containers/AddRemoveDeal/AddRemoveDeal";
import { getBrandList, getBrandNamesList } from "../store/actions/brand.actions";
import { getDealCategoriesList } from "../store/actions/dealCategory.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      resetFilteredDealList: () => dispatch(dealFilterListSuccess([])),
      getDealsList,
      getBrandList,
      getBrandNamesList,
      getDealCategoriesList,
      getSelectedDealsList,
      removeSelectedDeal,
      addSelectedDeal,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.deals.loading,
  selectedDealsListLoading: state.deals.selectedDealsLoading,
  brandsLoader: state.brand.loading,
  filteredBrands: state.brand.filteredList,
  filteredDeals: state.deals.filteredList,
  selectedDealsList: state.deals.selectedList,
  categories: state.dealCategory.list,
  error: state.deals.error,
});

const AddRemoveDealProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddRemoveDealContainer));

export default AddRemoveDealProvider;
