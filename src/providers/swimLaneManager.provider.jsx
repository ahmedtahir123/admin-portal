import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateSwimLane, addSwimLane, getSwimlaneById, getProfilerById } from "../store/actions/landingPage.actions";
import SwimLaneManagerContainer from "../containers/SwimLaneManager/SwimLaneManager";

const mapDispatchToProps = dispatch => ({
  getSwimlaneById: id => dispatch(getSwimlaneById(id)),
  updateSwimLane: (body, getProgress) => dispatch(updateSwimLane(body, getProgress)),
  addSwimLane: (body, getProgress) => dispatch(addSwimLane(body, getProgress)),
  getProfile: id => dispatch(getProfilerById(id)),
});

const mapStateToProps = state => ({
  loading: state.profiler.loading,
  profile: state.profiler.selected,
  swimlanes: state.profiler.swimlanes,
});

const SwimLaneManagerProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(SwimLaneManagerContainer));

export default SwimLaneManagerProvider;
