import {
  ADD_ACTIVE_PAD,
  SUB_ACTIVE_PAD,
  UPDATE_PAD_BPM,
  UPDATE_BEAT_STAMP,
} from "./types";

export const addActivePadCount = (beatsPerSec) => {
  return {
    type: ADD_ACTIVE_PAD,
    payload: beatsPerSec,
  };
};

export const subActivePadCount = (padId) => {
  return {
    type: SUB_ACTIVE_PAD,
  };
};

export const updatePadBeatsPerSec = (padId, beatsPerSec) => {
  return {
    type: UPDATE_PAD_BPM,
    payload: { padId, beatsPerSec },
  };
};

export const UpdatecurrBeatsStamp = (padId, beatsPerSec) => {
  return {
    type: UPDATE_BEAT_STAMP,
  };
};
