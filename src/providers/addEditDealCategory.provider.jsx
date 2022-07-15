import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getDealCategoryById,
  updateDealCategory,
  addDealCategory,
  deleteDealCategories,
} from "../store/actions/dealCategory.actions";
import AddEditDealCategoryContainer from "../containers/AddEditDealCategory";

const mapDispatchToProps = dispatch => ({
  addDealCategory: (category, getProgress) => dispatch(addDealCategory(category, getProgress)),
  getDealCategoryById: id => dispatch(getDealCategoryById(id)),
  updateDealCategory: (id, dealCategory, getProgress) => dispatch(updateDealCategory(id, dealCategory, getProgress)),
  deleteDealsCategory: id => dispatch(deleteDealCategories(id)),
});

const mapStateToProps = state => ({
  loading: state.dealCategory.loading,
  dealCategoryData: state.dealCategory.selected,
  error: state.dealCategory.error,
  uploadLoader: state.ui.loading,
});

const AddEditDealCategoryProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddEditDealCategoryContainer),
);

export default AddEditDealCategoryProvider;
