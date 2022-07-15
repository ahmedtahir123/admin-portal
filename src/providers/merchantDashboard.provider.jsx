import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addNewUser } from "../store/actions/user.actions";
import { getDailyRecordsList } from "../store/actions/merchantDashboard.actions";
import MerchantDashboardContainer from "../containers/MerchantDashboard/MerchantDashboard";

const mapDispatchToProps = dispatch => ({
  addNewUser: user => dispatch(addNewUser(user)),
  getDailyRecordsList: () => dispatch(getDailyRecordsList()),
});

const mapStateToProps = state => ({
  loading: state.user.loading,
  user: state.user.value,
  error: state.user.error,
  dailyList: state.merchantDashboard.list,
});

const MerchantDashboardProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(MerchantDashboardContainer));

export default MerchantDashboardProvider;
