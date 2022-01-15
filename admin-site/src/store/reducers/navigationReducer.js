import { createSlice } from "@reduxjs/toolkit";

export const navSlice = createSlice({
  name: "navs",
  initialState: {
    navigation: [
      { name: "Dashboard", href: "/", current: true },
      { name: "Menu", href: "/menu", current: false },
      { name: "Event", href: "/event", current: false },
      { name: "User", href: "/user", current: false },
    ],
  },
  reducers: {
    updatePage: (state, action) => {
      const nav = [...state.navigation];
      const getLastPageIndex = state.navigation.findIndex(
        (nav) => nav.current === true,
      );
      nav[getLastPageIndex].current = false;
      const getCurrentPageIndex = state.navigation.findIndex(
        (nav) => nav.name === action.payload.name,
      );
      nav[getCurrentPageIndex].current = true;
      state.navigation = nav;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updatePage } = navSlice.actions;
export default navSlice.reducer;
