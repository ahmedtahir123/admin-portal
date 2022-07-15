import { get, put, post, remove, patch } from "./http.service";

const PartnerService = {
  getDailyRecordsList: () => get(`partner/v1/public/merchant/partner-daily-reports`),
};
export default PartnerService;
