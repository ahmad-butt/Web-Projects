import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: '',
    email: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSignIn: (state, action)=>{
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
        setSignOut: (state)=>{
            state.username = null;
            state.email = null;
        }
    }
});

export const { setSignIn, setSignUp, setSignOut } = userSlice.actions;

export const selectUsername = (state)=>state.user.username;
export const selectEmail = (state)=>state.user.email;

export default userSlice.reducer;