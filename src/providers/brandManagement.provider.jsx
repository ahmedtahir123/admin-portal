import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import BrandManagement from "../containers/BrandManagement/BrandManagement";
import { deleteAllBrands, enableDisableBrandList, getBrandList } from "../store/actions/brand.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      enableDisableBrandList,
      getBrandList,
      deleteAllBrands,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.brand.loading,
  dataSource: state.brand.list,
  pagination: state.brand.value,
  error: state.brand.error,
});

const BrandManagementProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(BrandManagement));

export default BrandManagementProvider;
