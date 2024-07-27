import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        return {
          payload: {
            fullName,
            nationalID,
            // sideEffect이므로 reducer에서 하지 않고 prepare에서 한다
            // 즉 arg가 하나더라도, 자동생성ID나 createdAt같은 sideEffect가 있으면
            // prepare에서 하는게 맞다
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateCustomer(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateCustomer } = customerSlice.actions;

export default customerSlice.reducer;
