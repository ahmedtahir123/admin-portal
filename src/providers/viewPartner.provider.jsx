import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ViewPartnerContainer from "../containers/ViewPartner/ViewPartner";
import {
  getPartnerById,
  addPartner,
  updatePartner,
  deletePartner,
  updatePartnerStatus,
} from "../store/actions/partner.actions";
import { getSegmentList } from "../store/actions/areaSegment.actions";
import { getBrandNamesList } from "../store/actions/brand.actions";

const mapDispatchToProps = dispatch => ({
  getPartner: code => dispatch(getPartnerById(code)),
  addPartner: partnerInfo => dispatch(addPartner(partnerInfo)),
  deletePartner: id => dispatch(deletePartner(id)),
  updatePartner: (code, partnerInfo) => dispatch(updatePartner(code, partnerInfo)),
  getSegmentList: pageInfo => dispatch(getSegmentList(pageInfo)),
  getBrandNamesList: pageInfo => dispatch(getBrandNamesList(pageInfo)),
  updatePartnerStatus: (code, status) => dispatch(updatePartnerStatus(code, status)),
});

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

const ViewPartnerProvider = withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewPartnerContainer));

export default ViewPartnerProvider;
