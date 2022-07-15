import { get, put, post, remove, patch } from "./http.service";
import { delay, getListQuery } from "../utils/utils";

const bookOrderManagementService = {
  addBookOrder: body => post(`order-service/order/v1/public/admin/book-purchase-orders`, body),
  deliveryStatus: body => patch(`order-service/order/v1/public/admin/book-purchase-orders/shipment`, "", body),
  enableBookSubscription: body => patch(`order-service/order/v1/public/admin/book-purchase-orders/is-enabled`, body),
  getBookOrdersById: id => get(`order-service/order/v1/public/admin/book-purchase-orders/${id}`),
  updateBookOrdersById: bookInfo => put(`order-service/order/v1/public/admin/book-purchase-orders`, bookInfo),
  deleteBookOrders: body => remove(`order-service/order/v1/public/admin/book-purchase-orders`, body),
  getBookOrdersList: query => get(`order-service/order/v1/public/admin/book-purchase-orders${getListQuery(query)}`),
  authoize: body => post(`order-service/order/v1/public/admin/book-purchase-orders/authorize`, body),
  reject: body => patch(`order-service/order/v1/public/admin/book-purchase-orders/reject`, "", body),
  paymentStatus: body => patch(`order-service/order/v1/public/admin/book-purchase-orders/payment`, "", body),
  sendEmail: id => get(`order-service/order/v1/public/admin/book-purchase-orders/email/${id}`),
  print: id => get(`order-service/order/v1/public/admin/book-purchase-orders/file/${id}`),
  regenerateCode: id => get(`order-service/order/v1/public/admin/book-purchase-orders/regenerate/codes/${id}`),
  printCSV: id => get(`order-service/order/v1/public/admin/book-purchase-orders/file/csv/${id}`),
};
export default bookOrderManagementService;
