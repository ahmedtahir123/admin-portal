import { get, put, post, remove } from "./http.service";
import { delay } from "../utils/utils";
import { campaign } from "../__mocks__/campaign";

const CampaignService = {
  addCampaign: body => post(`campaign-service/1.0.0/v1/admin/campaigns`, body),
  // getCampaignById: id => get(`campaign-service/1.0.0/v1/admin/campaigns/${id}`),
  getCampaignById: id =>
    new Promise(resolve => resolve(campaign.content.find(item => item.campaignId.toString() === id))),
  updateCampaignById: (id, body) => put(`campaign-service/1.0.0/v1/admin/campaigns/${id}`, body),
  deleteCampaign: ids => remove(`campaign-service/1.0.0/v1/admin/campaigns?codes=${ids}`),
  enableCampaign: ids => put(`campaign-service/1.0/v1/admin/campaigns?codes=${ids}&enabled=true&username=admin`),
  disableCampaign: ids => put(`campaign-service/1.0/v1/admin/campaigns?codes=${ids}&enabled=false&username=admin`),
  getCampaignList: async query => {
    await delay(2000);
    return new Promise(resolve => resolve(campaign));
  },
};
export default CampaignService;
