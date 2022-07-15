import { get, put, post, remove, patch } from "./http.service";
import { getListQuery } from "../utils/utils";

const VoucherRedemptionService = {
  addVoucherRedemption: body => post(`deal-broker/v1/public/merchant/voucherRedeemed/tickets`, body),
  getVoucherRedemptionById: id => get(`deal-broker/v1/public/merchant/voucherRedeemed/tickets/${id}`),
  updateTicketWithAuthCode: redemptionData =>
    patch(
      `deal-broker/v1/public/merchant/voucherRedeemed/tickets/${redemptionData.ticketId}/authCode`,
      {},
      redemptionData,
    ),
  updateTicketWithQRCode: redemptionData =>
    patch(
      `deal-broker/v1/public/merchant/voucherRedeemed/tickets/${redemptionData.ticketId}/qrCode`,
      {},
      redemptionData,
    ),
  updateVoucherRedemptionById: (id, body) => put(`deal-broker/v1/public/merchant/voucherRedeemed/tickets/${id}`, body),
  deleteAllVoucherRedemptions: ids => remove(`deal-broker/v1/public/merchant/voucherRedeemed/tickets?codes=${ids}`),
  enableVoucherRedemption: ids =>
    put(`deal-broker/v1/public/merchant/voucherRedeemed/tickets?codes=${ids}&enabled=true&username=admin`),
  disableVoucherRedemption: ids =>
    put(`deal-broker/v1/public/merchant/voucherRedeemed/tickets?codes=${ids}&enabled=false&username=admin`),
  getVoucherRedemptionsList: query =>
    get(`deal-broker/v1/public/merchant/voucherRedeemed/tickets${getListQuery(query)}`),
};
export default VoucherRedemptionService;
