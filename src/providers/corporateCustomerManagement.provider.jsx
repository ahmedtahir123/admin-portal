import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import CorporateCustomerManagement from "../containers/CorporateCustomerManagement/CorporateCustomerManagement";
import {
  getCorporateClientList,
  deleteAllCorporateClient,
  enableDisableCorporateClient,
} from "../store/actions/corporateCustomer.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      enableDisableClient: enableDisableCorporateClient,
      getCorporateClientList,
      deleteAllCorporateClient,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.corporateCustomer.loading,
  dataSource: state.corporateCustomer.list,
  corporateClient: state.corporateCustomer.value,
  error: state.corporateCustomer.error,
});

const CorporateCustomerManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CorporateCustomerManagement),
);

export default CorporateCustomerManagementProvider;
