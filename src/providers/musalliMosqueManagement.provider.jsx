import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import MusalliMosqueManagement from "../containers/MusalliMosqueManagement/MusalliMosqueManagement";
import { getAllMosque } from "../store/actions/musalli_mosque.action";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllMosque,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.mosque.loading,
  list: state.mosque.list,
  error: state.mosque.error,
  pagination: state.mosque.value,
});

const MusalliMosqueManagementProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MusalliMosqueManagement),
);

export default MusalliMosqueManagementProvider;
