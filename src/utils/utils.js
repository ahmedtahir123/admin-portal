import { notification, message } from "antd";
import _filter from "lodash/filter";
import _isEmpty from "lodash/isEmpty";
import xlsx from "../images/xlsx_icon.svg";
import docx from "../images/docx_icon.svg";
import pdf from "../images/pdf_icon.svg";
import { UPLOAD_URL } from "./constants";

const validFileTypes = ["xlsx", "docx", "pdf", "spreadsheet", "wordprocessing"];
const fileIcon = { xlsx, docx, pdf };
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export const TableConfig = columnName => ({
  page: 0,
  size: 10,
  sort: `${columnName},asc`,
});
export const to = promise => promise.then(data => [null, data]).catch(err => [err]);

export const throwError = (errMessage, log) => {
  if (log === true) {
    // eslint-disable-next-line no-console
    console.error(errMessage);
  }
  throw errMessage;
};

export const ellipsis = (str, characterLimit) => {
  if (typeof str === "string" && str.length >= characterLimit) {
    return `${str.substring(0, characterLimit)}...`;
  }
  return str;
};

export const isBase64 = str => {
  const regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;
  return !regex.test(str);
};

export const delay = ms => new Promise(res => setTimeout(res, ms));

export const uuidv4 = () =>
  // eslint-disable-next-line func-names
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0,
      // eslint-disable-next-line no-bitwise
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

export const getListQuery = query => {
  console.log("query", query);
  let params = `?page=0&size=10`;
  if (query) {
    params = `?page=${query.page}&size=${query.size}`;
    if (query.sort) {
      params += `&sort=${query.sort}`;
    }
    if (query.filters) {
      const { filters } = query;
      // eslint-disable-next-line no-restricted-syntax
      for (const key in filters) {
        // eslint-disable-next-line no-prototype-builtins
        if (filters.hasOwnProperty(key)) {
          const element = filters[key];
          params += `&${key}=${element}`;
        }
      }
    }
  }
  return params;
};

export const numberOnly = () => ({
  validator(rule, value) {
    const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;

    if (!value) {
      return Promise.resolve();
    }
    if (!re.test(value)) {
      return Promise.reject(new Error("value is not a valid number!"));
    }
    return Promise.resolve();
  },
});

export const toastMessage = (type, description, title, obj = {}, onClick = null) => {
  const object = obj;
  object.key = Date.now();

  if (type === "success") {
    object.message = title || "Success";
  }
  if (type === "info") {
    object.message = title || "Info";
  }
  if (type === "warning") {
    object.message = title || "Warning";
  }
  if (type === "error") {
    object.message = title || "Error";
  }

  const style = {
    width: object.Width || "auto",
    marginLeft: object.marginLeft || "none",
    opacity: object.opacity || 0.91,
  };
  object.style = style;
  object.description = description || object.description;

  object.onClick = () => {
    if (onClick) onClick();
    notification.close(object.key);
  };

  return notification[type]({
    ...object,
  });
};

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const beforeUpload = file => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
    return Promise.reject(new Error(true));
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error("Image must smaller than 10MB!");
    return Promise.reject(new Error(true));
  }
  return false;
};

export const getThumbnailByType = value => {
  const splitted = value.split(".");
  const format = splitted[splitted.length - 1];
  return fileIcon[format.toLowerCase()];
};

export const getHostName = name => `${UPLOAD_URL}/${name}`;

export const isValidDocumentType = type => {
  let isValid = false;
  validFileTypes.forEach(item => {
    if (type.includes(item)) {
      isValid = true;
    }
  });
  return isValid;
};

export const isEmptyObject = obj => Object.keys(obj).length === 0;

export const getFormatedTime = timeToFormate => {
  timeToFormate = new Date(timeToFormate);
  return `${timeToFormate.getFullYear()}-${
    months[timeToFormate.getMonth() + 1]
  }-${timeToFormate.getDate()} ${timeToFormate.getHours()}:${timeToFormate.getMinutes()}:${timeToFormate.getSeconds()}`;
};

export const resolveQuery = (query, r, users) => {
  let str = {};
  if (query !== undefined) {
    if (query.userType !== null) {
      const a = _filter(r, { userType: "Admin" });
      str = { content: a, userAgent: users.userAgent };
      return str;
    }
    return users;
  }
  return users;
};

export const isJSON = str => {
  if (typeof str !== "string") return false;
  try {
    const result = JSON.parse(str);
    const type = Object.prototype.toString.call(result);
    if (str === "null") {
      // TODO: check
      return true;
    }
    return type === "[object Object]" || type === "[object Array]";
  } catch (err) {
    return false;
  }
};

export const queryGenerator = ({ currentPage, pageSize, sorter, filters }) => {
  let sort;
  if (!_isEmpty(sorter)) {
    const order = sorter.order === "ascend" ? "asc" : "desc";
    sort = `${sorter.field},${order}`;
  }
  return {
    page: currentPage - 1,
    size: pageSize,
    sort,
    direction: sorter.order,
    ...filters,
  };
};

export const filterCities = (key, data) => data.filter(item => item.stateCode === key);
