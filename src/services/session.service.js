// import { get, put, post, remove } from "./http.service";
import { delay, resolveQuery } from "../utils/utils";
import { sessionUsers } from "../__mocks__/sessionManagment";

const SessionService = {
  // revokeAllSessionUsers: id => remove(`corporate-customer-service/1.0.0/v1/admin/deals/${id}`),
  getAllSessionUsers: async query => {
    await delay(2000);
    return new Promise(resolve => resolve(resolveQuery(query, sessionUsers.content, sessionUsers)));
    // return new Promise(resolve => resolve(sessionUsers));
  },
};

export default SessionService;
