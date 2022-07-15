import { get, put, post, remove, patch } from "./http.service";
import { delay, getListQuery } from "../utils/utils";
import { partner } from "../__mocks__/partner";

const PartnerService = {
  addPartner: body => post(`partner/v1/public/admin/partners`, body),
  enablePartner: codes => patch(`partner/v1/public/admin/partners?codes=${codes}&enabled=true`),
  disablePartner: codes => patch(`partner/v1/public/admin/partners?codes=${codes}&enabled=false`),
  getPartnerById: code => get(`partner/v1/public/admin/partners/${code}`),
  updatePartnerById: (code, body) => put(`partner/v1/public/admin/partners/${code}`, body),
  deletePartnerById: code => remove(`partner/v1/public/admin/partners/${code}`),
  deletePartners: codes => remove(`partner/v1/public/admin/partners?codes=${codes}`),
  getPartnerList: query => get(`partner/v1/public/admin/partners${getListQuery(query)}`),
  updatePartnerStatus: (code, status) => patch(`partner/v1/public/admin/partners/${code}/${status}`),
};
export default PartnerService;
