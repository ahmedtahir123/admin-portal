import { get, put, post, remove, patch } from "./http.service";
import { getListQuery } from "../utils/utils";

const CorporateCustomerService = {
  addCorporateClient: body => post(`deal/v1/public/admin/corporate-customer`, body),
  enableCorporateClient: body => patch(`deal/v1/public/admin/corporate-customer/is-enabled`, "", body),
  disableCorporateClient: body => patch(`deal/v1/public/admin/corporate-customer/is-enabled`, "", body),
  getCorporateClientById: code => get(`deal/v1/public/admin/corporate-customer/${code}`),
  updateCorporateClient: (code, body) => put(`deal/v1/public/admin/corporate-customer`, body),
  deleteCorporateClientById: code => remove(`deal/v1/public/admin/corporate-customer/${code}`),
  deleteCorporateClients: (codes, body) => remove(`deal/v1/public/admin/corporate-customer`, "", body),
  getCorporateClientList: query => get(`deal/v1/public/admin/corporate-customer${getListQuery(query)}`),
  getAllCorporateClientNames: () => get(`deal/v1/public/admin/corporate-customer/names`),
};
export default CorporateCustomerService;
