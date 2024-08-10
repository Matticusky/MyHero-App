import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    fcmToken: null,
    user: null,
    recentSearches: null,
    skipButtonPress: null,
    routesDetail: null,
    routesListing: null,
    totalNotification: null,
    token:null,
    rememberMeCreds: {
      email: "",
      password: "",
      rememberMe: false,
    },
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRememberMeCreds: (state, action) => {
      state.rememberMeCreds = action.payload;
    },
    clearRememberMeCreds: (state) => {
      state.rememberMeCreds = {
        email: "",
        password: "",
        rememberMe: false,
      };
    },
    resetAuth: (state) => {
      state.token = null;
      state.user = null;
      state.fcmToken = null;
      state.recentSearches = null;
      state.totalNotification = null;
      state.routesListing = null;
    },
    setSkipButtonPress: (state, action) => {
      state.skipButtonPress = action.payload;
    },
    setFirstTimeLocalEnable: (state, action) => {
      state.firstTimeLocalEnable = action.payload;
    },
    setFcmToken: (state, action) => {
      state.fcmToken = action.payload;
    },

    setRoutesDetail: (state, action) => {
      state.routesDetail = action.payload;
    },
    setRecentSearches: (state, action) => {
      state.recentSearches = action.payload;
    },
    setRoutesListing: (state, action) => {
      state.routesListing = action.payload;
    },
    setTotalNotification: (state, action) => {
      state.totalNotification = action.payload;
    },
  },
});

export const {
  setToken,
  setUser,
  setRememberMeCreds,
  clearRememberMeCreds,
  resetAuth,
  setAddToCartItems,
  setRecentSearches,
  setSkipButtonPress,
  setFirstTimeLocalEnable,
  setFcmToken,
  setRoutesDetail,
  setRoutesListing,
  setTotalNotification,
} = authSlice.actions;
export default authSlice.reducer;
