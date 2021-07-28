import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: false,
    username: '',
    email: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action)=>{
            state.user = action.payload.user
            state.username = action.payload.username
            state.email = action.payload.email
        },
        setLogout: (state)=>{
            state.user = false;
            state.username = null;
            state.email = null;
        }
    }
})

export const {setUserInfo, setLogout} = userSlice.actions;

export const selectUser = (state)=>state.user.user;
export const selectUsername = (state)=>state.user.username;
export const selectEmail = (state)=>state.user.email;

export default userSlice.reducer;