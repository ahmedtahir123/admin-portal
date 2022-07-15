import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  addProfiler,
  getProfilerById,
  updateProfiler,
  deleteAllProfiler,
  startProfiler,
} from "../store/actions/landingPage.actions";
import AddEditProfilerContainer from "../containers/AddEditProfiler/AddEditProfiler";

const mapDispatchToProps = dispatch => ({
  addProfiler: profiler => dispatch(addProfiler(profiler)),
  getProfilerById: id => dispatch(getProfilerById(id)),
  updateProfiler: (id, profilerInfo) => dispatch(updateProfiler(id, profilerInfo)),
  deleteAllProfiler: id => dispatch(deleteAllProfiler(id)),
  startProfilerr: id => dispatch(startProfiler(id)),
});

const mapStateToProps = state => ({
  loading: state.profiler.loading,
  profiler: state.profiler.selected,
  error: state.profiler.error,
  bookLocationList: state.areaSegment.cities,
});

const AddEditProfilerProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditProfilerContainer));

export default AddEditProfilerProvider;
