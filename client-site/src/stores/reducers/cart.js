import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalAmount: 0,
    totalPrice: 0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        data: initialState,
    },
    reducers: {
        addOrder: (state, action) => {
            const id = action.payload._id;
            const quantityLeft =
                action.payload.quantity - action.payload.quantityOrder;
            if (!state.data.items.length) {
                state.data.items[0] = {
                    amount: 1,
                    sumPrice: parseFloat(action.payload.price.toFixed(2)),
                    menu: action.payload,
                };
            } else {
                const itemIndex = state.data.items.findIndex(
                    (item, i) => item.menu._id == id,
                );
                if (itemIndex >= 0) {
                    const amount = state.data.items[itemIndex].amount + 1;
                    if (amount <= quantityLeft) {
                        state.data.items[itemIndex].amount = amount;
                        state.data.items[itemIndex].sumPrice = parseFloat(
                            (
                                state.data.items[itemIndex].menu.price * amount
                            ).toFixed(2),
                        );
                    }
                } else {
                    state.data.items.push({
                        amount: 1,
                        sumPrice: parseFloat(action.payload.price.toFixed(2)),
                        menu: action.payload,
                    });
                }
            }
            let totalPrice = 0;
            let totalAmount = 0;
            state.data.items.map((item) => {
                totalPrice += item.sumPrice;
                totalAmount += item.amount;
            });
            state.data.totalAmount = totalAmount;
            state.data.totalPrice = parseFloat(totalPrice).toFixed(2);
        },
        addNote: (state, action) => {
            const id = action.payload._id;
            const itemIndex = state.data.items.findIndex(
                (item) => item.menu._id == id,
            );
            state.data.items[itemIndex].note = action.payload.note;
            console.log(state.data.items[itemIndex]);
        },
        removeOrder: (state, action) => {
            const id = action.payload._id;
            const itemIndex = state.data.items.findIndex(
                (item) => item.menu._id == id,
            );
            if (itemIndex >= 0) {
                const amount = state.data.items[itemIndex].amount - 1;
                if (amount == 0) {
                    const isConfirm = confirm(
                        `Do you want to remove ${action.payload.name} from your cart?`,
                    );
                    if (isConfirm) {
                        const items = state.data.items.filter(
                            (item) => item.menu._id != id,
                        );
                        state.data.items = items;
                    }
                } else {
                    state.data.items[itemIndex].amount = amount;
                    state.data.items[itemIndex].sumPrice = parseFloat(
                        (
                            state.data.items[itemIndex].menu.price * amount
                        ).toFixed(2),
                    );
                }
            } else {
                state.data.items.push({
                    amount: 1,
                    sumPrice: parseFloat(action.payload.price.toFixed(2)),
                    menu: action.payload,
                });
            }
            let totalPrice = 0;
            let totalAmount = 0;
            state.data.items.map((item) => {
                totalPrice += item.sumPrice;
                totalAmount += item.amount;
            });
            state.data.totalAmount = totalAmount;
            state.data.totalPrice = parseFloat(totalPrice).toFixed(2);
        },
        resetCart: (state) => {
            state.data = { ...initialState };
        },
    },
});

// Action creators are generated for each case reducer function
export const { resetCart, addOrder, removeOrder, addNote } = cartSlice.actions;
export default cartSlice.reducer;
