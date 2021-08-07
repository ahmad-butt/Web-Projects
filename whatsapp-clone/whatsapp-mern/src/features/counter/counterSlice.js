import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
    messageFlag: 0,
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setIncrement: (state)=>{
            state.count+=1;
        },
        setMessageFlag: (state)=>{
            state.messageFlag+=1;
        }
    }
})

export  const {setIncrement, setMessageFlag} = counterSlice.actions;

export const selectCounter = (state)=>state.counter.count;
export const selectMessageFlag = (state)=>state.counter.messageFlag;

export default counterSlice.reducer;