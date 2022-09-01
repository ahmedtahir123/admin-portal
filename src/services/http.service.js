import axios from "axios";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { BASE_URL, CLIENT_ID, TOKEN } from "../utils/constants";
import { getToken, setToken, getUser } from "../utils/auth.utils";
import { toastMessage, throwError } from "../utils/utils";

export function SetApiRequestHeader(customHeader = {}) {
  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "client-id": CLIENT_ID,
    ...customHeader,
  };
  return defaultHeaders;
}

export async function updateHeaders(customHeader = {}) {
  const token = getToken();
  if (token) {
    customHeader = { Authorization: token, ...customHeader };
  }
  const header = SetApiRequestHeader(customHeader);
  instance.defaults.headers = header;
}

const instance = axios.create({
  baseURL: BASE_URL || "/api/",
  timeout: 100000,
  headers: SetApiRequestHeader(),
});

// Add a request interceptor
instance.interceptors.request.use(
  config => {
    const token = getToken();
    const userRole = getUser("userRole") || "";
    if (userRole === "MERCHANT") {
      const newUrl = config.url.replace("/public/admin/", "/public/merchant/");
      config.url = newUrl;
      config.headers["client-id"] = "merchant-client";
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // if (config.url.includes("/file")) {
    if (config.headers["for-file"]) {
      config.responseType = "blob";
    }
    if (config.headers["for-upload"]) {
      config.timeout = 0;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    if (_get(response, "headers.access-token", "")) {
      const token = _get(response, "headers.access-token", "");
      setToken(TOKEN, token);
    }
    return response.data;
  },
  error => {
    if (error.response) {
      // if (error.response.status === 409) {
      //   // email already exist
      //   // toastMessage("error", errMessage);
      // }
      if (!_isEmpty(error, "response") && error.response.status >= 400) {
        const errorObj = _get(error, "response.headers.err-msg", "Bad Request");
        const errMessage = errorObj.message ? decodeURI(errorObj.message) : decodeURI(errorObj);
        toastMessage("error", errMessage);
        return Promise.reject(errMessage);
      }
    }
    const err = error.message ? error.message : JSON.stringify(error);
    console.log("error===> ", error);
    // toastMessage("error", err);
    return Promise.reject(err);
  },
);

const _getApiVersion = (params = {}) => params.apiVersion || "";

export function get(url, params) {
  return instance.get(`${_getApiVersion(params)}/${url}`, params);
}

export function post(url, body, params) {
  return instance.post(`${_getApiVersion(params)}/${url}`, body, params);
}

export function put(url, body, params) {
  return instance.put(`${_getApiVersion(params)}/${url}`, body, params);
}

export function patch(url, params, body) {
  return instance.patch(`${_getApiVersion(params)}/${url}`, body || {}, params);
}

export function remove(url, params, body) {
  return instance.delete(`${_getApiVersion(params)}/${url}`, body || {}, params);
}
