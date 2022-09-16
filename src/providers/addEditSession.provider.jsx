import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AddEditSessionContainer from "../containers/AddEditSession";
import {
  getMusalliSessionById,
  updateMusalliSession,
  createMusalliSession,
  resetData,
} from "../store/actions/musalli_session.action";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMusalliSessionById,
      updateMusalliSession,
      createMusalliSession,
      resetData,
      // deleteAdminUsers,
      // enableDisableAdmin,
    },
    dispatch,
  );
const mapStateToProps = state => ({
  loading: state.musalliSession.loading,
  data: state.musalliSession.selected,
});

const AddEditSessionProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditSessionContainer));

export default AddEditSessionProvider;
