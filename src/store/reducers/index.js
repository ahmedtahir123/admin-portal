import ACTIONS from "../actions/types.actions";
import appInitialState from "../app-state/app-initial.state";

import ui from "./ui.reducer";

import user from "./user.reducer";
import admin from "./admin.reducer";
import merchant from "./merchant.reducer";
import session from "./session.reducer";

import consumer from "./consumer.reducer";
import deals from "./deals.reducer";
import areaSegment from "./areaSegment.reducer";
import dealCategory from "./dealCategory.reducer";
import corporateCustomer from "./corporateCustomer.reducer";
import bookSubscription from "./bookSubscription.reducer";
import changePartner from "./changePartner.reducer";
import brand from "./brand.reducer";
import book from "./book.reducer";
import partner from "./partner.reducer";
import bookOrder from "./bookOrder.reducer";
import campaignStatus from "./dealCampaignStatus.reducer";
import profiler from "./landingPageManagement.reducer";
import campaign from "./campaign.reducer";
import voucherRedemption from "./voucherRedemption.reducer";
import designer from "./landingPageDesigner.reducer";
import bookPurchaseReport from "./reports.reducer";
import billingPlan from "./billingPlan.reducer";
import merchantDashboard from "./merchantDashboard.reducer";
import musalliparticipant from "./participant.reducer";
import musalliParticipantsByMosqueAndSession from "./participantsByMosqueAndSession.reducer";
import musalliVolunteerByMosqueAndSession from "./volunteerByMosqueAndSession.reducer";
import musallivolunteer from "./volunteer.reducer";
import mosque from "./mosque.reducer";
import musalliAttendanceDetailReport from "./musalli_attendance_detail_report.reducer";
import activeMosqueBySession from "./activeMosqueBySession.reducer";
import musalliGetAllActiveSession from "./musalliAllActiveSession.reducer";
import smsUtility from "./smsUtility.reducer";
import musalliSession from "./musalli_session.reducer";
import musalliAttendanceBulk from "./musalliAttendanceBulk.reducer";

export default function reducer(state = appInitialState, action) {
  if (action.type === ACTIONS.APP_RESET) {
    return appInitialState;
  }
  return {
    user: user(state.user, action),
    admin: admin(state.admin, action),
    deals: deals(state.deals, action),
    merchant: merchant(state.merchant, action),
    session: session(state.session, action),
    ui: ui(state.ui, action),
    consumer: consumer(state.consumer, action),
    areaSegment: areaSegment(state.areaSegment, action),
    dealCategory: dealCategory(state.dealCategory, action),
    corporateCustomer: corporateCustomer(state.corporateCustomer, action),
    bookSubscription: bookSubscription(state.bookSubscription, action),
    changePartner: changePartner(state.changePartner, action),
    brand: brand(state.brand, action),
    book: book(state.book, action),
    partner: partner(state.partner, action),
    bookOrder: bookOrder(state.bookOrder, action),
    campaignStatus: campaignStatus(state.campaignStatus, action),
    profiler: profiler(state.profiler, action),
    campaign: campaign(state.campaign, action),
    voucherRedemption: voucherRedemption(state.voucherRedemption, action),
    designer: designer(state.designer, action),
    bookPurchaseReport: bookPurchaseReport(state.bookPurchaseReport, action),
    billingPlan: billingPlan(state.billingPlan, action),
    merchantDashboard: merchantDashboard(state.merchantDashboard, action),
    volunteer: musallivolunteer(state.volunteer, action),
    participant: musalliparticipant(state.participant, action),
    mosque: mosque(state.mosque, action),
    participantsByMosqueAndSession: musalliParticipantsByMosqueAndSession(state.participantsByMosqueAndSession, action),
    volunteerByMosqueAndSession: musalliVolunteerByMosqueAndSession(state.participantsByMosqueAndSession, action),
    musalliAttendanceDetailReport: musalliAttendanceDetailReport(state.musalliAttendanceDetailReport, action),
    activeMosqueBySession: activeMosqueBySession(state.activeMosqueBySession, action),
    musalliGetAllActiveSession: musalliGetAllActiveSession(state.musalliGetAllActiveSession, action),
    smsUtility: smsUtility(state.smsUtility, action),
    musalliSession: musalliSession(state.musalliSession, action),
    musalliAttendanceBulk: musalliAttendanceBulk(state.musalliAttendanceBulk, action),
  };
}
