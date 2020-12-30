import { UPDATE_PAD_BPM } from "../actions/types";

const INITIAL_STATE = {
  1: { padId: 1, beatsPerSec: 0 },
  2: { padId: 2, beatsPerSec: 0 },
  3: { padId: 3, beatsPerSec: 0 },
  4: { padId: 4, beatsPerSec: 0 },
  5: { padId: 5, beatsPerSec: 0 },
  6: { padId: 6, beatsPerSec: 0 },
  7: { padId: 7, beatsPerSec: 0 },
  8: { padId: 8, beatsPerSec: 0 },
  9: { padId: 9, beatsPerSec: 0 },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PAD_BPM:
      return {
        ...state,
        [action.payload.padId]: {
          ...state[action.payload.padId],
          beatsPerSec: action.payload.beatsPerSec,
        },
      };
    default:
      return state;
  }
};
