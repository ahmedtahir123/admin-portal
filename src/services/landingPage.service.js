import { get, put, post, remove, patch } from "./http.service";
import { getListQuery } from "../utils/utils";

const profilerService = {
  addProfiler: body => post(`landing-page-profile/v1/public/admin/lpp/layout`, body),
  getProfilerById: id => get(`landing-page-profile/v1/public/admin/lpp/layout/${id}`),
  updateProfilerById: (id, info) => put(`landing-page-profile/v1/public/admin/lpp/layout/${id}`, info),
  deleteAllProfiler: id => remove(`landing-page-profile/v1/public/admin/lpp/layout/${id}`),
  getSwimlaneById: id => get(`landing-page-profile/v1/public/admin/lpp/swimlane/${id}`),
  startProfiler: id => patch(`landing-page-profile/v1/public/admin/lpp/layout/deploy/${id}`),
  getProfilerList: query => get(`landing-page-profile/v1/public/admin/lpp/layout/all${getListQuery(query)}`),
  addSwimLane: body => post(`landing-page-profile/v1/public/admin/lpp/swimlane`, body),
  updateSwimLane: (id, body) => put(`landing-page-profile/v1/public/admin/lpp/swimlane/${id}`, body),
};
export default profilerService;
