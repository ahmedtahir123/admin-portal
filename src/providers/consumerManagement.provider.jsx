import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import ConsumerManagement from "../containers/ConsumerManagement";
import { deleteAllConsumers, enableDisableConsumers, getAllConsumers } from "../store/actions/consumer.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllConsumers,
      deleteAllConsumers,
      enableDisableConsumers,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.consumer.loading,
  pagination: state.consumer.value,
  list: state.consumer.list,
  error: state.consumer.error,
});

const ConsumerManagementProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConsumerManagement));

export default ConsumerManagementProvider;
