import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import PartnerManagement from "../containers/PartnerManagement/PartnerManagement";
import { deleteAllPartner, enableDisablePartner, getPartnerList } from "../store/actions/partner.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      enableDisablePartner,
      getPartnerList,
      deleteAllPartner,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.partner.loading,
  dataSource: state.partner.list,
  pagination: state.partner.value,
  error: state.partner.error,
});

const PartnerManagementProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(PartnerManagement));

export default PartnerManagementProvider;
