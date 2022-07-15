import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LandingPageManagement from "../containers/LandingPageManagement";
import { getProfilerList, deleteAllProfiler, enableDisableProfiler } from "../store/actions/landingPage.actions";

const mapDispatchToProps = dispatch => ({
  enableDisableProfiler: (ids, enabled) => dispatch(enableDisableProfiler(ids, enabled)),
  getProfilerList: pageInfo => dispatch(getProfilerList(pageInfo)),
  deleteAllProfiler: () => dispatch(deleteAllProfiler()),
});

const mapStateToProps = state => ({
  loading: state.profiler.loading,
  profiler: state.profiler.list,
  pagination: state.profiler.value,
  error: state.profiler.error,
});

const LandingPageManagementProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingPageManagement));

export default LandingPageManagementProvider;
