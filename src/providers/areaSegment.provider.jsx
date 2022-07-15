import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AreaSegmentContainer from "../containers/AreaSegmentManagement";
import {
  deleteAllSegments,
  enableDisableSegmentCategories,
  getSegmentList,
} from "../store/actions/areaSegment.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      enableDisableSegmentCategories,
      getSegmentList,
      deleteAllSegments,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.areaSegment.loading,
  list: state.areaSegment.list,
  pagination: state.areaSegment.value,
  error: state.areaSegment.error,
});

const AreaSegmentProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(AreaSegmentContainer));

export default AreaSegmentProvider;
