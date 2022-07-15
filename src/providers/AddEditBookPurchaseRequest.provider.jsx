import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  addBookOrder,
  getBookOrdersById,
  updateBookOrdersById,
  deleteBookOrders,
  deliveryStatus,
  paymentStatus,
  reject,
  sendEmail,
  regenerateCode,
  print,
  printCSV,
} from "../store/actions/bookOrderManagement.actions";
import AddEditBookPurchaseRequestContainer from "../containers/AddEditBookPurchaseRequest/AddEditBookPurchaseRequest";
import { getBooksByLocation, getBookById, selectedBookSuccess, resetBooks } from "../store/actions/book.actions";
import { getAllConsumers, getConsumerById, resetConsumer } from "../store/actions/consumer.actions";

const mapDispatchToProps = dispatch => ({
  deleteBookOrders: id => dispatch(deleteBookOrders(id)),
  addBookOrder: (bookInfo, getProgress) => dispatch(addBookOrder(bookInfo, getProgress)),
  getBookOrdersById: id => dispatch(getBookOrdersById(id)),
  updateBookOrdersById: (id, bookInfo, getProgress) => dispatch(updateBookOrdersById(id, bookInfo, getProgress)),
  getBooks: location => dispatch(getBooksByLocation(location)),
  getBookById: id => dispatch(getBookById(id)),
  getAllConsumers: query => dispatch(getAllConsumers(query)),
  getConsumerById: id => dispatch(getConsumerById(id)),
  paymentStatus: (id, body) => dispatch(paymentStatus(id, body)),
  deliveryStatus: (id, body) => dispatch(deliveryStatus(id, body)),
  resetConsumer: () => dispatch(resetConsumer()),
  reject: (id, body) => dispatch(reject(id, body)),
  sendEmail: id => dispatch(sendEmail(id)),
  print: id => dispatch(print(id)),
  regenerateCode: id => dispatch(regenerateCode(id)),
  resetBook: () => dispatch(selectedBookSuccess({})),
  resetBooks: () => dispatch(resetBooks()),
  printCSV: id => dispatch(printCSV(id)),
});

const mapStateToProps = state => ({
  loading: state.bookOrder.loading,
  selected: state.bookOrder.selected,
  books: state.book.list,
  book: state.book.selected,
  error: state.bookOrder.error,
  consumer: state.consumer.list,
  consumerList: state.consumer.selected,
  bookLocationList: state.areaSegment.cities,
});

const AddEditBookPurchaseProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddEditBookPurchaseRequestContainer),
);

export default AddEditBookPurchaseProvider;
