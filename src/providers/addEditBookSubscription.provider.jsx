import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AddEditBookSubscription from "../containers/AddEditBookSubscription/AddEditBookSubscription";
import {
  addBookSubscription,
  getBookSubscriptionById,
  updateBookSubscription,
  deleteBookSubscriptions,
  print,
  regenerateCode,
  printCSV,
} from "../store/actions/bookSubscription.actions";
import { getCorporateClientNames } from "../store/actions/corporateCustomer.actions";
import { getBooksByLocation, resetBooks } from "../store/actions/book.actions";

const mapDispatchToProps = dispatch => ({
  getBookSubscription: subscriptionId => dispatch(getBookSubscriptionById(subscriptionId)),
  addBookSubscription: info => dispatch(addBookSubscription(info)),
  updateBookSubscription: info => dispatch(updateBookSubscription(info)),
  deleteBookSubscription: (ids, query) => dispatch(deleteBookSubscriptions(ids, query)),
  getCustomers: () => dispatch(getCorporateClientNames()),
  getBooks: location => dispatch(getBooksByLocation(location)),
  resetBooks: () => dispatch(resetBooks()),
  print: id => dispatch(print(id)),
  regenerateCode: id => dispatch(regenerateCode(id)),
  printCSV: id => dispatch(printCSV(id)),
});

const mapStateToProps = state => ({
  loading: state.bookSubscription.loading,
  bookSubscription: state.bookSubscription.selected,
  books: state.book.list,
  customers: state.corporateCustomer.list,
  location: state.areaSegment.cities,
  error: state.bookSubscription.error,
});

const AddEditBookSubscriptionProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddEditBookSubscription),
);

export default AddEditBookSubscriptionProvider;
