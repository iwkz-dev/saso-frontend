import { createSlice } from '@reduxjs/toolkit';
import CartItem from '../../components/atoms/CartItem/CartItem';
import React from 'react';

const initialState = {
  data: {},
  items: [],
  totalAmount: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addOrder: (state, action) => {
      const id = action.payload._id;
      const quantityLeft =
        action.payload.quantity - action.payload.quantityOrder;
      if (!state.items.length) {
        state.items[0] = {
          amount: 1,
          sumPrice: parseFloat(action.payload.price.toFixed(2)),
          menu: action.payload,
        };
      } else {
        const itemIndex = state.items.findIndex(
          (item, i) => item.menu._id == id
        );
        if (itemIndex >= 0) {
          const amount = state.items[itemIndex].amount + 1;
          if (amount <= quantityLeft) {
            state.items[itemIndex].amount = amount;
            state.items[itemIndex].sumPrice = parseFloat(
              (state.items[itemIndex].menu.price * amount).toFixed(2)
            );
          }
        } else {
          state.items.push({
            amount: 1,
            sumPrice: parseFloat(action.payload.price.toFixed(2)),
            menu: action.payload,
          });
        }
      }
      let totalPrice = 0;
      let totalAmount = 0;
      state.items.map(item => {
        totalPrice += item.sumPrice;
        totalAmount += item.amount;
      });
      state.totalAmount = totalAmount;
      state.totalPrice = parseFloat(totalPrice).toFixed(2);
    },
    removeOrder: (state, action) => {
      const id = action.payload._id;
      const itemIndex = state.items.findIndex(item => item.menu._id == id);
      if (itemIndex >= 0) {
        const amount = state.items[itemIndex].amount - 1;
        if (amount == 0) {
          const isConfirm = confirm(
            `Do you want to remove ${action.payload.name} from your cart?`
          );
          if (isConfirm) {
            const items = state.items.filter(item => item.menu._id != id);
            state.items = items;
          }
        } else {
          state.items[itemIndex].amount = amount;
          state.items[itemIndex].sumPrice = parseFloat(
            (state.items[itemIndex].menu.price * amount).toFixed(2)
          );
        }
      } else {
        state.items.push({
          amount: 1,
          sumPrice: parseFloat(action.payload.price.toFixed(2)),
          menu: action.payload,
        });
      }
      let totalPrice = 0;
      let totalAmount = 0;
      state.items.map(item => {
        totalPrice += item.sumPrice;
        totalAmount += item.amount;
      });
      state.totalAmount = totalAmount;
      state.totalPrice = parseFloat(totalPrice).toFixed(2);
    },
    resetCart: (state, action) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetCart, addOrder, removeOrder } = cartSlice.actions;
export default cartSlice.reducer;
