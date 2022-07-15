import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AddEditConsumer from "../containers/AddEditConsumer/AddEditConsumer";
import { addNewConsumer, getConsumerById, updateConsumer, deleteConsumer } from "../store/actions/consumer.actions";

const mapDispatchToProps = dispatch => ({
  addNewConsumer: (consumerInfo, getProgress) => dispatch(addNewConsumer(consumerInfo, getProgress)),
  getConsumerById: id => dispatch(getConsumerById(id)),
  updateConsumer: (id, body, getProgress) => dispatch(updateConsumer(id, body, getProgress)),
  deleteConsumer: id => dispatch(deleteConsumer(id)),
});

const mapStateToProps = state => ({
  loading: state.consumer.loading,
  uploadLoader: state.ui.loading,
  consumer: state.consumer.selected,
  error: state.consumer.error,
  province: state.areaSegment.state,
  cities: state.areaSegment.cities,
});

const AddEditConsumerProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditConsumer));

export default AddEditConsumerProvider;
