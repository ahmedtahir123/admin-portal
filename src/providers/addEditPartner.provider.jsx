import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import AddEditPartnerContainer from "../containers/AddEditPartner/AddEditPartner";
import {
  getPartnerById,
  addPartner,
  updatePartner,
  deletePartner,
  updatePartnerStatus,
} from "../store/actions/partner.actions";
import { getSegmentList } from "../store/actions/areaSegment.actions";
import { getBrandNamesList, brandFilterListSuccess } from "../store/actions/brand.actions";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPartnerById,
      addPartner,
      deletePartner,
      updatePartner,
      getSegmentList,
      getBrandNamesList,
      updatePartnerStatus,
      brandFilterListSuccess,
    },
    dispatch,
  );

const mapStateToProps = state => ({
  loading: state.partner.loading,
  partner: state.partner.selected,
  filteredBrands: state.brand.filteredList,
  areaSegments: state.areaSegment.list,
  brandsLoader: state.brand.loading,
  areaSegmentsLoader: state.areaSegment.loading,
  error: state.partner.error,
  uploadError: state.ui.error,
  uploadLoader: state.ui.loading,
});

const AddEditPartnerProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditPartnerContainer));

export default AddEditPartnerProvider;
