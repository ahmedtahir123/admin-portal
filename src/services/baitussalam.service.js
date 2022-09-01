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

const baitussalamServices = {
  getAllProjects: () => get(`api/public/v1/project-details`),
  getBayanatCategory: () => get(`api/public/v1/bayanat/categories?lastUpdatedAt=2000-08-26T13%3A39%3A23.295Z`),
  getPublicationCategory: () => get(`api/public/v1/publications/categories?lastUpdatedAt=2000-08-26T14%3A55%3A23.911Z`),
  getDuasCategory: () => get(`api/public/v1/dua/categories?lastUpdatedAt=2000-08-26T15%3A16%3A54.372Z`),
  getDuas: () => get(`api/public/v1/dua`),
  getFeaturedVideos: () => get(`api/public/v1/featured-videos`),
  getAllNews: () => get(`api/public/v1/news/latest`),
  getDonationCategories: () => get(`api/public/v1/donation-categories`),
  getHijriDates: () => get(`api/private/role-admin/v1/hijri/date`),
  getOnlineCharity: () => get(`api/private/role-admin/v1/donations`),
  getBaitussalamVolunteers: () => get(`api/private/role-admin/v1/volunteer`),
  getCustomer: () => get(`api/private/role-admin/v1/customer`),
};
export default baitussalamServices;
