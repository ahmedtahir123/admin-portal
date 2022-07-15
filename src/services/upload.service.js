import { get, put, post, remove, patch } from "./http.service";

const UploadService = {
  uploadFiles: (body, getProgress) =>
    post(`content/v1/public/admin/files/list`, body, {
      headers: { "for-upload": true },
      onUploadProgress: getProgress,
    }),
  uploadUtil: (files, getProgress) => {
    const formData = new FormData();
    files.forEach((element, idx) => {
      formData.append(`uploadModels[${idx}].type`, element.type);
      formData.append(`uploadModels[${idx}].file`, element.file);
      formData.append(`uploadModels[${idx}].name`, element.name);
    });
    return UploadService.uploadFiles(formData, getProgress);
  },
};
export default UploadService;
