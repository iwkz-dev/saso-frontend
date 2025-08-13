import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalAmount: 0,
    totalPrice: 0,
};

const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100;

const recalcTotals = (items) => {
    let totalAmount = 0;
    let totalPrice = 0;
    for (const it of items) {
        totalAmount += Number(it.amount) || 0;
        totalPrice += Number(it.sumPrice) || 0;
    }
    return { totalAmount, totalPrice: round2(totalPrice) };
};

const upsertItem = (items, menu, nextAmount) => {
    const id = menu?._id;
    const idx = items.findIndex((it) => it.menu?._id === id);

    const price = Number(menu?.price) || 0;
    const amount = Math.max(0, Number(nextAmount) || 0);
    const sumPrice = round2(price * amount);

    if (idx >= 0) {
        if (amount === 0) {
            items.splice(idx, 1);
        } else {
            items[idx].amount = amount;
            items[idx].sumPrice = sumPrice;
        }
    } else if (amount > 0) {
        items.push({ menu, amount, sumPrice });
    }
};

export const cartSlice = createSlice({
    name: "cart",
    initialState: { data: initialState },
    reducers: {
        addOrder: (state, action) => {
            const menu = action.payload;
            const id = menu?._id;
            if (!id) return;

            const items = state.data.items;
            const idx = items.findIndex((it) => it.menu?._id === id);

            const qty = Number(menu?.quantity) || 0;
            const ordered = Number(menu?.quantityOrder) || 0;
            const quantityLeft = Math.max(qty - ordered, 0);

            const currentAmount = idx >= 0 ? items[idx].amount : 0;
            const nextAmount = Math.min(currentAmount + 1, quantityLeft);

            upsertItem(items, menu, nextAmount);
            const { totalAmount, totalPrice } = recalcTotals(items);
            state.data.totalAmount = totalAmount;
            state.data.totalPrice = totalPrice;
        },

        removeOrder: (state, action) => {
            const menu = action.payload;
            const id = menu?._id;
            if (!id) return;

            const items = state.data.items;
            const idx = items.findIndex((it) => it.menu?._id === id);

            const currentAmount = idx >= 0 ? items[idx].amount : 0;
            const nextAmount = Math.max(currentAmount - 1, 0);

            upsertItem(items, menu, nextAmount);
            const { totalAmount, totalPrice } = recalcTotals(items);
            state.data.totalAmount = totalAmount;
            state.data.totalPrice = totalPrice;
        },

        // Remove the line item entirely (e.g., from a trash icon in CartList)
        removeItem: (state, action) => {
            const id = action.payload?._id;
            if (!id) return;
            state.data.items = state.data.items.filter(
                (it) => it.menu?._id !== id,
            );
            const { totalAmount, totalPrice } = recalcTotals(state.data.items);
            state.data.totalAmount = totalAmount;
            state.data.totalPrice = totalPrice;
        },

        // Directly set a specific quantity (useful for steppers)
        setQuantity: (state, action) => {
            const { menu, quantity } = action.payload || {};
            if (!menu?._id) return;

            const qty = Number(menu?.quantity) || 0;
            const ordered = Number(menu?.quantityOrder) || 0;
            const left = Math.max(qty - ordered, 0);
            const clamped = Math.max(0, Math.min(Number(quantity) || 0, left));

            upsertItem(state.data.items, menu, clamped);
            const { totalAmount, totalPrice } = recalcTotals(state.data.items);
            state.data.totalAmount = totalAmount;
            state.data.totalPrice = totalPrice;
        },

        resetCart: (state) => {
            state.data = { ...initialState };
        },
    },
});

export const { resetCart, addOrder, removeOrder, removeItem, setQuantity } =
    cartSlice.actions;

export default cartSlice.reducer;

// ---------- Selectors ----------
export const selectCartData = (state) => state.cart.data;
export const selectCartItems = (state) => state.cart.data.items;
export const selectCartTotals = (state) => ({
    totalAmount: state.cart.data.totalAmount,
    totalPrice: state.cart.data.totalPrice,
});
