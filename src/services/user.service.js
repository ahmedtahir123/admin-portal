import { update } from "lodash";
import { get, put, post, remove, patch } from "./http.service";
import { getUser } from "../utils/auth.utils";
import { delay, getListQuery } from "../utils/utils";
import { USER, STATUS } from "../utils/constants";
import { capabilities } from "../__mocks__/capabilities";
import { permissions } from "../__mocks__/permissions";
import { notifications, viewedNotifications } from "../__mocks__/notifications";
import { admins } from "../__mocks__/allusers";
import { userTypes } from "../__mocks__/userTypes";

const UserService = {
  me: () => get(`users/me`),
  getUser: () => {
    const userData = getUser(USER);
    return userData || false;
  },
  delUser: user => remove(`users/curators/${user._id}?userRole=${user.role}`),
  login: (body, clientId) =>
    post(`gateway/login`, body, { headers: { "grant-type": "password", "client-id": clientId } }),
  logout: body => post(`gateway/logout`, body),
  changePassword: (body, page) => post(`gateway/public/${page}/admin-management/change-password`, body),

  getCapabilities: async () => {
    // return post(`capabilities-list`, body)
    await delay(2000);
    return new Promise(resolve => resolve(permissions || capabilities));
  },
  getNotifications: async () => {
    // return post(`notifications`, body)
    await delay(2000);
    return new Promise(resolve => resolve(notifications));
  },
  getUserTypes: async () => {
    await delay(2000);
    return new Promise(resolve => resolve(userTypes));
  },
  viewNotifications: async () => {
    // return post(`notifications/viewed`, body)
    await delay(2000);
    return new Promise(resolve => resolve(viewedNotifications));
  },

  // Admins
  addAdminUser: (userInfo, params) =>
    post(`user-service/user/v1/public/admin/admin-management/profile`, userInfo, params),
  getAdminById: id => get(`user-service/user/v1/public/admin/admin-management/profile/${id}`),
  updateAdmin: (id, userInfo, params) =>
    put(`user-service/user/v1/public/admin/admin-management/profile`, userInfo, params),
  getAllAdminUsers: query => get(`user-service/user/v1/public/admin/admin-management/profile${getListQuery(query)}`),
  deleteAdminUsers: ids => remove(`user-service/user/v1/public/admin/admin-management/profile/list/${ids}`),
  deleteAdminUser: id => remove(`user-service/user/v1/public/admin/admin-management/profile/list/${id}`),
  enableAdmin: ids =>
    patch(`user-service/user/v1/public/admin/admin-management/profile/list/is-enabled`, {
      headers: { "user-id": ids, "is-enabled": true },
    }),
  disableAdmin: ids =>
    patch(`user-service/user/v1/public/admin/admin-management/profile/list/is-enabled`, {
      headers: { "user-id": ids, "is-enabled": false },
    }),
  // Merchants
  // getAllMerchantUsers: async () => {
  //   await delay(2000);
  //   return new Promise(resolve => resolve(admins));
  // },
  getAllMerchantUsers: query =>
    get(`user-service/user/v1/public/admin/merchant-management/profile${getListQuery(query)}`),
  addMerchant: (body, params) => post(`user-service/user/v1/public/admin/merchant-management/profile`, body, params),
  getMerchantById: id => get(`user-service/user/v1/public/admin/merchant-management/profile/${id}`),
  enableMerchant: ids =>
    patch(`user-service/user/v1/public/admin/merchant-management/profile/list/is-enabled`, {
      headers: { "user-id": ids, "is-enabled": true },
    }),
  disableMerchant: ids =>
    patch(`user-service/user/v1/public/admin/merchant-management/profile/list/is-enabled`, {
      headers: { "user-id": ids, "is-enabled": false },
    }),
  updateMerchantById: (id, body, params) =>
    put(`user-service/user/v1/public/admin/merchant-management/profile`, body, params),
  changeMerchantRole: params => patch(`user-service/user/v1/public/admin/merchant-management/profile/role`, {}, params),
  deleteAllMerchant: ids => remove(`user-service/user/v1/public/admin/merchant-management/profile/list/${ids}`),
  deleteMerchant: id => remove(`user-service/user/v1/public/admin/merchant-management/profile/list/${id}`),
  verifyMerchant: userId =>
    patch(`user-service/user/v1/public/admin/merchant-management/profile/status`, {
      headers: { "user-id": userId, status: STATUS.VERIFIED },
    }),
};
export default UserService;
