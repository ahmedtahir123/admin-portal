import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import AddEditVolunteerContainer from "../containers/AddEditVolunteer";
import { addCampaign, getCampaignById, updateCampaign } from "../store/actions/campaign.actions";
import { getDealsList } from "../store/actions/deals.actions";
import { getMusalliVolunteerById, resetData } from "../store/actions/musalli_volunteer.action";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMusalliVolunteerById,
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
});

const AddEditVolunteerProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditVolunteerContainer));

export default AddEditVolunteerProvider;
