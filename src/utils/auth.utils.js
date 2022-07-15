import Cookies from "js-cookie";
import { TOKEN, USER } from "./constants";

export const getUser = key => {
  let returnData = "-";
  try {
    const userInfo = JSON.parse(localStorage.getItem(USER));
    if (!key || !userInfo[key] || !userInfo[key]) returnData = userInfo;
    else returnData = userInfo[key];
  } catch (ex) {
    returnData = null;
  }
  return returnData;
};

export const setUser = (userData, token) => {
  try {
    if (userData) {
      localStorage.setItem(USER, JSON.stringify(userData));
    }
    if (token) {
      setToken(TOKEN, token);
    }
    if (!userData && !token) {
      return false;
    }
  } catch (ex) {
    return false;
  }
  return true;
};

export const getToken = () => Cookies.get(TOKEN);

export const setToken = (tokenConstant, token) => Cookies.set(tokenConstant, token);

export const removeToken = tokenConstant => Cookies.remove(tokenConstant);
export const removeUserInfo = constant => localStorage.removeItem(constant);

export const removeUser = (userService, history, cb = null) => {
  removeToken(TOKEN);
  removeUserInfo(USER);
  if (cb) cb();
};

export const isLoggedIn = () => !!(getToken() && getUser());
