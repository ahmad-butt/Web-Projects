import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCounter, setIncrement, setDecrement } from '../features/counter1/counterSlice'

function Counter() {

    const dispatch = useDispatch();

    const counting = useSelector(selectCounter);

    const increment = ()=>{
        let count = 0;
        dispatch(setIncrement(count+1));
    }
    const decrement = ()=>{
        let count = 0;
        dispatch(setDecrement(count-1));
    }

    return (
        <div>
            <h1>This is Counter</h1>
            <h1>{counting}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    )
}

export default Counter
