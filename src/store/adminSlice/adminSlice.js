import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state, action) => {
      console.log(`Previous State: ${JSON.stringify(state, null, 2)}`);
      console.log(`Action Payload: ${JSON.stringify(action.payload, null, 2)}`);
      state.value += action.payload.bnt || 1; // Default to 1 if no payload
      console.log(`Updated State: ${JSON.stringify(state, null, 2)}`);
    },
    decrement: (state, action) => {
      console.log(`Previous State: ${JSON.stringify(state, null, 2)}`);
      console.log(`Action Payload: ${JSON.stringify(action.payload, null, 2)}`);
      state.value -= action.payload || 1;
      console.log(`Updated State: ${JSON.stringify(state, null, 2)}`);
    },
    reset: (state) => {
      console.log(`Resetting State: ${JSON.stringify(state, null, 2)}`);
      state.value = 0;
    },
  },
});

export const { increment, decrement, reset } = adminSlice.actions;

export default adminSlice.reducer;
