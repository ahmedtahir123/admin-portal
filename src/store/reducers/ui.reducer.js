import { produce } from "immer";
import ACTIONS from "../actions/types.actions";

const ui = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.UI_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.UI_SUCCESS:
      draft.loading = false;
      draft.isModalOpen = action.response;
      return draft;

    case ACTIONS.UPLOAD_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.UPLOAD_SUCCESS:
      draft.loading = false;
      return draft;
    case ACTIONS.UPLOAD_ERROR:
      draft.loading = false;
      draft.error = action.response;
      return draft;

    default:
      return draft;
  }
});

export default ui;
