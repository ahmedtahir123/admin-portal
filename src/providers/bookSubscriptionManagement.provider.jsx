import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import BookSubscriptionManagement from "../containers/BookSubscriptionManagement/BookSubscriptionManagement";
import {
  getBookSubscriptionsList,
  deleteBookSubscriptions,
  enableDisableBookSubscription,
  authorize,
} from "../store/actions/bookSubscription.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      enableDisableBookSubscription,
      getBookSubscriptionsList,
      deleteBookSubscriptions,
      authorize,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.bookSubscription.loading,
  dataSource: state.bookSubscription.list,
  bookSubscription: state.bookSubscription.value,
  pagination: state.bookSubscription.value,
  error: state.bookSubscription.error,
});

const BookSubscriptionManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BookSubscriptionManagement),
);

export default BookSubscriptionManagementProvider;
