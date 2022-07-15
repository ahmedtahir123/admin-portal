import get from "lodash/get";
import isString from "lodash/isString";
import { getUser } from "./auth.utils";

/**
 * Usage Example:
 *
 * import permissionsUtil from "../../utils/permissions.util";
 *
 * const canAddUser = permissionsUtil.checkAuth({
 *   category: "UserManagement",
 *   subCategory: "Admin",
 *   action: "Add",
 * });
 */

class PermissionsUtil {
  static instance;

  constructor() {
    if (this.instance) {
      return this.instance;
    }

    this.permissions = getUser("permissions") || {};
    this.instance = this;
  }

  setPermissions(permissions) {
    this.permissions = permissions;
  }

  getPermissionString(permission) {
    if (isString(permission)) return permission;

    let str = "";
    const { action, category, subCategory } = permission;

    if (category) str += `${category}_`;
    if (subCategory) str += `${subCategory}_`;
    if (action) str += `${action}`;
    return str;
  }

  checkAuth(permission) {
    const str = this.getPermissionString(permission);
    // console.log("checkAuth for : ", str);
    return !!get(this.permissions, str);
  }
}

const permissionsUtil = new PermissionsUtil();
export default permissionsUtil;
