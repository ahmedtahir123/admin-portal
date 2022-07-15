import { get, post, remove, patch, put } from "./http.service";
import { allConsumers } from "../__mocks__/allConsumers";
import { delay, getListQuery } from "../utils/utils";

const ConsumerService = {
  getAllConsumers: query => get(`user-service/user/v1/public/admin/consumer-management/profile${getListQuery(query)}`),
  addConsumer: body => post(`user-service/user/v1/public/admin/consumer-management/profile`, body),
  updateConsumer: (id, body) => put(`user-service/user/v1/public/admin/consumer-management/profile`, body),
  getConsumerById: id => get(`user-service/user/v1/public/admin/consumer-management/profile/${id}`),
  deleteAllConsumers: ids => remove(`user-service/user/v1/public/admin/consumer-management/profile/list/${ids}`),
  enableConsumers: ids =>
    patch(`user-service/user/v1/public/admin/consumer-management/profile/list/is-enabled`, {
      headers: { "user-id": ids, "is-enabled": true },
    }),
  disableConsumers: ids =>
    patch(`user-service/user/v1/public/admin/consumer-management/profile/list/is-enabled`, {
      headers: { "user-id": ids, "is-enabled": false },
    }),
  deleteConsumer: id => remove(`user-service/user/v1/public/admin/consumer-management/profile/${id}`),
  // getAllConsumers: async () => {
  //   await delay(2000);
  //   return new Promise(resolve => resolve(allConsumers));
  // },
  // getConsumerById: id =>
  //   new Promise(resolve => resolve(allConsumers.content.find(user => user.id === parseInt(id, 10)))),
  // deleteAllConsumers: data => new Promise(resolve => resolve({})),
};
export default ConsumerService;
