import { createSlice } from '@reduxjs/toolkit';
import widgetsData from '../data/structure';

const initialState = widgetsData;

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.find((cat) => cat.id === categoryId);
      category.widgets.push(widget);
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.find((cat) => cat.id === categoryId);
      category.widgets = category.widgets.filter((w) => w.id !== widgetId);
    },
  },
});

export const { addWidget, removeWidget } = widgetsSlice.actions;
export default widgetsSlice.reducer;
