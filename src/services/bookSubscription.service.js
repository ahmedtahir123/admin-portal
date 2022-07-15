import { get, put, post, remove, patch } from "./http.service";
import { getListQuery } from "../utils/utils";

const BookSubscriptionService = {
  addBookSubscription: body => post(`order-service/order/v1/public/admin/corporate-book-purchase-orders`, body),
  getBookSubscriptionById: code => get(`order-service/order/v1/public/admin/corporate-book-purchase-orders/${code}`),
  updateBookSubscriptionById: body => put(`order-service/order/v1/public/admin/corporate-book-purchase-orders`, body),
  deleteBookSubscriptionById: code =>
    remove(`order-service/order/v1/public/admin/corporate-book-purchase-orders/${code}`),
  deleteBookSubscriptions: body =>
    remove(`order-service/order/v1/public/admin/corporate-book-purchase-orders`, "", body),
  getBookSubscriptionList: pageInfo =>
    get(`order-service/order/v1/public/admin/corporate-book-purchase-orders${getListQuery(pageInfo)}`),
  enableBookSubscription: body =>
    patch(`order-service/order/v1/public/admin/corporate-book-purchase-orders/is-enabled`, "", body),
  disableBookSubscription: body =>
    patch(`order-service/order/v1/public/admin/corporate-book-purchase-orders/is-enabled`, "", body),
  authoize: body => post(`order-service/order/v1/public/admin/corporate-book-purchase-orders/authorize`, body),
  getCities: () => get("common-service/common/v1/public/admin/cities"),
  print: id => get(`order-service/order/v1/public/admin/corporate-book-purchase-orders/file/${id}`),
  regenerateCode: id =>
    get(`order-service/order/v1/public/admin/corporate-book-purchase-orders/regenerate/codes/${id}`),
  printCSV: id => get(`order-service/order/v1/public/admin/corporate-book-purchase-orders/file/csv/${id}`),
};
export default BookSubscriptionService;
