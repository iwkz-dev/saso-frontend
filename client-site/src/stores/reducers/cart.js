import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addOrder: (state, action) => {
      const id = action.payload._id;
      const currentAmount = state?.data[id]?.amount || 0;
      state.data[id] = {
        amount: currentAmount + 1,
        ...action.payload,
      };
    },
    removeOrder: (state, action) => {
      console.log(action.payload);
      state.data = [...state.data, action.payload];
    },
    resetCart: (state, action) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetCart, addOrder } = cartSlice.actions;
export default cartSlice.reducer;
