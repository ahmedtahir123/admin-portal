/* eslint-disable no-template-curly-in-string */
export const BASE_URL = window.BASE_URL || "https://dev-api.baitussalam.org:8450";
export const UPLOAD_URL = window.UPLOAD_URL || "http://110.93.214.166:9109";
export const TOKEN = "CT_TOKEN";
export const USER = "CT_USER";
export const CLIENT_ID = "bs-admin-client";
export const DATE_FORMAT = "DD/MM/YYYY";
export const DATE_FORMAT_TIME = "DD/MM/YYYY HH:mm";
export const TIME_FORMAT = "HH:mm";
export const MAP_API_KEY = "AIzaSyCapeS1Q26wpwAqBOS5KvDPTd0JsXXzneQ";
export const DEFAULT_SORTER = { field: "updatedAt", order: "descend" };
export const USER_ROLES = {
  ADMIN: "ADMIN",
  MERCHANT: "MERCHANT",
  MERCHANT_ASSOCIATE: "MERCHANT_ASSOCIATE",
  MERCHANT_MANAGER: "MERCHANT_MANAGER",
};
export const MONTH_ARRAY = ["", "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
export const SEARCH_QUERY = { page: 0, size: 20 };
export const ADDRESS_TABLE_COLUMNS = [
  {
    title: "Complete Address",
    dataIndex: "addressName",
    key: "addressName",
  },
  // {
  //   title: "Country",
  //   dataIndex: "country",
  //   key: "country",
  // },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Area",
    dataIndex: "area",
    key: "area",
  },
  // {
  //   title: "Street",
  //   dataIndex: "street",
  //   key: "street",
  // },
];

export const CHANGE_PARTNER_COL = [
  {
    title: "Name",
    dataIndex: "name",
    // width: 150,
  },
  {
    title: "Brand",
    dataIndex: ["brand", "name"],
    // width: 150,
  },
  {
    title: "Location",
    dataIndex: "location",
    // dataIndex: ["areaSegment", "city"],
  },
];

export const SELECTED_PARTNER_COL = [
  {
    title: "Name",
    dataIndex: "name",
    // width: 150,
  },
  {
    title: "Brand",
    dataIndex: "brandName",
    // width: 150,
  },
  {
    title: "Location",
    dataIndex: "location",
    // dataIndex: ["areaSegment", "city"],
  },
];

export const STATUS = {
  DEFAULT: "DEFAULT",
  ENABLED: "ENABLED",
  DISABLED: "DISABLED",
  VERIFIED: "VERIFIED",
  NON_VERIFIED: "NOT_VERIFIED",
  UNPUBLISHED: "UNPUBLISHED",
  PUBLISHED: "PUBLISHED",
  ENGAGED: "ENGAGED",
  PURCHASED: "PURCHASED",
  AUTHORIZED: "AUTHORIZED",
  UNAUTHORIZED: "UNAUTHORIZED",
  ACTIVE: "ACTIVE",
  IN_ACTIVE: "INACTIVE",
  DORMANT: "DORMANT",
  REJECTED: "REJECTED",
  RETIRED: "RETIRED",
  NOT_READY: "NOT_READY",
  CONTRACT_READY: "CONTRACT_READY",
  MERCHANT_APPROVED: "MERCHANT_APPROVED",
  ADMIN_APPROVED: "ADMIN_APPROVED",
  NOT_READY_API: "notReady",
  CONTRACT_READY_API: "contractReady",
  MERCHANT_APPROVED_API: "merchantApprove",
  ADMIN_APPROVED_API: "adminApprove",
  IN_DELIVERY: "IN_DELIVERY",
  COMPLETED: "COMPLETED",
  INPROGRESS: "INPROGRESS",
  WITHDRAWED: "WITHDRAWED",
  PENDING: "PENDING",
  FAILED: "FAILED",
  PAID: "PAID",
  UNPAID: "UNPAID",
  DELIVERED: "DELIVERED",
  REDEEMED_WITH_CODE: "REDEEMED_WITH_CODE",
  REDEEMED_WITH_QR: "REDEEMED_WITH_QR",
};

