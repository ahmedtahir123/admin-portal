import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addBrand, getBrandById, updateBrand, deleteBrand } from "../store/actions/brand.actions";
import { getDealCategoriesList } from "../store/actions/dealCategory.actions";
import AddEditBrandContainer from "../containers/AddEditBrand/AddEditBrand";

const mapDispatchToProps = dispatch => ({
  addBrand: (brand, getProgress) => dispatch(addBrand(brand, getProgress)),
  getBrandById: id => dispatch(getBrandById(id)),
  updateBrand: (id, brandInfo, getProgress) => dispatch(updateBrand(id, brandInfo, getProgress)),
  getDealCategoriesList: query => dispatch(getDealCategoriesList(query)),
  deleteBrand: id => dispatch(deleteBrand(id)),
});

const mapStateToProps = state => ({
  loading: state.brand.loading,
  brand: state.brand.selected,
  categoryList: state.dealCategory.list,
  categoryLoader: state.dealCategory.loading,
  error: state.brand.error,
  uploadLoader: state.ui.loading,
});

const AddEditBrandProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditBrandContainer));

export default AddEditBrandProvider;
