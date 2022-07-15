import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteCampaign, getCampaignList, updateCampaignActiveStatus } from "../store/actions/campaign.actions";
import CampaignDesigner from "../containers/CampaignDesigner";

const mapDispatchToProps = dispatch => ({
  getCampaignList: pageInfo => dispatch(getCampaignList(pageInfo)),
  deleteCampaign: selectedRows => dispatch(deleteCampaign(selectedRows)),
  updateActiveStatus: (ids, enabled) => dispatch(updateCampaignActiveStatus(ids, enabled)),
});

const mapStateToProps = state => ({
  loading: state.campaign.loading,
  dataSource: state.campaign.list,
  campaigns: state.campaign.value,
  error: state.campaign.error,
});

const CampaignDesignerProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(CampaignDesigner));

export default CampaignDesignerProvider;
