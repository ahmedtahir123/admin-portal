import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CampaignStatusConsoleContainer from "../containers/CampaignStatusConsole/CampaignStatusConsoleManagement";
import { getCampaignStatusList, deleteAllCampaignStatus } from "../store/actions/campaignStatusConsole.actions";

const mapDispatchToProps = dispatch => ({
  enableDisableCampaign: selectedRows => {},
  getCampaignStatusList: pageInfo => dispatch(getCampaignStatusList(pageInfo)),
  deleteAllCampaignStatus: id => dispatch(deleteAllCampaignStatus(id)),
});
const mapStateToProps = state => ({
  loading: state.campaignStatus.loading,
  dataSource: state.campaignStatus.list,
  campaignStatus: state.campaignStatus.value,
  error: state.campaignStatus.error,
  pagination: state.campaignStatus.value,
});

const campaignStatusConsoleProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CampaignStatusConsoleContainer),
);

export default campaignStatusConsoleProvider;
