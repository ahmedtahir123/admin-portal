import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AddRemovePopularDeals from "../components/AddRemovePopularDeals";
import {
  getSelectedDealsList,
  getSelectedPopularDealsList,
  addSelectedPopularDeals,
  removeSelectedPopularDeals,
} from "../store/actions/deals.actions";

const mapDispatchToProps = dispatch => ({
  getSelectedPopularDealsList: (bookCode, query) => dispatch(getSelectedPopularDealsList(bookCode, query)),
  getSelectedDealsList: (bookCode, query) => dispatch(getSelectedDealsList(bookCode, query)),
  addSelectedPopularDeals: (bookCode, dealCodes) => dispatch(addSelectedPopularDeals(bookCode, dealCodes)),
  removeSelectedPopularDeals: (bookCode, dealCodes) => dispatch(removeSelectedPopularDeals(bookCode, dealCodes)),
});

const mapStateToProps = state => ({
  selectedDealsListLoading: state.deals.selectedDealsLoading,
  popularDealLoading: state.deals.popularDealLoading,
  selectedDeals: state.deals.selectedList,
  popularSelectedDeals: state.deals.popularDeals,
});

const AddRemovePopularDealProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddRemovePopularDeals));

export default AddRemovePopularDealProvider;
