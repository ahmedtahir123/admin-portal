import { produce } from "immer";
import ACTIONS from "../actions/types.actions";

const designer = produce((draft, action) => {
  switch (action.type) {
    case ACTIONS.DESIGNER_REQUEST:
      draft.loading = true;
      return draft;
    case ACTIONS.DESIGNER_SUCCESS:
      draft.loading = false;
      draft.error = null;
      draft.value = action.response;
      return draft;
    case ACTIONS.DESIGNER_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return draft;
    default:
      return draft;
  }
});

export default designer;
