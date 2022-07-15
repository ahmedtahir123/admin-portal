import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getDealsList, deleteAllDeals, enableDisableDeal } from "../store/actions/deals.actions";
import { bindActionCreators } from "redux";
import DealManagementContainer from "../containers/DealManagement";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      enableDisableDeal,
      getDealsList,
      deleteAllDeals,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.deals.loading,
  list: state.deals.list,
  deals: state.deals.list,
  error: state.deals.error,
  pagination: state.deals.value,
});

const DealManagementProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(DealManagementContainer));

export default DealManagementProvider;
