export const permissions = {
  Home_View: true,
  Profile_View: true,
  ChangePassword_View: true,

  // USER MANAGEMENT
  UserManagement_View: true,
  // UserManagement_Session_List: true,
  // UserManagement_Session_EditStatus: true,

  UserManagement_Admin_Add: true,
  UserManagement_Admin_Delete: true,
  UserManagement_Admin_Edit: true,
  UserManagement_Admin_EditStatus: true,
  UserManagement_Admin_List: true,

  UserManagement_Consumer_Add: true,
  UserManagement_Consumer_Edit: true,
  UserManagement_Consumer_List: true,
  UserManagement_Consumer_EditStatus: true,
  UserManagement_Consumer_Delete: true,

  UserManagement_Merchant_Add: true,
  UserManagement_Merchant_Delete: true,
  UserManagement_Merchant_Edit: true,
  UserManagement_Merchant_List: true,
  UserManagement_Merchant_ViewEnableDisable: true,
  UserManagement_Merchant_EditStatus: true,
  UserManagement_Merchant_EditDelete: true,
  UserManagement_Merchant_EditCancel: true,
  UserManagement_Merchant_EditPartner: true,
  UserManagement_Merchant_EditMerchantRole: true,
  UserManagement_Merchant_EditPermission: true,

  LandingManagement_View: true,
  LandingManagement_Profiler_List: true,
  LandingManagement_Profiler_Add: true,
  LandingManagement_Profiler_Edit: true,
  LandingManagement_Profiler_Delete: true,
  LandingManagement_Designer_Edit: true,

  // PARTNER MANAGEMENT
  PartnerManagement_View: true,
  PartnerManagement_Partner_List: true,
  PartnerManagement_Partner_Add: true,
  PartnerManagement_Partner_Edit: true,
  PartnerManagement_Partner_View: true,
  PartnerManagement_Partner_Delete: true,
  PartnerManagement_Partner_EditStatus: true,
  PartnerManagement_Partner_EditBrand: true,
  PartnerManagement_Partner_EditAreaSegment: true,
  PartnerManagement_Partner_ViewBillingPlan: true,
  PartnerManagement_Partner_EditBillingPlan: true,
  PartnerManagement_Partner_ApproveContract: true,
  PartnerManagement_Partner_ApprovePartner: true,
  PartnerManagement_Partner_EditDelete: true,
  PartnerManagement_Partner_EditCancel: true,

  PartnerManagement_AreaSegment_Add: true,
  PartnerManagement_AreaSegment_Delete: true,
  PartnerManagement_AreaSegment_Edit: true,
  PartnerManagement_AreaSegment_List: true,
  PartnerManagement_AreaSegment_EditStatus: true,

  PartnerManagement_Brand_Add: true,
  PartnerManagement_Brand_Delete: true,
  PartnerManagement_Brand_Edit: true,
  PartnerManagement_Brand_List: true,
  PartnerManagement_Brand_EditStatus: true,

  // Phase-1 Work
  PartnerManagement_OutletBillingManagement_List: false,

  // Voucher MANAGEMENT
  VoucherManagement_View: true,

  VoucherManagement_Voucher_Add: true,
  VoucherManagement_Voucher_Delete: true,
  VoucherManagement_Voucher_Edit: true,
  VoucherManagement_Voucher_List: true,
  VoucherManagement_Voucher_EditStatus: true,

  VoucherManagement_Book_Add: true,
  VoucherManagement_Book_Delete: true,
  VoucherManagement_Book_Edit: true,
  VoucherManagement_Book_List: true,
  VoucherManagement_Book_EditStatus: true,

  VoucherManagement_Category_Add: true,
  VoucherManagement_Category_Delete: true,
  VoucherManagement_Category_Edit: true,
  VoucherManagement_Category_List: true,
  VoucherManagement_Category_EditStatus: true,

  // Promotions Management
  PromotionManagement_View: true,
  PromotionManagement_CampaignStatus_List: true,
  PromotionManagement_CampaignStatus_View: true,
  PromotionManagement_CampaignDesigner_List: true,
  PromotionManagement_CampaignDesigner_Add: true,
  PromotionManagement_CampaignDesigner_Edit: true,
  PromotionManagement_CampaignDesigner_Delete: true,
  PromotionManagement_CampaignDesigner_EditStatus: true,

  // REPORTS
  ReportsManagement_View: true,
  ReportsManagement_BookOrderReport_List: true,
  ReportsManagement_VoucherRedemptionReport_List: true,
  ReportsManagement_SalesReport_List: true,
  ReportsManagement_ConsumerReports_List: true,
  ReportsManagement_UserLoginReport_List: true,
  ReportsManagement_BookActivationReport_List: true,

  // BOOK SUBSCRIPTION MANAGEMENT
  BookSubscriptionManagement_View: true,
  BookSubscriptionManagement_BookOrderManagement_List: true,
  BookSubscriptionManagement_BookOrderManagement_Add: true,
  BookSubscriptionManagement_BookOrderManagement_Edit: true,
  BookSubscriptionManagement_BookOrderManagement_EditStatus: true,
  BookSubscriptionManagement_BookOrderManagement_Delete: true,

  BookSubscriptionManagement_CorporateCustomer_List: true,
  BookSubscriptionManagement_CorporateCustomer_Add: true,
  BookSubscriptionManagement_CorporateCustomer_Edit: true,
  BookSubscriptionManagement_CorporateCustomer_EditStatus: true,
  BookSubscriptionManagement_CorporateCustomer_Delete: true,

  BookSubscriptionManagement_BookSubscription_List: true,
  BookSubscriptionManagement_BookSubscription_Add: true,
  BookSubscriptionManagement_BookSubscription_Edit: true,
  BookSubscriptionManagement_BookSubscription_EditStatus: true,
  BookSubscriptionManagement_BookSubscription_Delete: true,

  // ConsumerLandingPageManagement_View: true,
  // ConsumerLandingPageManagement_LanadingPageManagement_List: true,

  // // VOUCHER REDEMPTION MANAGEMENT
  // VoucherRedemptionManagement_View: true,
  // VoucherRedemptionManagement_VoucherRedemption_List: true,
  // VoucherRedemptionManagement_VoucherRedemption_Add: true,
  // VoucherRedemptionManagement_VoucherRedemption_Edit: true,

  // DEMO
  // UserManagement_Consumer_Edit_nested_functionality: true,
  // DealManagement_Category_Edit_nested_functionality: true,

  // TEMP
  RestaurantManagement_Item_Add: true,
  RestaurantManagement_Item_Edit: true,
};

