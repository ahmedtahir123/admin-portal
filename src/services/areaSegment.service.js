import { get, put, post, remove, patch } from "./http.service";
import { delay, getListQuery } from "../utils/utils";
import { areaSegment } from "../__mocks__/areaSegment";

const AreaSegmentService = {
  addAreaSegment: body => post(`partner/v1/public/admin/areasegments`, body),
  enableSegmentCategories: ids => patch(`partner/v1/public/admin/areasegments?codes=${ids}&enabled=true`),
  disableSegmentCategories: ids => patch(`partner/v1/public/admin/areasegments?codes=${ids}&enabled=false`),
  updateSegmentById: (id, body) => put(`partner/v1/public/admin/areasegments/${id}`, body),
  deleteAllSegments: codes => remove(`partner/v1/public/admin/areasegments?codes=${codes}`),
  getSegmentById: id => get(`partner/v1/public/admin/areasegments/${id}`),
  getStateById: id => get(`partner/v1/public/admin/areasegments/states/${id}`),
  getSegmentsList: query => get(`partner/v1/public/admin/areasegments${getListQuery(query)}`),
  deleteAreaById: code => remove(`partner/v1/public/admin/areasegments/${code}`),
  getState: () => get(`common/v1/public/admin/states`),
  getCities: state => get(`common/v1/public/admin/cities?stateCode=${state}`),
  getCity: () => get("common/v1/public/admin/cities"),
  // getSegmentsList: async query => {
  //   await delay(2000);
  //   return new Promise(resolve => resolve(areaSegment));
  // },
};

export default AreaSegmentService;
