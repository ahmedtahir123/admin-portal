import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AddEditCorporateCustomer from "../containers/AddEditCoporateCustomer/AddEditCorporateCustomer";
import {
  getCorporateClientById,
  addCorporateClient,
  deleteCorporateClient,
  updateCorporateClient,
} from "../store/actions/corporateCustomer.actions";

const mapDispatchToProps = dispatch => ({
  getCorporateCustomer: code => dispatch(getCorporateClientById(code)),
  addCorporateCustomer: (corporateCustomerInfo, getProgress) =>
    dispatch(addCorporateClient(corporateCustomerInfo, getProgress)),
  deleteCorporateCustomer: id => dispatch(deleteCorporateClient(id)),
  updateCorporateCustomer: (code, corporateCustomerInfo, getProgress) =>
    dispatch(updateCorporateClient(code, corporateCustomerInfo, getProgress)),
});

const mapStateToProps = state => ({
  loading: state.corporateCustomer.loading,
  corporateCustomer: state.corporateCustomer.selected,
  error: state.corporateCustomer.error,
});

const AddEditCorporateCustomerProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddEditCorporateCustomer),
);

export default AddEditCorporateCustomerProvider;
