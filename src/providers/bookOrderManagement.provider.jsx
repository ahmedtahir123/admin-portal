import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  getBookOrdersList,
  deleteBookOrders,
  enableDisableBookSubscription,
  deliveryStatus,
  authorize,
  paymentStatus,
} from "../store/actions/bookOrderManagement.actions";
import BookOrderManagementContainer from "../containers/BookOrderManagement/BookOrderManagement";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deliveryStatus,
      enableDisableBookSubscription,
      getBookOrdersList,
      deleteBookOrders,
      authorize,
      paymentStatus,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.bookOrder.loading,
  dataSource: state.bookOrder.list,
  error: state.bookOrder.error,
  books: state.bookOrder.value,
  pagination: state.bookOrder.value,
});

const BookOrderManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BookOrderManagementContainer),
);

export default BookOrderManagementProvider;
