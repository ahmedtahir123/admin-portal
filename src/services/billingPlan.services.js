import { get, put, post, patch } from "./http.service";
import { getListQuery } from "../utils/utils";

const BillingPlanServices = {
  addOutletBilling: body => post(`partner/v1/public/admin/billing-contracts`, body),
  getBillingPlanById: code => get(`partner/v1/public/admin/billing-contracts/${code}`),
  updateBillingPlanById: (code, body) => put(`partner/v1/public/admin/billing-contracts/${code}`, body),
  getOutletBillingList: query => get(`partner/v1/public/admin/billing-contracts${getListQuery(query)}`),
  getCities: () => get("common-service/common/v1/public/admin/cities"),
  print: id => get(`partner/v1/public/admin/billing-contracts/${id}/print`),

  resumeBillingPlan: codes => patch(`partner/v1/public/admin/billing-contracts?codes=${codes}&status=ACTIVE`),
  suspendBillingPlan: codes => patch(`partner/v1/public/admin/billing-contracts?codes=${codes}&status=INACTIVE`),
  retireBillingPlan: codes => patch(`partner/v1/public/admin/billing-contracts?codes=${codes}&status=RETIRED`),
  cloneBillingPlan: code => get(`partner/v1/public/admin/billing-contracts/partner/${code}/latest`),
};
export default BillingPlanServices;
