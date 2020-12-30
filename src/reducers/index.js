import { combineReducers } from "redux";
import padsReducer from "./padsReducer";
import loopMachineReducer from "./loopMachineReducer";

export default combineReducers({
  pads: padsReducer,
  machine: loopMachineReducer,
});
