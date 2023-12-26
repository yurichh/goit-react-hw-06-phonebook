import { createSlice } from '@reduxjs/toolkit';

/* _________________________________________ Slice for filter ____________________________________________*/

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter(state, action) {
      return action.payload;
    },
  },
});

export const { changeFilter } = filterSlice.actions;
