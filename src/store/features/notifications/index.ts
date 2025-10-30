import { createSlice } from "@reduxjs/toolkit";

export interface NotificationInitialState {
  showNotification: boolean;
  message: string;
  type: "success" | "error" | "info" | "warning" | "";
}

export const notificationInitialState: NotificationInitialState = {
  showNotification: false,
  message: "",
  type: "",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationInitialState,
  reducers: {
    setNotification: (state, action) => {
      state.showNotification = action.payload.showNotification;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
