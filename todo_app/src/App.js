import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './Todo'
import './App.css';
import Todo from './Todo';
import { db } from './firebase';
import firebase from 'firebase'

function App() {
  const [todos, setTodos] = useState([]); //Short term memory. JS Hook
  const [input, setInput] = useState('');
  console.log(input);
  useEffect(()=>{   //Two parameters function and dependency. Function to get data from Database and dependency which enable it to load everytime the dependancy occur.
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo})));
    })
  },[]);
  const addTodo = (event)=>{  //This function add TODO to Database
    event.preventDefault();
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    // setTodos([...todos,input]); //spread function which appends todo state
    setInput(''); //Clear input after hitting submit
  }
  return (
    <div className="App">
      <h1>Welcome to TODO App!!!</h1>
      <form>
        <FormControl>
          <InputLabel >Write TODO</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>
        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">Add TODO</Button>
      </form>
      <ul>
        {todos.map(todo=>(
          <Todo text={todo}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
//Important things are state and props
// JSX,we can write dynamic javascript aswell
//state => short term memory when we refresh the state is cleared
//props allows us to differentiate one component from another