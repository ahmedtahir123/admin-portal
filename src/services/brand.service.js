import { get, put, post, remove, patch } from "./http.service";
import { getListQuery } from "../utils/utils";

const BrandService = {
  getBrandNamesList: query => get(`partner/v1/public/admin/brands/search`, { params: query }),
  getBrandList: query => get(`partner/v1/public/admin/brands`, { params: query }),
  enableBrandList: ids => patch(`partner/v1/public/admin/brands?codes=${ids}&enabled=true`),
  disableBrandList: ids => patch(`partner/v1/public/admin/brands?codes=${ids}&enabled=false`),
  addBrand: body => post(`partner/v1/public/admin/brands`, body),
  getBrandById: id => get(`partner/v1/public/admin/brands/${id}`),
  updateBrand: (id, brandInfo) => put(`partner/v1/public/admin/brands/${id}`, brandInfo),
  deleteAllBrands: ids => remove(`partner/v1/public/admin/brands?codes=${ids}`),
  deleteBrandById: code => remove(`partner/v1/public/admin/brands/${code}`),
  getBookBrandList: (bookCode, queryParam) =>
    get(`deal/v1/public/admin/bookBrands/${bookCode}${getListQuery(queryParam)}`),
  getSelectedBrandList: (bookCode, queryParam) =>
    get(`deal/v1/public/admin/bookBrands/${bookCode}/popularBrands${getListQuery(queryParam)}`),
  addSelectedBrands: (bookCode, brandCodes) =>
    patch(`deal/v1/public/admin/bookBrands/popularBrands/add?bookCode=${bookCode}&brandCodes=${brandCodes}`),
  removeSelectedBrands: (bookCode, brandCodes) =>
    patch(`deal/v1/public/admin/bookBrands/popularBrands/remove?bookCode=${bookCode}&brandCodes=${brandCodes}`),
};

export default BrandService;
