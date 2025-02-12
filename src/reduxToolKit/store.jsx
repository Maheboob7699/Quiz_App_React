import { configureStore } from "@reduxjs/toolkit";
import signupReducer from  "./signupReducer";
import loginReducer from "./loginReducer"
export const store =configureStore({
    reducer:{
        signupData:signupReducer,
        loginData: loginReducer,
    }
})