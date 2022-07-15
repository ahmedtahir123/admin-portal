import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AddEditBookContainer from "../containers/AddEditBook/AddEditBook";
import {
  addBook,
  deleteAllBooks,
  getBookById,
  getBooksList,
  updateBook,
  publishUnPublishBook,
  printCSV,
} from "../store/actions/book.actions";
import { getBrandList } from "../store/actions/brand.actions";
import { getCorporateClientNames } from "../store/actions/corporateCustomer.actions";
import { getSelectedDealsList } from "../store/actions/deals.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      printCSV,
      addBook,
      getBookById,
      updateBook,
      deleteAllBooks,
      getBrandList,
      getBooksList,
      getSelectedDealsList,
      getCorporateClientNames,
      publishUnPublishBook,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.book.loading,
  uploadLoader: state.ui.loading,
  book: state.book.selected,
  error: state.book.error,
  selectedDealsList: state.deals.selectedDealsList,
  bookLocationList: state.areaSegment.cities,
  // brands: state.brand.list,
  // deals: state.deals.list,
  // corporateCustomer: state.corporateCustomer.list,
});

const AddEditBookProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditBookContainer));

export default AddEditBookProvider;
