import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './features/root/index'
import notificationReducer from './features/notifications/index'
import checkoutReducer from './features/checkout/index'
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    root: rootReducer,
    notifications: notificationReducer,
    checkout: checkoutReducer,
  },
})
