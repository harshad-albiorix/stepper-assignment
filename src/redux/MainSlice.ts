import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserDetails } from "../types/userType";

export interface IMainInitialValue {
  data: Partial<IUserDetails>[];
}

export const mainInitialValue: IMainInitialValue = {
  data: [],
};

export const MainSlice = createSlice({
  name: "main",
  initialState: mainInitialValue,
  reducers: {
    createUser(state, actions: PayloadAction<Partial<IUserDetails>>) {
      state.data.push(actions.payload);
    },
    removeUser(state, actions: PayloadAction<number>) {
      state.data = state.data.filter((x) => x.id !== actions.payload);
    },
    updateUser(state, actions: PayloadAction<Partial<IUserDetails>>) {
      const payload = actions.payload;
      const id = payload.id;
      const curIndex = state.data.findIndex((x) => x.id === id);
      if (curIndex > -1) {
        state.data[curIndex] = payload;
      }
    },
  },
});

export const { createUser, removeUser, updateUser } = MainSlice.actions;

export default MainSlice.reducer;
