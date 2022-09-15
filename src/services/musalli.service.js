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

const musalliService = {
  getAllParticipantUsers: query => get(`api/role-admin/v1/participant`),
  getAllParticipantsByMosqueAndSession: query => get(`api/role-admin/v1/participant/mosque/${query}`),
  getMusalliVolunteer: query => get(`api/role-admin/v1/volunteer`),
  getVolunteerByMosqueAndSession: query => get(`api/role-admin/v1/volunteer/mosque/${query}`),
  getAllMosque: query => get(`api/role-admin/v1/mosque`),
  getMusalliSession: query => get(`api/public/v1/session/active`),
  getMusalliAttendanceChangeRequest: query =>
    get(`api/role-admin/v1/participant/participant-attendance-change/participant-attendance-change`),
  getMusalliPayment: query => get(`api/role-admin/v1/payment-request/session/${query?.sessionId}`),
  getMusalliAttendanceCountReport: query =>
    get(`api/role-admin/v1/session/attendance-count/report/1?attendance-date=${query}`),
  getAllActiveMosqueBySession: query => get(`api/public/v1/mosque/session/${query}`),
  getAttendanceDetailReport: query => get(`api/role-admin/v1/session/attendance-detail/report/1?mosque-id=${query}`),
  getMusalliAttendanceBulk: query => get(`api/role-admin/v1/participant/mosque/${query}`),
  musalliGetAllActiveSession: query => get(`api/public/v1/session/active`),

  // Post Requests
  postSmsUtility: body => post(`api/role-admin/v1/session/send-message`, body),
};
export default musalliService;
//

// getMusalliPayment
