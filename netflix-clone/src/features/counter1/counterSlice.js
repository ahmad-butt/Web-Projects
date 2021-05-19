import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setIncrement: (state)=>{
            state.count+=1;
        },
        setDecrement: (state)=>{
            state.count-=1;
        }
    }
})

export const {setIncrement, setDecrement} = counterSlice.actions;

export const selectCounter = (state)=>state.counter.count;

export default counterSlice.reducer;