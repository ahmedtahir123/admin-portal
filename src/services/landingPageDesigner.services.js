import { get, put, post, remove } from "./http.service";
import { delay } from "../utils/utils";
import { designer } from "../__mocks__/landingDesigner";

const DesignerService = {
  addDesigner: body => new Promise(resolve => resolve({})),
  updateDesigner: (id, body) => put(`landing-page-profile/v1/public/admin/lpp/layout/${id}`, body),
  getDesigner: async query => {
    await delay(2000);
    return new Promise(resolve => resolve(designer));
  },
};
export default DesignerService;
