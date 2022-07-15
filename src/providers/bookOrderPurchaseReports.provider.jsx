import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BookOrderPurchaseReportsContainer from "../containers/BookOrderReports/BookOrderReports";

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({});

const BookOrderReportsProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BookOrderPurchaseReportsContainer),
);

export default BookOrderReportsProvider;
