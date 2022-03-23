import { createSlice } from '@reduxjs/toolkit';
import CartItem from '../../components/atoms/CartItem/CartItem';
import React from 'react';

const initialState = {
  data: {},
  totalAmount: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addOrder: (state, action) => {
      const id = action.payload._id;
      const currentAmount = state?.data[id]?.amount || 0;
      const amount = currentAmount + 1;
      const sumPrice = action.payload.price * amount;
      state.data[id] = {
        amount: amount,
        sumPrice: sumPrice,
        ...action.payload,
      };
      let totalPrice = 0;
      let totalAmount = 0;
      Object.values(state.data).map(cartItem => {
        totalPrice += cartItem.sumPrice;
        totalAmount += cartItem.amount;
      });
      state.totalAmount = totalAmount;
      state.totalPrice = totalPrice;
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
