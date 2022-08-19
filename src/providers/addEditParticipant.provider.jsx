import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AddEditParticipantContainer from "../containers/AddEditParticipant";
import { addCampaign, getCampaignById, updateCampaign } from "../store/actions/campaign.actions";
import { getDealsList } from "../store/actions/deals.actions";

const mapDispatchToProps = dispatch => ({
  addCampaign: campaign => dispatch(addCampaign(campaign)),
  getCampaignById: id => dispatch(getCampaignById(id)),
  updateCampaign: (id, campaign) => dispatch(updateCampaign(id, campaign)),
  getVoucherList: pageInfo => dispatch(getDealsList(pageInfo)),
});

const mapStateToProps = state => ({
  loading: state.campaign.loading,
  campaign: state.campaign.selected,
  vouchers: state.deals.list,
  vouchersList: state.deals.value,
  error: state.campaign.error,
});

const AddEditParticipantProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddEditParticipantContainer),
);

export default AddEditParticipantProvider;
