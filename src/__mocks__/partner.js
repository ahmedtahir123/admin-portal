export const partnerObj = {
  code: "5d8d5bcb-2ac3-43b4-9a9f-ca5406c52678",
  createdAt: 1589298779118,
  updatedAt: 1589298779118,
  createdBy: "malik",
  updatedBy: "malik",
  name: "Lucky Mall",
  punchLine: "Lucky Mall",
  description: "Lucky Mall",
  website: "Lucky Mall",
  address: "Lucky Mall",
  contacts: { corporateNumber: "1", tollFreeNumber: null, customerSupportNumber: "1", customerSupportEmail: null },
  card: null,
  banners: [],
  latitude: null,
  longitude: null,
  location: null,
  contract: null,
  documents: null,
  status: "NOT_READY",
  openingTime: "2020-05-12T09:14:00.516Z",
  closingTime: "2020-05-12T15:00:00.315Z",
  weekDays: null,
  enabled: false,
  brand: {
    code: "8f225dc1-0b46-492b-8f90-80e7a23c18ca",
    createdAt: 1589298745845,
    updatedAt: 1589298745845,
    createdBy: "malik",
    updatedBy: "malik",
    categoryCode: "1199b822-208b-46a4-8564-ec4bb06491f6",
    categoryName: null,
    name: "KFC",
    punchLine: "a",
    description: "a",
    website: "a",
    address: "a",
    contacts: {
      corporateNumber: "1",
      tollFreeNumber: "1",
      customerSupportNumber: "1",
      customerSupportEmail: "a@hotmail.com(opens in new tab)",
    },
    logo: null,
    card: null,
    banners: [],
    enabled: false,
  },
  areaSegment: {
    code: "cff02689-d715-4429-b7d9-472441e40d18",
    createdAt: 1589297433492,
    updatedAt: 1589297433492,
    createdBy: "malik",
    updatedBy: "malik",
    name: "test",
    areaName: "test",
    description: null,
    latitude: null,
    longitude: null,
    radius: 777,
    city: "KARACHI",
    province: "SINDH",
    country: null,
    enabled: true,
  },
};
export const partner = {
  content: [
    {
      code: "5d8d5bcb-2ac3-43b4-9a9f-ca5406c52678",
      createdAt: 1589298779118,
      updatedAt: 1589298779118,
      createdBy: "malik",
      updatedBy: "malik",
      name: "Lucky Mall",
      punchLine: "Lucky Mall",
      description: "Lucky Mall",
      website: "Lucky Mall",
      address: "Lucky Mall",
      contacts: { corporateNumber: "1", tollFreeNumber: null, customerSupportNumber: "1", customerSupportEmail: null },
      card: null,
      banners: [],
      latitude: null,
      longitude: null,
      location: null,
      contract: null,
      documents: null,
      status: "NOT_READY",
      openingTime: "2020-05-12T09:14:00.516Z",
      closingTime: "2020-05-12T15:00:00.315Z",
      weekDays: null,
      enabled: false,
      brand: {
        code: "8f225dc1-0b46-492b-8f90-80e7a23c18ca",
        createdAt: 1589298745845,
        updatedAt: 1589298745845,
        createdBy: "malik",
        updatedBy: "malik",
        categoryCode: "1199b822-208b-46a4-8564-ec4bb06491f6",
        categoryName: null,
        name: "KFC",
        punchLine: "a",
        description: "a",
        website: "a",
        address: "a",
        contacts: {
          corporateNumber: "1",
          tollFreeNumber: "1",
          customerSupportNumber: "1",
          customerSupportEmail: "a@hotmail.com(opens in new tab)",
        },
        logo: null,
        card: null,
        banners: [],
        enabled: false,
      },
      areaSegment: {
        code: "cff02689-d715-4429-b7d9-472441e40d18",
        createdAt: 1589297433492,
        updatedAt: 1589297433492,
        createdBy: "malik",
        updatedBy: "malik",
        name: "test",
        areaName: "test",
        description: null,
        latitude: null,
        longitude: null,
        radius: 777,
        city: "KARACHI",
        province: "SINDH",
        country: null,
        enabled: true,
      },
    },
    { ...partnerObj, code: "5d8d5bcb-2ac3-43b4-9a9f-ca5406c52679", name: "mera partner" },
  ],
  pageable: {
    sort: { sorted: false, unsorted: true, empty: true },
    offset: 0,
    pageSize: 10,
    pageNumber: 0,
    paged: true,
    unpaged: false,
  },
  last: true,
  totalPages: 1,
  totalElements: 1,
  size: 10,
  number: 0,
  sort: { sorted: false, unsorted: true, empty: true },
  numberOfElements: 1,
  first: true,
  empty: false,
};

// export const licensableFeatures = [
//   { feature: "Merchant_Login", status: false },
//   { feature: "Reports", status: false },
//   { feature: "View_Consumers", status: false },
//   { feature: "Consumer_Messaging", status: false },
//   { feature: "Area_Marketing", status: false },
//   { feature: "SMSMessaging_Volume", status: false },
//   { feature: "PushNotification_Volume", status: false },
//   { feature: "Emailing_Volume", status: false },
//   { feature: "Menu_Management", status: false },
//   { feature: "Discount_Management", status: false },
//   { feature: "Order_Management_Dashboard", status: false },
//   { feature: "BOGO_Dispatch_Rider", status: false },
// ];

export const licensableFeatures = [
  { feature: "merchant_login", status: true },
  { feature: "reports", status: false },
  { feature: "view_consumers", status: false },
  { feature: "consumer_messaging", status: false },
  { feature: "area_marketing", status: false },
  { feature: "menu_management", status: false },
  { feature: "discount_management", status: false },
  { feature: "order_management_dashboard", status: false },
  { feature: "bogo_dispatch_rider", status: false },
  { feature: "sms_messaging_volume", status: false },
  { feature: "push_notification_volume", status: false },
  { feature: "emailing_volume", status: false },
];
// export const BussinessHours = [
//   { status: "Limited time", openingTime: 1591992000597, closingTime: 1592017200563, note: undefined },
//   { status: "Limited time", openingTime: 1591992000723, closingTime: 1592017200803, note: undefined },
//   { status: "Limited time", openingTime: 1591992000619, closingTime: 1592017200410, note: undefined },
//   { status: "Limited time", openingTime: 1591992000091, closingTime: 1592017200843, note: undefined },
//   { status: "Limited time", openingTime: 1591992000666, closingTime: 1592017200570, note: "PrayerTime" },
//   { status: "Day off", note: undefined },
//   { status: "Day off", note: undefined },
// ];
export const areaSegmentList = [
  { name: "Segment1", code: "abc" },
  { name: "Segment2", code: "abc" },
  { name: "Segment3", code: "abc" },
];
export const brandList = [
  { name: "Brand1", code: "brand" },
  { name: "Brand2", code: "brand" },
  { name: "Brand3", code: "brand" },
];
