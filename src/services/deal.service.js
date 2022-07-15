import { get, put, post, remove, patch } from "./http.service";
import { getListQuery } from "../utils/utils";
const DealService = {
  getDealCategoriesList: query => get(`deal/v1/public/admin/categories${getListQuery(query)}`),
  deleteDealCategories: ids => remove(`deal/v1/public/admin/categories?codes=${ids}`),
  enableDealCategories: ids => patch(`deal/v1/public/admin/categories?codes=${ids}&enabled=true`),
  disableDealCategories: ids => patch(`deal/v1/public/admin/categories?codes=${ids}&enabled=false`),
  addDealCategory: body => post(`deal/v1/public/admin/categories`, body),
  getDealCategoryById: id => get(`deal/v1/public/admin/categories/${id}`),
  updateDealCategoryById: (id, body) => put(`deal/v1/public/admin/categories/${id}`, body),
  addDeal: body => post(`deal/v1/public/admin/deals`, body),
  getDealById: id => get(`deal/v1/public/admin/deals/${id}`),
  updateDealById: (id, body) => put(`deal/v1/public/admin/deals/${id}`, body),
  deleteAllDeals: ids => remove(`deal/v1/public/admin/deals?codes=${ids}`),
  enableDeal: ids => patch(`deal/v1/public/admin/deals?codes=${ids}&enabled=true`),
  disableDeal: ids => patch(`deal/v1/public/admin/deals?codes=${ids}&enabled=false`),
  getDealsList: query => get(`deal/v1/public/admin/deals${getListQuery(query)}`),
  getSelectedDealsList: (bookCode, query) => get(`deal/v1/public/admin/bookDeals/${bookCode}${getListQuery(query)}`),
  getSelectedPopularDealsList: (bookCode, query) =>
    get(`deal/v1/public/admin/bookDeals/${bookCode}/popularDeals${getListQuery(query)}`),
  addSelectedDeal: (bookCode, ids) => patch(`deal/v1/public/admin/bookDeals/add?bookCode=${bookCode}&dealCodes=${ids}`),
  removeSelectedDeal: (bookCode, ids) =>
    patch(`deal/v1/public/admin/bookDeals/remove?bookCode=${bookCode}&dealCodes=${ids}`),
  addSelectedPopularDeals: (bookCode, dealCodes) =>
    patch(`deal/v1/public/admin/bookDeals/popularDeals/add?bookCode=${bookCode}&dealCodes=${dealCodes}`),
  removeSelectedPopularDeals: (bookCode, dealCodes) =>
    patch(`deal/v1/public/admin/bookDeals/popularDeals/remove?bookCode=${bookCode}&dealCodes=${dealCodes}`),
};
export default DealService;
