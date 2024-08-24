import { configureStore } from '@reduxjs/toolkit';
import widgetsReducer from './widgets/slice';

export const store = configureStore({
  reducer: {
    widgets: widgetsReducer,
  },
});
