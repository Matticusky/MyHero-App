import { createSlice } from "@reduxjs/toolkit";

const tempDataSlice = createSlice({
  name: "temp",
  initialState: {
    tempData: null,
    tempRouteName: null,
    changeColorMarker: null,
    tempChosenLocation: null,
    tempRoutesDetail: null,
    editableRoute: null,
  },
  reducers: {
    setTempData: (state, action) => {
      state.tempData = action.payload;
    },
    setTempRouteName: (state, action) => {
      state.tempRouteName = action.payload;
    },
    setChangeColorMarker: (state, action) => {
      state.changeColorMarker = action.payload;
    },
    setTempChosenLocation: (state, action) => {
      state.tempChosenLocation = action.payload;
    },
    setTempRoutesDetail: (state, action) => {
      state.tempRoutesDetail = action.payload;
    },
    setEditableRoute: (state, action) => {
      state.editableRoute = action.payload;
    },
  },
});
export const {
  setTempData,
  setTempRouteName,
  setChangeColorMarker,
  setTempChosenLocation,
  setTempRoutesDetail,
  setEditableRoute,
} = tempDataSlice.actions;
export default tempDataSlice.reducer;
