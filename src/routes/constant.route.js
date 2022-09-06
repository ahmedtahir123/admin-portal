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

  // Iammusalli Routes
  MUSALLI_ADMIN_MANAGEMENT: {
    path: "/musalli-admin-management",
    title: "Musalli Management",
    name: "MusalliManagement",
  },
  ADD_MUSALLI_ADMIN_USER: {
    path: "/musalli-admin-management/add",
    title: "Add Musalli User",
    name: "AddMusalliUser",
  },
  EDIT_MUSALLI_ADMIN_USER: {
    path: "/musalli-management/edit",
    title: "Edit Musalli User",
    name: "EditMusalli-User",
  },

  MUSALLI_PARTICIPANT_MANAGEMENT: {
    path: "/musalli-participant-management",
    title: "Participant Management",
    name: "ParticipantManagement",
  },
  ADD_MUSALLI_PARTICIPANT_USER: {
    path: "/musalli-participant-management/add",
    title: "Add Musalli Participant User",
    name: "AddMusalliParticipantUser",
  },
  EDIT_MUSALLI_PARTICIPANT_USER: {
    path: "/musalli-participant-management/edit",
    title: "Edit Musalli-Participant User",
    name: "EditMusalliParticipant-User",
  },

  MUSALLI_VOLUNTEER_MANAGEMENT: {
    path: "/musalli-volunteer-management",
    title: "volunteer Management",
    name: "volunteerManagement",
  },
  ADD_MUSALLI_VOLUNTEER_USER: {
    path: "/musalli-volunteer-management/add",
    title: "Add Musalli Volunteer User",
    name: "AddMusalliVolunteerUser",
  },
  EDIT_MUSALLI_VOLUNTEER_USER: {
    path: "/musalli-volunteer-management/edit",
    title: "Edit Musalli-Volunteer User",
    name: "EditMusalliVolunteer-User",
  },

  MUSALLI_MOSQUE_MANAGEMENT: {
    path: "/musalli-mosque-management",
    title: "Mosque Management",
    name: "MosqueManagement",
  },
  ADD_MUSALLI_MOSQUE_USER: {
    path: "/musalli-mosque-management/add",
    title: "Add Musalli Mosque ",
    name: "AddMusalliMosque",
  },
  EDIT_MUSALLI_MOSQUE_USER: {
    path: "/musalli-mosque-management/edit",
    title: "Edit Musalli-Mosque ",
    name: "EditMusalli-Mosque",
  },

  MUSALLI_SESSION_MANAGEMENT: {
    path: "/musalli-session-management",
    title: "Session Management",
    name: "SessionManagement",
  },
  ADD_MUSALLI_SESSION_USER: {
    path: "/musalli-session-management/add",
    title: "Add Musalli Session",
    name: "AddMusalliSession",
  },

  EDIT_MUSALLI_SESSION_USER: {
    path: "/musalli-session-management/edit",
    title: "Edit Musalli Session",
    name: "EditMusalli-Session",
  },

  MUSALLI_PAYMENT_MANAGEMENT: {
    path: "/musalli-payment-management",
    title: "Payment Management",
    name: "PaymentManagement",
  },
  ADD_MUSALLI_PAYMENT_USER: {
    path: "/musalli-payment-management/add",
    title: "Add Musalli Payment",
    name: "AddMusalliUser",
  },
  EDIT_MUSALLI_PAYMENT_USER: {
    path: "/musalli-payment-management/edit",
    title: "Edit Musalli Payment",
    name: "EditMusalli-Payment",
  },

  MUSALLI_ATTENDANCE_CHANGE_REQUEST: {
    path: "/musalli-attendance-change-request",
    title: "Attendance Change Request",
    name: "attendanceChangeRequest",
  },

  MUSALLI_ATTENDANCE_DETAIL_REPORT: {
    path: "/musalli-attendance-detail-report",
    title: "Attendance Detail Report",
    name: "attendanceDetailReport",
  },

  MUSALLI_ATTENDANCE_COUNT_REPORT: {
    path: "/musalli-attendance-count-report",
    title: "Attendance Count Report",
    name: "attendanceCountReport",
  },

  MUSALLI_ATTENDANCE_BULK: {
    path: "/musalli-attendance-bulk",
    title: "Attendance Bulk",
    name: "attendanceBulk",
  },

  SMS_UTILITY: {
    path: "/musalli-sms-utility",
    title: "SMS Utility",
    name: "smsUtility",
  },

  // Baitussalam Web & App Routes

  BAITUSSALAM_WEB_AND_APP_PROJECT_MANAGEMENT: {
    path: "/baitussalam-web-and-app-project-management",
    title: "Project Management",
    name: "ProjectManagement",
  },
  ADD_BAITUSSALAM_WEB_AND_APP_PROJECT: {
    path: "/baitussalam-web-and-app-project-management/add",
    title: "Add Baitussalam Web & App Project",
    name: "AddBaitussalamWebAndAppProject",
  },
  EDIT_BAITUSSALAM_WEB_AND_APP_PROJECT: {
    path: "/baitussalam-web-and-app-project-management/edit",
    title: "Edit Baitussalam Web & App Project",
    name: "EditBaitussalamWebAndApp-Project",
  },

  BAITUSSALAM_WEB_AND_APP_EVENTS_MANAGEMENT: {
    path: "/baitussalam-web-and-app-events-management",
    title: "Events Management",
    name: "EventstManagement",
  },
  ADD_BAITUSSALAM_WEB_AND_APP_EVENTS: {
    path: "/baitussalam-web-and-app-events-management/add",
    title: "Add Baitussalam Web & App Events",
    name: "AddBaitussalamWebAndAppEvents",
  },
  EDIT_BAITUSSALAM_WEB_AND_APP_EVENTS: {
    path: "/baitussalam-web-and-app-events-management/edit",
    title: "Edit Baitussalam Web & App Events",
    name: "EditBaitussalamWebAndApp-Events",
  },

  BAITUSSALAM_WEB_AND_APP_NAAT_COMPETITION_USER_MANAGEMENT: {
    path: "/baitussalam-web-and-app-naat-competition-user-management",
    title: "Naat Competition User Management",
    name: "NaatCompetitionUserManagement",
  },
  EDIT_BAITUSSALAM_WEB_AND_APP_NAAT_COMPETITION_USER: {
    path: "/baitussalam-web-and-app-naat-competition-user-management/edit",
    title: "Edit Baitussalam Web & App Naat Competition User",
    name: "EditBaitussalamWebAndApp-Naat Competition User",
  },

  BAITUSSALAM_WEB_AND_APP_GALLERIES_MANAGEMENT: {
    path: "/baitussalam-web-and-app-galleries-management",
    title: "Galleries Management",
    name: "GalleriesManagement",
  },
  ADD_BAITUSSALAM_WEB_AND_APP_GALLERIES: {
    path: "/baitussalam-web-and-app-galleries-management/add",
    title: "Add Baitussalam Web & App News",
    name: "AddBaitussalamWebAndAppNews",
  },
  EDIT_BAITUSSALAM_WEB_AND_APP_GALLERIES: {
    path: "/baitussalam-web-and-app-news-management/edit",
    title: "Edit Baitussalam Web & App Galleries",
    name: "GalleriesBaitussalamWebAndApp-News",
  },

  BAITUSSALAM_WEB_AND_APP_NEWS_MANAGEMENT: {
    path: "/baitussalam-web-and-app-news-management",
    title: "News Management",
    name: "NewsManagement",
  },
  ADD_BAITUSSALAM_WEB_AND_APP_NEWS: {
    path: "/baitussalam-web-and-app-news-management/add",
    title: "Add Baitussalam Web & App News",
    name: "AddBaitussalamWebAndAppNews",
  },
  EDIT_BAITUSSALAM_WEB_AND_APP_NEWS: {
    path: "/baitussalam-web-and-app-news-management/edit",
    title: "Edit Baitussalam Web & App News",
    name: "EditBaitussalamWebAndApp-News",
  },

  BAITUSSALAM_WEB_AND_APP_BAYANAT_CATEGORY_MANAGEMENT: {
    path: "/baitussalam-web-and-app-bayanat-category-management",
    title: "Bayanat Category Management",
    name: "Bayanat Category Management",
  },
  ADD_BAITUSSALAM_WEB_AND_APP_BAYANAT_CATEGORY: {
    path: "/baitussalam-web-and-app-bayanat-category-management/add",
    title: "Add Baitussalam Web & App Bayanat Category",
    name: "AddBaitussalamWebAndAppBayanatCategory",
  },
  EDIT_BAITUSSALAM_WEB_AND_APP_BAYANAT_CATEGORY: {
    path: "/baitussalam-web-and-app-bayanat-category-management/edit",
    title: "Edit Baitussalam Web & App Bayanat Category",
    name: "EditBaitussalamWebAndApp-Bayanat Category",
  },

  BAITUSSALAM_WEB_AND_APP_BAYANATS_MANAGEMENT: {
    path: "/baitussalam-web-and-app-bayanats-management",
    title: "Bayanats Management",
    name: "BayanatsManagement",
  },
  ADD_BAITUSSALAM_WEB_AND_APP_BAYANATS: {
    path: "/baitussalam-web-and-app-bayanats-management/add",
    title: "Add Baitussalam Web & App Bayanats",
    name: "AddBaitussalamWebAndAppBayanats",
  },
  EDIT_BAITUSSALAM_WEB_AND_APP_BAYANATS: {
    path: "/baitussalam-web-and-app-bayanats-management/edit",
    title: "Edit Baitussalam Web & App Bayanats",
    name: "EditBaitussalamWebAndApp-Bayanats",
  },

  BAITUSSALAM_WEB_AND_APP_PUBLICATION_CATEGORY_MANAGEMENT: {
    path: "/baitussalam-web-and-app-publication_category-management",
    title: "Publication Category Management",
    name: "PublicationCategoryanagement",
  },
  ADD_BAITUSSALAM_WEB_AND_APP_PUBLICATION_CATEGORY: {
    path: "/baitussalam-web-and-app-publication_category-management/add",
    title: "Add Baitussalam Web & App Publication Category",
    name: "AddBaitussalamWebAndAppPublication Category",
  },
  EDIT_BAITUSSALAM_WEB_AND_APP_PUBLICATION_CATEGORY: {
    path: "/baitussalam-web-and-app-publication_category-management/edit",
    title: "Edit Baitussalam Web & App Publication Category",
    name: "EditBaitussalamWebAndApp-Publication Category",
  },

  BAITUSSALAM_WEB_AND_APP_PUBLICATIONS_MANAGEMENT: {
    path: "/baitussalam-web-and-app-publications-management",
    title: "Publications Management",
    name: "PublicationsManagement",
  },
  ADD_BAITUSSALAM_WEB_AND_APP_PUBLICATIONS: {
    path: "/baitussalam-web-and-app-publications-management/add",
    title: "Add Baitussalam Web & App Publications",
    name: "AddBaitussalamWebAndAppPublications",
  },
  EDIT_BAITUSSALAM_WEB_AND_APP_PUBLICATIONS: {
    path: "/baitussalam-web-and-app-publications-management/edit",
    title: "Edit Baitussalam Web & App Publications",
    name: "EditBaitussalamWebAndApp-Publications",
  },

  BAITUSSALAM_WEB_AND_APP_GUIDES_MANAGEMENT: {
    path: "/baitussalam-web-and-app-guides-management",
    title: "Guides Management",
    name: "GuidesManagement",
  },
  ADD_BAITUSSALAM_WEB_AND_APP_GUIDES: {
    path: "/baitussalam-web-and-app-guides-management/add",
    title: "Add Baitussalam Web & App Guides",
    name: "AddBaitussalamWebAndAppGuides",
  },
  EDIT_BAITUSSALAM_WEB_AND_APP_GUIDES: {
    path: "/baitussalam-web-and-app-guides-management/edit",
    title: "Edit Baitussalam Web & App Guides",
    name: "EditBaitussalamWebAndApp-Guides",
  },

  BAITUSSALAM_WEB_AND_APP_PARTNERS_MANAGEMENT: {
    path: "/baitussalam-web-and-app-partners-management",
    title: "Partners Management",
    name: "PartnersManagement",
  },
  ADD_BAITUSSALAM_WEB_AND_APP_PARTNERS: {
    path: "/baitussalam-web-and-app-partners-management/add",
    title: "Add Baitussalam Web & App Partners",
    name: "AddBaitussalamWebAndAppUPartners",
  },
  EDIT_BAITUSSALAM_WEB_AND_APP_PARTNERS: {
    path: "/baitussalam-web-and-app-partners-management/edit",
    title: "Edit Baitussalam Web & App Partners",
    name: "EditBaitussalamWebAndApp-Partners",
  },

  BAITUSSALAM_WEB_AND_APP_NEWSLETTERS_SUBSCRIBE_USER_MANAGEMENT: {
    path: "/baitussalam-web-and-app-newsletters_subscribe-user-management",
    title: "newsletters Subscribe User Management",
    name: "newslettersSubscribeUserManagement",
  },

  BAITUSSALAM_WEB_AND_APP_ADMIN_USER_MANAGEMENT: {
    path: "/baitussalam-web-and-app-admin-user-management",
    title: "Admin User Management",
    name: "AdminUserManagement",
  },
  ADD_BAITUSSALAM_WEB_AND_APP_ADMIN_USER: {
    path: "/baitussalam-web-and-app-admin-user-management/add",
    title: "Add Baitussalam Web & App Admin User",
    name: "AddBaitussalamWebAndAppUser",
  },
  EDIT_BAITUSSALAM_WEB_AND_APP_ADMIN_USER: {
    path: "/baitussalam-web-and-app-admin-user-management/edit",
    title: "Edit Baitussalam Web & App Admin User",
    name: "EditBaitussalamWebAndApp-Admin User",
  },

  BAITUSSALAM_WEB_AND_APP_VOLUNTEERS_MANAGEMENT: {
    path: "/baitussalam-web-and-app-volunteers-management",
    title: "Volunteers Management",
    name: "VolunteersManagement",
  },

  EDIT_BAITUSSALAM_WEB_AND_APP_VOLUNTEERS: {
    path: "/baitussalam-web-and-app-volunteers-management/edit",
    title: "Edit Baitussalam Web & App Volunteers",
    name: "EditBaitussalamWebAndApp-Volunteers",
  },

  BAITUSSALAM_WEB_AND_APP_VIDEOS_MANAGEMENT: {
    path: "/baitussalam-web-and-app-videos-management",
    title: "Videos Management",
    name: "VideosManagement",
  },
  ADD_BAITUSSALAM_WEB_AND_APP_VIDEOS: {
    path: "/baitussalam-web-and-app-videos-management/add",
    title: "Add Baitussalam Web & App Videos",
    name: "AddBaitussalamWebAndAppVideos",
  },
  EDIT_BAITUSSALAM_WEB_AND_APP_VIDEOS: {
    path: "/baitussalam-web-and-app-videos-management/edit",
    title: "Edit Baitussalam Web & App Videos",
    name: "EditBaitussalamWebAndApp-Videos",
  },

  BAITUSSALAM_WEB_AND_APP_DUA_CATEGORIES_MANAGEMENT: {
    path: "/baitussalam-web-and-app-dua_categories-management",
    title: "Dua Categories Management",
    name: "DuaCategoriesManagement",
  },
  ADD_BAITUSSALAM_WEB_AND_APP_DUA_CATEGORIES: {
    path: "/baitussalam-web-and-app-dua_categories-management/add",
    title: "Add Baitussalam Web & App Dua Categories",
    name: "AddBaitussalamWebAndAppDuaCategories",
  },
  EDIT_BAITUSSALAM_WEB_AND_APP_DUA_CATEGORIES: {
    path: "/baitussalam-web-and-app-dua_categories-management/edit",
    title: "Edit Baitussalam Web & App Dua Categories",
    name: "EditBaitussalamWebAndApp-Dua Categories",
  },

  BAITUSSALAM_WEB_AND_APP_DUAS_MANAGEMENT: {
    path: "/baitussalam-web-and-app-duas-management",
    title: "Duas Management",
    name: "DuasManagement",
  },
  ADD_BAITUSSALAM_WEB_AND_APP_DUAS: {
    path: "/baitussalam-web-and-app-duas-management/add",
    title: "Add Baitussalam Web & App Duas",
    name: "AddBaitussalamWebAndAppDuas",
  },
  EDIT_BAITUSSALAM_WEB_AND_APP_DUAS: {
    path: "/baitussalam-web-and-app-duas-management/edit",
    title: "Edit Baitussalam Web & App Duas",
    name: "EditBaitussalamWebAndApp-Duas",
  },

  BAITUSSALAM_WEB_AND_APP_FEATURED_VIDEOS_MANAGEMENT: {
    path: "/baitussalam-web-and-app-featured-videos-management",
    title: "Featured Videos Management",
    name: "FeaturedVideosManagement",
  },
  ADD_BAITUSSALAM_WEB_AND_APP_FEATURED_VIDEOS: {
    path: "/baitussalam-web-and-app-featured-videos-management/add",
    title: "Add Baitussalam Web & App Featured Videos",
    name: "AddBaitussalamWebAndAppFeatured Videos",
  },
  EDIT_BAITUSSALAM_WEB_AND_APP_FEATURED_VIDEOS: {
    path: "/baitussalam-web-and-app-featured-videos-management/edit",
    title: "Edit Baitussalam Web & App Featured Videos",
    name: "EditBaitussalamWebAndApp-Featured Videos",
  },

  BAITUSSALAM_WEB_AND_APP_FEATURED_BANNERS_MANAGEMENT: {
    path: "/baitussalam-web-and-app-featured_banners-management",
    title: "Featured Banners Management",
    name: "Featured Banners Management",
  },
  ADD_BAITUSSALAM_WEB_AND_APP_FEATURED_BANNERS: {
    path: "/baitussalam-web-and-app-featured_banners-management/add",
    title: "Add Baitussalam Web & App Featured Banners",
    name: "AddBaitussalamWebAndAppFeatured Banners",
  },
  EDIT_BAITUSSALAM_WEB_AND_APP_FEATURED_BANNERS: {
    path: "/baitussalam-web-and-app-featured_banners-management/edit",
    title: "Edit Baitussalam Web & App Featured Banners",
    name: "EditBaitussalamWebAndApp-Featured Banners",
  },

  BAITUSSALAM_WEB_AND_APP_ONLINE_CHARITIES_MANAGEMENT: {
    path: "/baitussalam-web-and-app-online-charities-management",
    title: "Online Charities Management",
    name: "Online Charities Management",
  },

  EDIT_BAITUSSALAM_WEB_AND_APP_ONLINE_CHARITIES: {
    path: "/baitussalam-web-and-app-online-charities-management/edit",
    title: "Edit Baitussalam Web & App Online Charities",
    name: "EditBaitussalamWebAndApp-Online Charities",
  },

  BAITUSSALAM_WEB_AND_APP_DONATION_CATEGORIES_MANAGEMENT: {
    path: "/baitussalam-web-and-app-donation_categories-management",
    title: "Donation Categories Management",
    name: "Donation Categories Management",
  },
  ADD_BAITUSSALAM_WEB_AND_APP_DONATION_CATEGORIES: {
    path: "/baitussalam-web-and-app-donation_categories-management/add",
    title: "Add Baitussalam Web & App Donation Categories",
    name: "AddBaitussalamWebAndAppDonationCategories",
  },
  EDIT_BAITUSSALAM_WEB_AND_APP_DONATION_CATEGORIES: {
    path: "/baitussalam-web-and-app-donation_categories-management/edit",
    title: "Edit Baitussalam Web & App Donation Categories",
    name: "EditBaitussalamWebAndApp-Donation Categories",
  },

  BAITUSSALAM_WEB_AND_APP_CUSTOMERS_MANAGEMENT: {
    path: "/baitussalam-web-and-app-customers-management",
    title: "Customers Management",
    name: "CustomersManagement",
  },
  EDIT_BAITUSSALAM_WEB_AND_APP_CUSTOMERS: {
    path: "/baitussalam-web-and-app-customers-management/edit",
    title: "Edit Baitussalam Web & App Customers",
    name: "EditBaitussalamWebAndApp-Customers",
  },

  BAITUSSALAM_WEB_AND_APP_HIJRI_DATES_MANAGEMENT: {
    path: "/baitussalam-web-and-app-hijri_dates-management",
    title: "Hijri Dates Management",
    name: "HijriDatesManagement",
  },

  BAITUSSALAM_WEB_AND_APP_SAIBAN_SUBMISSIONS_MANAGEMENT: {
    path: "/baitussalam-web-and-app-saiban-submissions-management",
    title: "Saiban Submissions Management",
    name: "Saiban Submissions Management",
  },
  EDIT_BAITUSSALAM_WEB_AND_APP_SAIBAN_SUBMISSIONS: {
    path: "/baitussalam-web-and-app-saiban-submissions-management/edit",
    title: "Edit Baitussalam Web & App Saiban Submissions",
    name: "EditBaitussalamWebAndApp-Saiban Submissions",
  },

  BAITUSSALAM_WEB_AND_APP_SETTINGS_MANAGEMENT: {
    path: "/baitussalam-web-and-app-settings-management",
    title: "Settings Management",
    name: "SettingsManagement",
  },
  ADD_BAITUSSALAM_WEB_AND_APP_SETTINGS: {
    path: "/baitussalam-web-and-app-settings-management/add",
    title: "Add Baitussalam Web & App Settings",
    name: "AddBaitussalamWebAndAppSettings",
  },
  EDIT_BAITUSSALAM_WEB_AND_APP_SETTINGS: {
    path: "/baitussalam-web-and-app-settings-management/edit",
    title: "Edit Baitussalam Web & App Settings",
    name: "EditBaitussalamWebAndApp-Settings",
  },
};

export default ROUTES;
