import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import AddRemovePopularBrands from "../containers/AddRemovePopularBrands";
import {
  getSelectedBrandList,
  getBookBrandList,
  addSelectedBrand,
  removeSelectedBrand,
} from "../store/actions/brand.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBookBrandList,
      getSelectedBrandList,
      addSelectedBrand,
      removeSelectedBrand,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.brand.loading,
  bookLoading: state.brand.bookLoading,
  bookBrandsList: state.brand.bookBrandList,
  selectedBookBrandList: state.brand.selectedBookBrandList,
});

const AddRemovePopularBrandProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddRemovePopularBrands));

export default AddRemovePopularBrandProvider;
