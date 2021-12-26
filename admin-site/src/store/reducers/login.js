import { createSlice } from '@reduxjs/toolkit'
import {submitLogin} from "../../helpers/submitLogin";

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        data:{
            email:'',
            password:''
        }
    },
    reducers: {
        textFieldChangeHandler: (state, action) => {
            const name = action.payload.name;
            const value = action.payload.value;
            state.data[name] = value;
        },
        formSubmitHandler: (state, action) => {
            const user = {
                email:state.data.email,
                password:state.data.password
            };
            submitLogin(user);
        },
    },
})

// Action creators are generated for each case reducer function
export const { textFieldChangeHandler, formSubmitHandler } = loginSlice.actions
export default loginSlice.reducer;