export const merchantPermission = {
  Home_View: true,

  // Phase-1 work | change permission to true to enable  Merchant dashboard
  MerchantHome_View: false,
  Profile_View: true,
  ChangePassword_View: true,

  UserManagement_Merchant_Profile: true,

  UserManagement_Merchant_Add: true,
  UserManagement_Merchant_Delete: false,
  UserManagement_Merchant_Edit: true,
  UserManagement_Merchant_List: false,
  UserManagement_Merchant_ViewEnableDisable: false,
  UserManagement_Merchant_EditStatus: false,
  UserManagement_Merchant_EditDelete: false,
  UserManagement_Merchant_EditCancel: false,
  UserManagement_Merchant_EditPartner: false,
  UserManagement_Merchant_EditMerchantRole: false,
  UserManagement_Merchant_EditPermission: false,

  PartnerManagement_Partner_Profile: true,
  // PartnerManagement_Partner_ApproveContract: true,
  // PartnerManagement_Partner_ApprovePartner: true,

  // PARTNER MANAGEMENT
  PartnerManagement_View: false,
  PartnerManagement_Partner_List: false,
  PartnerManagement_Partner_Add: false,
  PartnerManagement_Partner_Edit: true,
  PartnerManagement_Partner_View: true,
  PartnerManagement_Partner_Delete: false,
  PartnerManagement_Partner_EditStatus: false,
  PartnerManagement_Partner_EditBrand: false,
  PartnerManagement_Partner_EditAreaSegment: false,
  PartnerManagement_Partner_ViewBillingPlan: true,
  PartnerManagement_Partner_EditBillingPlan: false,
  PartnerManagement_Partner_ApproveContract: true,
  PartnerManagement_Partner_ApprovePartner: false,
  PartnerManagement_Partner_EditDelete: false,
  PartnerManagement_Partner_EditCancel: false,

  // VOUCHER REDEMPTION MANAGEMENT
  VoucherRedemptionManagement_View: true,
  VoucherRedemptionManagement_VoucherRedemption_List: true,
  VoucherRedemptionManagement_VoucherRedemption_Add: true,
  VoucherRedemptionManagement_VoucherRedemption_Edit: true,
};

export const merchantAssociatePermission = {
  Home_View: true,

  // Phase-1 work | change permission to true to enable  Merchant dashboard
  MerchantHome_View: false,
  Profile_View: true,
  ChangePassword_View: true,

  UserManagement_Merchant_Profile: true,

  UserManagement_Merchant_Add: false,
  UserManagement_Merchant_Delete: false,
  UserManagement_Merchant_Edit: true,
  UserManagement_Merchant_List: false,
  UserManagement_Merchant_ViewEnableDisable: false,
  UserManagement_Merchant_EditStatus: false,
  UserManagement_Merchant_EditDelete: false,
  UserManagement_Merchant_EditCancel: false,
  UserManagement_Merchant_EditPartner: false,
  UserManagement_Merchant_EditMerchantRole: false,

  PartnerManagement_Partner_Profile: true,
  // PartnerManagement_Partner_ApproveContract: true,
  // PartnerManagement_Partner_ApprovePartner: true,

  // PARTNER MANAGEMENT
  PartnerManagement_View: false,
  PartnerManagement_Partner_List: false,
  PartnerManagement_Partner_Add: false,
  PartnerManagement_Partner_Edit: false,
  PartnerManagement_Partner_View: true,
  PartnerManagement_Partner_Delete: false,
  PartnerManagement_Partner_EditStatus: false,
  PartnerManagement_Partner_EditBrand: false,
  PartnerManagement_Partner_EditAreaSegment: false,
  PartnerManagement_Partner_ViewBillingPlan: true,
  PartnerManagement_Partner_EditBillingPlan: false,
  PartnerManagement_Partner_ApproveContract: false,
  PartnerManagement_Partner_ApprovePartner: false,
  PartnerManagement_Partner_EditDelete: false,
  PartnerManagement_Partner_EditCancel: false,

  // VOUCHER REDEMPTION MANAGEMENT
  VoucherRedemptionManagement_View: true,
  VoucherRedemptionManagement_VoucherRedemption_List: true,
  VoucherRedemptionManagement_VoucherRedemption_Add: true,
  VoucherRedemptionManagement_VoucherRedemption_Edit: true,
};
