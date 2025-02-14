import { configureStore } from "@reduxjs/toolkit";
import signupReducer from  "./signupReducer";
import loginReducer from "./loginReducer";
import quizzReducer from "./quizzReducer"
export const store =configureStore({
    reducer:{
        signupData:signupReducer,
        loginData: loginReducer,
        quizzData:quizzReducer,
    }
})