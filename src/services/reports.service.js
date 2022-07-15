import { getListQuery } from "../utils/utils";
import { get } from "./http.service";

const ReportsService = {
  getReport: (url, query) => get(`${url}${getListQuery(query)}`),
  downloadCSV: async (url, query) =>
    get(`${url}/export${getListQuery(query)}`, {
      responseType: "blob",
    }),
};
export default ReportsService;
