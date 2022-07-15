import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import BookManagement from "../containers/BookManagement/BookManagement";
import { getBooksList, deleteAllBooks, enableDisableBooks } from "../store/actions/book.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      enableDisableBooks,
      getBooksList,
      deleteAllBooks,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.book.loading,
  list: state.book.list,
  error: state.book.error,
  pagination: state.book.value,
});

const BookManagementProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(BookManagement));

export default BookManagementProvider;
