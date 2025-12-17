import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
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
    initialState,
    reducers: {
        addOrder: (state, action) => {
            const menu = action.payload;
            const id = menu?._id;
            const eventId = menu?.event;
            if (!id || !eventId) return;

            if (!state.data) state.data = {};

            if (!state.data[eventId]) {
                state.data[eventId] = {
                    items: [],
                    totalAmount: 0,
                    totalPrice: 0,
                };
            }

            const cart = state.data[eventId];
            const idx = cart.items.findIndex((it) => it.menu?._id === id);

            const qty = Number(menu?.quantity) || 0;
            const ordered = Number(menu?.quantityOrder) || 0;
            const quantityLeft = Math.max(qty - ordered, 0);

            const currentAmount = idx >= 0 ? cart.items[idx].amount : 0;
            const nextAmount = Math.min(currentAmount + 1, quantityLeft);

            upsertItem(cart.items, menu, nextAmount);
            const { totalAmount, totalPrice } = recalcTotals(cart.items);
            cart.totalAmount = totalAmount;
            cart.totalPrice = totalPrice;
        },

        removeOrder: (state, action) => {
            const menu = action.payload;
            const id = menu?._id;
            const eventId = menu?.event;
            if (!id || !eventId || !state.data[eventId]) return;

            const cart = state.data[eventId];
            const idx = cart.items.findIndex((it) => it.menu?._id === id);
            const currentAmount = idx >= 0 ? cart.items[idx].amount : 0;
            const nextAmount = Math.max(currentAmount - 1, 0);

            upsertItem(cart.items, menu, nextAmount);
            const { totalAmount, totalPrice } = recalcTotals(cart.items);
            cart.totalAmount = totalAmount;
            cart.totalPrice = totalPrice;
        },

        removeItem: (state, action) => {
            const menu = action.payload;
            const id = menu?._id;
            const eventId = menu?.event;
            if (!id || !eventId || !state.data[eventId]) return;

            const cart = state.data[eventId];
            cart.items = cart.items.filter((it) => it.menu?._id !== id);
            const { totalAmount, totalPrice } = recalcTotals(cart.items);
            cart.totalAmount = totalAmount;
            cart.totalPrice = totalPrice;
        },

        setQuantity: (state, action) => {
            const { menu, quantity } = action.payload || {};
            const id = menu?._id;
            const eventId = menu?.event;
            if (!id || !eventId) return;

            if (!state.data[eventId]) {
                state.data[eventId] = {
                    items: [],
                    totalAmount: 0,
                    totalPrice: 0,
                };
            }

            const cart = state.data[eventId];
            const qty = Number(menu?.quantity) || 0;
            const ordered = Number(menu?.quantityOrder) || 0;
            const left = Math.max(0, qty - ordered);
            const clamped = Math.max(0, Math.min(Number(quantity) || 0, left));

            upsertItem(cart.items, menu, clamped);
            const { totalAmount, totalPrice } = recalcTotals(cart.items);
            cart.totalAmount = totalAmount;
            cart.totalPrice = totalPrice;
        },

        resetCart: (state, action) => {
            const eventId = action.payload;
            if (eventId) {
                delete state.data[eventId];
            } else {
                state.data = {};
            }
        },
    },
});

export const { resetCart, addOrder, removeOrder, removeItem, setQuantity } =
    cartSlice.actions;

export default cartSlice.reducer;

// ---------- Selectors ----------
export const selectCartData = (state, eventId) =>
    state.cart.data[eventId] || { items: [], totalAmount: 0, totalPrice: 0 };

export const selectCartItems = (state, eventId) =>
    state.cart.data[eventId]?.items || [];

export const selectCartTotals = (state, eventId) => {
    const cart = state.cart.data[eventId];
    return {
        totalAmount: cart?.totalAmount || 0,
        totalPrice: cart?.totalPrice || 0,
    };
};
