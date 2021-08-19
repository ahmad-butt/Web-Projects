import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: ''
}

const detailSlice = createSlice({
    name: 'detail',
    initialState,
    reducers: {
        setDetails: (state,action)=>{
            state.name = action.payload.name
        }
    }
})

export const {setDetails} = detailSlice.actions;

export const selectName = (state)=>state.detail.name;

export default detailSlice.reducer;

