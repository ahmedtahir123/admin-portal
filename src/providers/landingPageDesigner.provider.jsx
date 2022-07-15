import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LandingPageDesigner from "../containers/LandingPageDesigner/LandingPageDesigner";
import { getDesigner, addDesigner, updateDesigner } from "../store/actions/landingPageDesigner.action";
import { updateProfiler, addProfiler, getProfilerList, getProfilerById } from "../store/actions/landingPage.actions";

const mapDispatchToProps = dispatch => ({
  getDesigner: id => dispatch(getProfilerById(id)),
  addDesigner: value => dispatch(addProfiler(value)),
  updateDesigner: (id, info) => dispatch(updateProfiler(id, info)),
});

const mapStateToProps = state => ({
  loading: state.designer.loading,
  designer: state.profiler.selected,
  error: state.designer.error,
});

const LandingPageDesignerProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingPageDesigner));

export default LandingPageDesignerProvider;
