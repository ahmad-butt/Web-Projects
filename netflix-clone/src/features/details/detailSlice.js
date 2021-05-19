import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    background: '',
    title: '',
    description: '',
    date: '',
    voteAverage: '',
    popularity: '',
    voteCount: '',
}

const detailSlice = createSlice({
    name: 'detail',
    initialState,
    reducers: {
        setDetails: (state,action)=>{
            state.background = action.payload.background;
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.date = action.payload.date;
            state.voteAverage = action.payload.voteAverage;
            state.popularity = action.payload.popularity;
            state.voteCount = action.payload.voteCount;
        }
    }
})

export const {setDetails} = detailSlice.actions;

export const selectBackground = (state)=>state.detail.background;
export const selectTitle = (state)=>state.detail.title;
export const selectDescription = (state)=>state.detail.description;
export const selectDate = (state)=>state.detail.date;
export const selectVoteAverage = (state)=>state.detail.voteAverage;
export const selectPopularity = (state)=>state.detail.popularity;
export const selectVoteCount = (state)=>state.detail.voteCount;

export default detailSlice.reducer;

