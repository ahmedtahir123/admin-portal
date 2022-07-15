import _get from "lodash/get";
import { throwError, to, toastMessage } from "../../utils/utils";
import ACTIONS from "./types.actions";
import ProfilerService from "../../services/landingPage.service";
import { SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../utils/constants";
import { uploadRequest, uploadError, uploadSuccess } from "./ui.actions";
import UploadService from "../../services/upload.service";

export function profilerRequest() {
  return { type: ACTIONS.PROFILER_REQUEST };
}

export function profilerSuccess(response) {
  return { type: ACTIONS.PROFILER_SUCCESS, response };
}

export function profilerError(error) {
  return { type: ACTIONS.PROFILER_ERROR, error };
}

export function profilerIdSuccess(response) {
  return { type: ACTIONS.SELECTED_PROFILER_SUCCESS, response };
}

export function profilerListSuccess(response) {
  return { type: ACTIONS.PROFILER_LIST_SUCCESS, response };
}

export function selectedProfilerSuccess(response) {
  return { type: ACTIONS.SELECTED_PROFILER_SUCCESS, response };
}

export function swimlaneSuccess(response) {
  return { type: ACTIONS.SWIMLANE_SUCCESS, response };
}

export function updateProfiler(id, info) {
  return async dispatch => {
    dispatch(profilerRequest());
    try {
      const [err, response] = await to(ProfilerService.updateProfilerById(id, info));
      if (err) throwError(err);
      dispatch(profilerSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.EDITED);
    } catch (error) {
      dispatch(profilerError(error));
      toastMessage("error", ERROR_MESSAGE.EDITED);
      throwError(error);
    }
  };
}

export function addProfiler(info) {
  return async dispatch => {
    dispatch(profilerRequest());
    try {
      const [err, response] = await to(ProfilerService.addProfiler(info));
      if (err) throwError(err);
      dispatch(profilerSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(profilerError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function startProfiler(id) {
  return async dispatch => {
    dispatch(profilerRequest());
    try {
      const [err, response] = await to(ProfilerService.startProfiler(id));
      if (err) throwError(err);
      dispatch(profilerSuccess(response));
      dispatch(getProfilerById(id));
    } catch (error) {
      dispatch(profilerError(error));
      throwError(error);
    }
  };
}

export function getSwimlaneById(id) {
  return async dispatch => {
    dispatch(profilerRequest());
    try {
      const [err, response] = await to(ProfilerService.getSwimlaneById(id));
      if (err) throwError(err);
      dispatch(swimlaneSuccess(response));
    } catch (error) {
      dispatch(profilerError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function getProfilerList(info) {
  return async dispatch => {
    dispatch(profilerRequest());
    try {
      const [err, response] = await to(ProfilerService.getProfilerList(info));
      if (err) throwError(err);
      dispatch(profilerSuccess(response));
      dispatch(profilerListSuccess(response.content));
    } catch (error) {
      dispatch(profilerError(error));
      toastMessage("error", ERROR_MESSAGE.LIST);
      throwError(error);
    }
  };
}

export function getProfilerById(id) {
  return async dispatch => {
    dispatch(profilerRequest());
    try {
      const [err, response] = await to(ProfilerService.getProfilerById(id));
      if (err) throwError(err);
      dispatch(selectedProfilerSuccess(response));
    } catch (error) {
      dispatch(profilerError(error));
      toastMessage("error", ERROR_MESSAGE.INFO);
      throwError(error);
    }
  };
}

export function deleteAllProfiler(id) {
  return async dispatch => {
    dispatch(profilerRequest());
    try {
      const [err, response] = await to(ProfilerService.deleteAllProfiler(id));
      if (err) throwError(err);
      dispatch(profilerSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.DELETED);
    } catch (error) {
      dispatch(profilerError(error));
      toastMessage("error", ERROR_MESSAGE.DELETED);
      throwError(error);
    }
  };
}

export function enableDisableProfiler(ids, enabled) {
  return async dispatch => {
    dispatch(profilerRequest());
    try {
      let err, response;
      if (enabled) {
        [err, response] = await to(ProfilerService.enableProfiler(ids));
      } else {
        [err, response] = await to(ProfilerService.disableProfiler(ids));
      }
      if (err) throwError(err);
      dispatch(profilerListSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ENABLED);
    } catch (error) {
      dispatch(profilerError(error));
      toastMessage("error", ERROR_MESSAGE.ENABLED);
      throwError(error);
    }
  };
}
const mapLanes = (res, allSwimLanes) => {
  const newLanes = allSwimLanes.map((lane, index) => {
    const images = res && res[`lane-card-images-${lane.id}`];
    let newCards = lane.cards || [];
    if (images) {
      newCards = lane.cards.map(card => {
        const imageName = _get(card, "imageUrl.name");
        const imageUrl = images.find(image => image.name === imageName);
        return {
          ...card,
          imageUrl: imageUrl ? imageUrl.url : card.imageUrl,
        };
      });
    }
    return { ...lane, cards: newCards };
  });
  return newLanes;
};
const mapCarousel = (res, carousel) =>
  carousel.map(card => {
    if (res.length) {
      const imageName = _get(card, "imageUrl.name");
      const imageUrl = res.find(image => image.name === imageName);
      return {
        ...card,
        imageUrl: imageUrl ? imageUrl.url : card.imageUrl,
      };
    }
    return { ...card, imageUrl: card.imageUrl };
  });

export function addSwimLane(body, getProgress) {
  return async dispatch => {
    dispatch(profilerRequest());
    try {
      let err, response;
      let files = [];
      const { profile, allSwimLanes, carouselImages } = body;
      if (carouselImages.length || allSwimLanes.length) {
        dispatch(uploadRequest());
        const filterdCarousel = carouselImages.map(carousel => carousel.imageUrl).filter(item => item && item.file);
        let allArrays = [];
        allSwimLanes.forEach(lane => {
          const arr = lane.cards.filter(card => card.imageUrl && card.imageUrl.file);
          allArrays = [...allArrays, ...arr];
        });
        files = files.concat(allArrays, filterdCarousel);
        if (files && files.length) [err, response] = await to(UploadService.uploadUtil(files, getProgress));
        if (err) {
          toastMessage("error", err);
          dispatch(uploadError(err));
        } else {
          dispatch(uploadSuccess());
        }
      }
      const dataManager = {
        layoutId: profile.id,
        data: {
          mainCarousel: {
            cards: mapCarousel(_get(response, "lane-card-images-carousel", []), carouselImages),
          },
          swimlanes: {
            lanes: mapLanes(response, allSwimLanes),
          },
        },
      };
      [err, response] = await to(ProfilerService.addSwimLane(dataManager));
      if (err) throwError(err);
      dispatch(profilerSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(profilerError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}

export function updateSwimLane(body, getProgress) {
  return async dispatch => {
    dispatch(profilerRequest());
    try {
      let err, response;
      let files = [];
      let allArrays = [];
      const { profile, allSwimLanes, carouselImages } = body;
      if (carouselImages.length || allSwimLanes.length) {
        dispatch(uploadRequest());
        const filterdCarousel = carouselImages.map(carousel => carousel.imageUrl).filter(item => item && item.file);
        allSwimLanes.forEach(lane => {
          const arr = lane.cards.map(card => card.imageUrl).filter(item => item && item.file);
          allArrays = [...allArrays, ...arr];
        });
        files = files.concat(allArrays, filterdCarousel);
        if (files && files.length) [err, response] = await to(UploadService.uploadUtil(files, getProgress));
        if (err) {
          toastMessage("error", err);
          dispatch(uploadError(err));
        } else {
          dispatch(uploadSuccess());
        }
      }
      const dataManager = {
        layoutId: profile.id,
        data: {
          mainCarousel: {
            cards: mapCarousel(_get(response, "lane-card-images-carousel", []), carouselImages),
          },
          swimlanes: {
            lanes: allArrays.length ? mapLanes(response, allSwimLanes) : allSwimLanes,
          },
        },
      };
      [err, response] = await to(ProfilerService.updateSwimLane(profile.id, dataManager));
      if (err) throwError(err);
      dispatch(profilerSuccess(response));
      toastMessage("success", SUCCESS_MESSAGE.ADDED);
    } catch (error) {
      dispatch(profilerError(error));
      toastMessage("error", ERROR_MESSAGE.ADDED);
      throwError(error);
    }
  };
}
