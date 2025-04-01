import { combineReducers } from "@reduxjs/toolkit";
import allrecordSlice from "./allrecord";

const adminRootReducer = combineReducers({
   allrecorduser:allrecordSlice,
});

export default adminRootReducer;