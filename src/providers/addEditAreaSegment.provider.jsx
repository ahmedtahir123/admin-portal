import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getSegmentById, updateSegment, addSegment, deleteArea } from "../store/actions/areaSegment.actions";
import AddEditAreaSegmentContainer from "../containers/AddEditAreaSegment/AddEditAreaSegment";

const mapDispatchToProps = dispatch => ({
  addSegment: segment => dispatch(addSegment(segment)),
  getSegmentById: id => dispatch(getSegmentById(id)),
  updateSegment: (id, segmentInfo) => dispatch(updateSegment(id, segmentInfo)),
  deleteArea: id => dispatch(deleteArea(id)),
});

const mapStateToProps = state => ({
  loading: state.areaSegment.loading,
  areaSegment: state.areaSegment.selected,
  error: state.areaSegment.error,
  province: state.areaSegment.state,
  cities: state.areaSegment.cities,
});

const AddEditAreaSegmentProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddEditAreaSegmentContainer),
);

export default AddEditAreaSegmentProvider;
