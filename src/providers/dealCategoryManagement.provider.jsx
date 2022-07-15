import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getDealCategoriesList,
  deleteDealCategories,
  enableDisableDealCategories,
} from "../store/actions/dealCategory.actions";
import { bindActionCreators } from "redux";
import DealCategoryManagementContainer from "../containers/DealCategoryManagement/DealCategoryManagement";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      enableDisableDealCategories,
      getDealCategoriesList,
      deleteDealCategories,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.dealCategory.loading,
  list: state.dealCategory.list,
  error: state.dealCategory.error,
  pagination: state.dealCategory.value,
});

const DealCategoryManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DealCategoryManagementContainer),
);

export default DealCategoryManagementProvider;
