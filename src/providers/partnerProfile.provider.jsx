import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import PartnerProfileContainer from "../containers/PartnerProfile/PartnerProfile";
import { getSegmentList } from "../store/actions/areaSegment.actions";
import { getBrandNamesList } from "../store/actions/brand.actions";
import {
  addPartner,
  deletePartner,
  getPartnerById,
  updatePartner,
  updatePartnerStatus,
} from "../store/actions/partner.actions";
import { userSuccess } from "../store/actions/user.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPartner: getPartnerById,
      addPartner,
      deletePartner,
      updatePartner,
      getSegmentList,
      getBrandNamesList,
      updatePartnerStatus,
      updateUserInStore: userSuccess,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.partner.loading,
  user: state.user.value,
  partner: state.partner.selected,
  filteredBrands: state.brand.filteredList,
  areaSegments: state.areaSegment.list,
  brandsLoader: state.brand.loading,
  areaSegmentsLoader: state.areaSegment.loading,
  error: state.partner.error,
  uploadError: state.ui.error,
  uploadLoader: state.ui.loading,
});

const AddEditPartnerProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(PartnerProfileContainer));

export default AddEditPartnerProvider;
