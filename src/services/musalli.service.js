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
  getMusalliVolunteer: query => get(`api/role-admin/v1/volunteer`),
  getAllMosque: query => get(`api/role-admin/v1/mosque`),
  getMusalliSession: query => get(`api/public/v1/session/active`),
  getMusalliAttendanceChangeRequest: query =>
    get(`api/role-admin/v1/participant/participant-attendance-change/participant-attendance-change`),
};
export default musalliService;
