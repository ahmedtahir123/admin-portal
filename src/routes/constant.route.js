const ROUTES = {
  LOGIN: {
    path: "/login",
    title: "Login",
    name: "Login",
  },
  FORGOT_PASSWORD: {
    path: "/forgot-password",
    title: "Forgot Password",
    name: "ForgotPassword",
  },
  CHANGE_PASSWORD: {
    path: "/change-password",
    title: "Change Password",
    name: "ChangePassword",
  },
  BASE: {
    path: "/",
    title: "",
    name: "",
  },
  DASHBOARD: {
    path: "/home",
    title: "Home",
    name: "Home",
  },
  PROFILE: {
    path: "/profile",
    title: "Profile",
    name: "Profile",
  },

  ADMIN_MANAGEMENT: {
    path: "/admin-management",
    title: "Admin Management",
    name: "AdminManagement",
  },
  ADD_ADMIN_USER: {
    path: "/admin-management/add",
    title: "Add Admin User",
    name: "AddAdminUser",
  },
  EDIT_ADMIN_USER: {
    path: "/admin-management/edit",
    title: "Edit Admin User",
    name: "EditAdminUser",
  },

  MERCHANT_MANAGEMENT: {
    path: "/merchant-management",
    title: "Merchant Management",
    name: "MerchantManagement",
  },

  SESSION_MANAGEMENT: {
    path: "/session-management",
    title: "Session Management",
    name: "SessionManagement",
  },
  ADD_MERCHANT_USER: {
    path: "/merchant-management/add",
    title: "Add Merchant",
    name: "AddMerchant",
  },
  EDIT_MERCHANT_USER: {
    path: "/merchant-management/edit",
    title: "Edit Merchant",
    name: "EditMerchant",
  },
  MERCHANT_PROFILE: {
    path: "/merchant-profile",
    title: "Merchant Profile",
    name: "MerchantProfile",
  },

  CONSUMER_MANAGEMENT: {
    path: "/consumer-management",
    title: "Consumer Management",
    name: "ConsumerManagement",
  },
  ADD_CONSUMER_USER: {
    path: "/consumer-management/add",
    title: "Add Consumer",
    name: "AddConsumer",
  },
  EDIT_CONSUMER_USER: {
    path: "/consumer-management/edit",
    title: "Edit Consumer",
    name: "EditConsumer",
  },
  PARTNER_MANAGEMENT: {
    path: "/partner-management",
    title: "Outlet Management",
    name: "PartnerManagement",
  },
  ADD_PARTNER: {
    path: "/partner-management/add",
    title: "Add Outlet",
    name: "AddPartner",
  },
  EDIT_PARTNER: {
    path: "/partner-management/edit",
    title: "Edit Outlet",
    name: "EditPartner",
  },
  VIEW_PARTNER: {
    path: "/partner-management/view",
    title: "View Outlet",
    name: "ViewPartner",
  },
  PARTNER_PROFILE: {
    path: "/partner-profile",
    title: "Outlet Profile",
    name: "PartnerProfile",
  },
  AREA_SEGMENT_MANAGEMENT: {
    path: "/area-segment-management",
    title: "Area Segment Management",
    name: "AreaSegmentManagement",
  },
  ADD_AREA_SEGMENT: {
    path: "/area-segment-management/add",
    title: "Add Area Segment Management",
    name: "AddAreaSegmentManagement",
  },
  EDIT_AREA_SEGMENT: {
    path: "/area-segment-management/edit",
    title: "Edit Area Segment Management",
    name: "EditAreaSegmentManagement",
  },
  BRAND_MANAGEMENT: {
    path: "/brand-management",
    title: "Brand Management",
    name: "BrandManagement",
  },

  ADD_BRAND: {
    path: "/brand-management/add",
    title: "Add Brand",
    name: "AddBrand",
  },
  EDIT_BRAND: {
    path: "/brand-management/edit",
    title: "Edit Brand",
    name: "EditBrand",
  },

  CATEGORY_MANAGEMENT: {
    path: "/category-management",
    title: "Category Management",
    name: "CategoryManagement",
  },
  ADD_CATEGORY: {
    path: "/category-management/add",
    title: "Add Category",
    name: "AddDealCategory",
  },
  EDIT_CATEGORY: {
    path: "/category-management/edit",
    title: "Edit Category",
    name: "EditDealCategory",
  },

  DEAL_MANAGEMENT: {
    path: "/deal-management",
    title: "Deal Management",
    name: "DealManagement",
  },
  ADD_DEAL: {
    path: "/deal-management/add",
    title: "Add Deal",
    name: "AddDeal",
  },
  EDIT_DEAL: {
    path: "/deal-management/edit",
    title: "Edit Deal",
    name: "EditDeal",
  },

  BOOK_MANAGEMENT: {
    path: "/book-management",
    title: "Book Management",
    name: "BookManagement",
  },
  ADD_BOOK: {
    path: "/book-management/add",
    title: "Add Book",
    name: "AddBook",
  },
  EDIT_BOOK: {
    path: "/book-management/edit",
    title: "Edit Book",
    name: "EditBook",
  },
  CAMPAIGN_STATUS: {
    path: "/campaign-status-console",
    title: "Campaign Status Panel",
    name: "CampaignStatusConsole",
  },
  CAMPAIGN_STATUS_VIEW: {
    path: "/campaign-status-console/view",
    title: "Campaign Status Console View",
    name: "CampaignStatusConsoleView",
  },
  BOOK_PURCHASE_REQUESTS: {
    path: "/book-purchase-requests",
    title: "Book Purchase Requests",
    name: "BookPurchaseRequests",
  },

  DEAL_REDEEM_REPORTS: {
    path: "/deal-redeem-reports",
    title: "Deal Redeem Reports",
    name: "DealRedeemReports",
  },
  BOOK_PURCHASE_REPORT: {
    path: "/book-purchase-report",
    title: "Book Purchase Report",
    name: "BookPurchaseReport",
  },
  CAMPAIGN_REPORT: {
    path: "/campaign-report",
    title: "Campaign Report",
    name: "CampaignReport",
  },
  BOOK_ORDER_REPORT: {
    path: "/book-order-report",
    title: "Book Order Report",
    name: "BookOrderReport",
  },
  BOOK_ACTIVATION_REPORT: {
    path: "/book-activation-report",
    title: "Book Activation Report",
    name: "BookActivationReport",
  },
  VOUCHER_REDEMPTION_REPORT: {
    path: "/voucher-redemption-report",
    title: "Voucher Redemption Report",
    name: "VoucherRedemptionReport",
  },
  SALES_REPORT: {
    path: "/sales-report",
    title: "Sales Report",
    name: "SalesReport",
  },
  CONSUMER_REPORT: {
    path: "/consumer-report",
    title: "Consumer Report",
    name: "ConsumerReport",
  },
  USER_LOGIN_REPORT: {
    path: "/user-login-report",
    title: "User Login Report",
    name: "UserLoginReport",
  },

  // ALL_USERS: {
  //   path: "/all-users",
  //   title: "All Users",
  //   name: "AllUsers",
  // },
  CORPORATE_CUSTOMER_MANAGEMENT: {
    path: "/corporate-customer-management",
    title: "Corporate Customer Management",
    name: "CorporateCustomerManagement",
  },
  ADD_CORPORATE_CUSTOMER: {
    path: "/corporate-customer-management/add",
    title: "Add Corporate Customer",
    name: "AddCorporateCustomer",
  },
  EDIT_CORPORATE_CUSTOMER: {
    path: "/corporate-customer-management/edit",
    title: "Edit Corporate Customer",
    name: "EditCorporateCustomer",
  },
  BOOK_SUBSCRIPTION_MANAGEMENT: {
    path: "/book-subscription-management",
    title: "Corporate Book Subscriptions",
    name: "BookSubscriptionManagement",
  },
  ADD_BOOK_SUBSCRIPTION: {
    path: "/book-subscription-management/add",
    title: "Add Book Subscription",
    name: "AddBookSubscription",
  },
  EDIT_BOOK_SUBSCRIPTION: {
    path: "/book-subscription-management/edit",
    title: "Edit Book Subscription",
    name: "EditBookSubscription",
  },
  BOOK_ORDERS: {
    path: "/book-order-management",
    title: "Consumer Book Subscriptions",
    name: "BookOrderManagement",
  },
  NEW_REQUEST: {
    path: "/new-request/add",
    title: "New Request",
    name: "NewRequest",
  },
  EDIT_NEW_REQUEST: {
    path: "/new-request/edit",
    title: "Edit New Request",
    name: "EditNewRequest",
  },
  CAMPAIGN_DESIGNER: {
    path: "/campaign-designer",
    title: "Campaign Designer",
    name: "CampaignDesigner",
  },
  ADD_CAMPAIGN: {
    path: "/campaign-designer/add",
    title: "Add Campaign",
    name: "AddCampaign",
  },
  EDIT_CAMPAIGN: {
    path: "/campaign-designer/edit",
    title: "Edit Campaign",
    name: "EditCampaign",
  },
  LANDING_PAGE_MANAGEMENT: {
    path: "/landing-page-management",
    title: "Landing Page Management",
    name: "Landing Page Management",
  },
  SWIM_LANE_MANAGER: {
    path: "/swim-lane-manager",
    title: "Swim Lane Manager",
    name: "Swim Lane Manager",
  },
  ADD_PROFILER: {
    path: "/landing-page-management/add",
    title: "Add Profiler",
    name: "AddProfiler",
  },
  EDIT_PROFILER: {
    path: "/landing-page-management/edit",
    title: "Edit Profiler",
    name: "EditProfiler",
  },
  VOUCHER_REDEMPTION_MANAGEMENT: {
    path: "/voucher-redemption-management",
    title: "Voucher Redemption Management",
    name: "VoucherRedemptionManagement",
  },
  LANDING_PAGE_DESIGNER: {
    path: "/landing-designer",
    title: "Landing Page Designer",
    name: "LandingPageDesigner",
  },
  ADD_VOUCHER_REDEMPTION: {
    path: "/voucher-redemption-management/add",
    title: "Create Voucher Ticket",
    name: "AddVoucherRedemption",
  },
  MERCHANT_DASHBOARD: {
    path: "/merchant-home",
    title: "Home",
    name: "Home",
  },
  EDIT_VOUCHER_REDEMPTION: {
    path: "/voucher-redemption-management/edit",
    title: "Edit Voucher Ticket",
    name: "EditVoucherRedemption",
  },
  // Phase-1 Work
  OUTLET_BILLING_MANAGMENT: {
    path: "/outlet-billing-management",
    title: "Outlet Billing Management",
    name: "OutletBillingManagement",
  },
  ADD_ITEM: {
    path: "/restaurant-management/item/add",
    title: "Add Item",
    name: "AddItem",
  },
  EDIT_ITEM: {
    path: "/restaurant-management/item/edit",
    title: "Edit Item",
    name: "EditItem",
  },
};

export default ROUTES;
