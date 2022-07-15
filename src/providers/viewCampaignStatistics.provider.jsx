import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getCampaignStatusById,
  updateCampaignStatus,
  addCampaignStatus,
} from "../store/actions/campaignStatusConsole.actions";
import ViewCampaignStatisticsContainer from "../containers/ViewCampaignStatistics/ViewCampaignStatistics";

const mapDispatchToProps = dispatch => ({
  addCampaignStatus: status => dispatch(addCampaignStatus(status)),
  getCampaignStatusById: id => dispatch(getCampaignStatusById(id)),
  updateCampaignStatus: (id, statusInfo) => dispatch(updateCampaignStatus(id, statusInfo)),
});

const mapStateToProps = state => ({
  loading: state.campaignStatus.loading,
  campaignStatus: state.campaignStatus.selected,
  error: state.campaignStatus.error,
});

const ViewCampaignStatisticsProvider = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ViewCampaignStatisticsContainer),
);

export default ViewCampaignStatisticsProvider;
