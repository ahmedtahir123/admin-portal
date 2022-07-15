import { get, put, post, remove, patch } from "./http.service";
import { getListQuery } from "../utils/utils";

const bookManagementService = {
  addBook: body => post(`deal/v1/public/admin/books`, body),
  getBookById: id => get(`deal/v1/public/admin/books/${id}`),
  updateBookById: (id, body) => put(`deal/v1/public/admin/books/${id}`, body),
  enableBooks: ids => patch(`deal/v1/public/admin/books?codes=${ids}&enabled=true`),
  disableBooks: ids => patch(`deal/v1/public/admin/books?codes=${ids}&enabled=false`),
  deleteAllBook: ids => remove(`deal/v1/public/admin/books?codes=${ids}`),
  getBooksList: query => get(`deal/v1/public/admin/books${getListQuery(query)}`),
  getBooksByLocation: code => get(`deal/v1/public/admin/books/corporate/${code}`),
  publishBook: code => patch(`deal/v1/public/admin/books/publish?codes=${code}`),
  unpublishBook: code => patch(`deal/v1/public/admin/books/unPublish?codes=${code}`),
  printCSV: id => get(`deal/v1/public/admin/book/deal/${id}`),
};
export default bookManagementService;
