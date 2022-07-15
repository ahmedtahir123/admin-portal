import { get, put, post, remove } from "./http.service";
import { delay } from "../utils/utils";
import { campaignStatusConsole } from "../__mocks__/campaignStatusConsole";

const campaignStatusConsoleService = {
  enableCampaignList: id => new Promise(resolve => resolve({})),
  disableCampaignList: id => new Promise(resolve => resolve({})),
  addCampaignStatus: body => new Promise(resolve => resolve({})),
  getCampaignStatusById: id =>
    new Promise(resolve => resolve(campaignStatusConsole.content.find(user => user.campaignId === parseInt(id, 10)))),
  updateCampaignStatusById: (id, campaignStatusInfo) => new Promise(resolve => resolve({})),
  deleteAllCampaignStatus: id => new Promise(resolve => resolve({})),
  getCampaignStatussList: async query => {
    await delay(2000);
    return new Promise(resolve => resolve(campaignStatusConsole));
  },
};
export default campaignStatusConsoleService;
