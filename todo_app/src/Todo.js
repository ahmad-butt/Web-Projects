//React functional control with import (rfce)
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Button, Modal, Input } from '@material-ui/core'
import React, { useState } from 'react'
import { db } from './firebase'
import './Todo.css'
function Todo(props) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState([]);
    const handleOpen = ()=>{
        setOpen(true);
    };
    const handleClose = ()=>{
        setOpen(false);
    };
    const updateTodo = ()=>{
        db.collection('todos').doc(props.text.id).set({
            todo: input,
        },{merge:true})
        setInput('');
    }   
    return (
        <>
        <Modal
            open={open}
            onClose={e => setOpen(false)}
            >
            <div>
                <Input placeholder={props.text.todo} value={input} onChange={event => setInput(event.target.value)}/>
                <Button onClick = {e => updateTodo()}>Update Todo</Button>
                <Button onClick = {e => setOpen(false)}>Close</Button>
            </div>
        </Modal>
        <List class='todoList'>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <h3>{`=>`}</h3>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.text.todo} secondary="Let's get this Done" />
            </ListItem>
            <Button onClick = {e => setOpen(true)}>Edit</Button>
            <Button onClick={event => db.collection('todos').doc(props.text.id).delete()} color='secondary'>DELETE TODO</Button>
        </List>
        </>
    )
}

export default Todo
