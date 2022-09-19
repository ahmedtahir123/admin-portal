import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AddEditVolunteerContainer from "../containers/AddEditVolunteer";
import { addCampaign, getCampaignById, updateCampaign } from "../store/actions/campaign.actions";
import { getDealsList } from "../store/actions/deals.actions";
import {
  getMusalliVolunteerById,
  resetData,
  updateVolunteer,
  addVolunteer,
} from "../store/actions/musalli_volunteer.action";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMusalliVolunteerById,
      updateVolunteer,
      addVolunteer,
      resetData,
      // deleteAdminUsers,
      // enableDisableAdmin,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.volunteer.loading,

  data: state.volunteer.selected,
  mosqueOptionLoading: state.activeMosqueBySession.mosqueOptionLoading,
  mosqueOptionlist: state.activeMosqueBySession.mosqueOptionlist,
  activeSessionLoading: state.musalliGetAllActiveSession.loading,
  activeSessionList: state.musalliGetAllActiveSession.list,
});

const AddEditVolunteerProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditVolunteerContainer));

export default AddEditVolunteerProvider;
