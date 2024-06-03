import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserDetails } from "../types/userType";

export interface IFormInitialValue {
  currentUser: Partial<IUserDetails> | null;
}

export const formInitialValue: IFormInitialValue = {
  currentUser: null,
};

export const FormSlice = createSlice({
  name: "form",
  initialState: formInitialValue,
  reducers: {
    setUserData(state, actions: PayloadAction<Partial<IUserDetails>>) {
      state.currentUser = {
        ...state.currentUser,
        ...actions.payload,
      };
    },
    resetCurrentUser(state) {
      state.currentUser = null;
    },
  },
});

export const { setUserData, resetCurrentUser } = FormSlice.actions;

export default FormSlice.reducer;