export const MERCHANT_USER_TYPE = {
  MANAGER: "MANAGER",
  ASSOCIATE: "ASSOCIATE",
};
export const SUCCESS_MESSAGE = {
  DELETED: "Deleted Successfully",
  ADDED: "Added Successfully",
  EDITED: "Updated Successfully",
  ENABLED: "Enabled / Disabled Successfully",
  PUBLISHED: "Published / Un Published Successfully",
  LIST: "List retrieved Successfully",
  INFO: "Info retrieved Successfully",
  AUTHORIZED: "Authorized Successfully",
  EMAIL: "Email Sent Successfully",
  CLONE: "Clone Successfully",
  RETIRED: "Retire Successfully",
  SUSPEND: "Suspend Successfully",
  RESUME: "Resume Successfully",
};
export const ERROR_MESSAGE = {
  DELETED: "Unable to Delete at this time, Please try again",
  ADDED: "Unable to Add at this time, Please try again",
  EDITED: "Unable to Update at this time, Please try again",
  ENABLED: "Unable to Enable / Disable at this time, Please try again",
  PUBLISHED: "Unable to Published / Un Published at this time, Please try again",
  LIST: "Unable to retrieve List at this time, Please try again",
  INFO: "Unable to retrieve Info at this time, Please try again",
  PARTNER_SELECT: "Please select partner with same brand!",
  AUTHORIZED: "Unable to Authorize at this time, Please try again",
  EMAIL: "Error Sending Email",
  FILE: "Unable to download file",
  RETIRE: "Unable to Retire at this time, Please try again",
  SUSPEND: "Unable to Suspend at this time, Please try again",
  RESUME: "Unable to Resume at this time, Please try again",
  CLONE: "Unable to Clone at this time, Please try again",
};

export const CONFIRM_MESSAGE = {
  DELETE: "Are you sure you want to delete?",
  ADD: "Are you sure you want to add?",
  EDIT: "Are you sure you want to save?",
  ENABLE: "Are you sure you want to enable?",
  DISABLE: "Are you sure you want to disable?",
  PUBLISH: "Are you sure you want to publish / un publish?",
  CANCEL: "Are you sure you want to cancel?",
};

export const EMPTY_MESSAGE = "Please select a row";

export const VALIDATE_FORM_MESSAGES_TEMPLATE = {
  required: "${label} is required!",
  types: {
    email: "Enter a valid email!",
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
  string: {
    max: "cannot be longer then ${max} characters",
  },
};

export const bookLocationList = [
  { name: "Karachi", code: "karachi" },
  { name: "Multan", code: "multan" },
  { name: "Lahore", code: "lahore" },
  { name: "Islamabad", code: "islamabad" },
];

export const CardTypes = {
  BRAND: { name: "brand", value: "Brand" },
  OUTLET: { name: "outlet", value: "Outlet" },
  CATEGORY: { name: "category", value: "Category" },
  INTERNAL_WEBPAGE: { name: "internal-webpage", value: "Internal-Webpage" },
  EXTERNAL_WEBPAGE: { name: "external-webpage", value: "External-Webpage" },
};
// export const Type = ["Static", "Last-Ordered", "Book-Recommendation"];
export const LaneTypes = {
  STATIC: { name: "static", value: "Static" },
  LAST_ORDERED: { name: "last-ordered", value: "Last-Ordered" },
  BOOK_RECOMMENDATION: { name: "book-recommendation", value: "Book-Recommendation" },
};
// export const PresentationType = ["Small", "Normal", "Big", "edge-to-edge"];
export const PresentationTypes = {
  SMALL: { name: "small", value: "Small" },
  NORMAL: { name: "normal", value: "Normal" },
  BIG: { name: "big", value: "Big" },
  E2E: { name: "e2e", value: "Edge-to-Edge" },
};

export const RedemptionType = [
  { name: "Digital", code: "DIGITAL" },
  { name: "Manual", code: "MANUAL" },
  { name: "Both", code: "BOTH" },
];

export const REDEMPTION_TYPE = { DIGITAL: "DIGITAL", MANUAL: "MANUAL", BOTH: "BOTH" };

export const ITEM_VARIATION_QUESTIONS_COL = [
  {
    title: "Question",
    dataIndex: "question",
  },
  {
    title: "Is Required",
    dataIndex: "isRequired",
  },
  {
    title: "Sel Type",
    dataIndex: "selType",
  },
];
