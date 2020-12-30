import {
  ADD_ACTIVE_PAD,
  SUB_ACTIVE_PAD,
  UPDATE_BEAT_STAMP,
} from "../actions/types";

const INITIAL_STATE = {
  currBeatsStamp: 0,
  totalBeatsPass: 0,
  currOnPads: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //Add one to count of active pads and if it is the first active pad set the beats stamp
    case ADD_ACTIVE_PAD:
      return {
        ...state,
        currOnPads: state.currOnPads + 1,
        currBeatsStamp:
          state.currOnPads == 0 ? action.payload : state.currBeatsStamp,
      };
    //sub one from count of active pads and if it is the last active pad set the beats stamp to zero.
    case SUB_ACTIVE_PAD:
      return {
        ...state,
        currOnPads: state.currOnPads - 1,
        currBeatsStamp: state.currOnPads - 1 == 0 ? 0 : state.currBeatsStamp,
      };
    case UPDATE_BEAT_STAMP:
      //update the total beats pass seen the first pad activated
      return {
        ...state,
        totalBeatsPass:
          state.currOnPads == 0
            ? 0
            : state.totalBeatsPass + state.currBeatsStamp,
      };

    default:
      return state;
  }
};
