import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Input, InputLabel, Modal } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import Message from './Components/Message';
import { db, auth } from './firebase';
import firebase from 'firebase'
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function App() {
  const [modalStyle] = React.useState(getModalStyle);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ username: '', message: '' }]);

  useEffect(() => {
    db.collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
    })
  }, [])

  const handleChange = (event) => {
    const inp = event.target.value;
    setInput(inp);
  }
  const sendMessage = (event) => {
    event.preventDefault();
    // To Add messages Locally
    // setMessages([...messages, {username:username, text:input}]);

    //To add messages from Database
    db.collection('messages').add({
      message: input,
      username: user?.displayName,
      email: user?.email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput('');
  }

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser) {
        setUser(authUser)
      } else {
        setUser(null);
      }
    })
    return ()=>{
      unsubscribe();
    }
  },[])

  const signUp = (event)=>{
    event.preventDefault()
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser)=>{return authUser.user.updateProfile({displayName: username})})
    .catch((error)=>{alert(error.message)})
    setOpenSignUp(false);
    setEmail('');
    setUsername('');
    setPassword('');
  }
  
  const signIn = (event)=>{
    event.preventDefault()
    auth.signInWithEmailAndPassword(email, password)
    .catch((error)=>alert(error.message));
    setOpenSignIn(false);
    setEmail('');
    setPassword('');
  }
  
  // ******************************Material Ui Modal styling******************************
  function getModalStyle() {
    const top = 50;
    const left = 50;
    
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes = useStyles();
  // ******************************************************************************************
  
  return(
    <div>
      {
        user?(
          <>
            <div className="App">
            <div className='app__header'>
              <img src='https://seeklogo.com/images/F/facebook-messenger-logo-36376366E2-seeklogo.com.png?w=100&h=100' alt='logo'/>
              <h1>Messenger Clone 🔥🔥</h1>
              <h2>Welcome {user?.displayName}</h2>
            </div>
            <div className='app__button2'>
              <Button color='primary' variant='contained' onClick={()=>auth.signOut()}>Log Out</Button>
            </div>
            <form className='app__form'>
              <FormControl className='app__formControl'>
                <InputLabel className='app__inputLabel'>Type Message</InputLabel>
                <Input value={input} onChange={handleChange} />
                <IconButton className='app__button' disabled={!input} type='submit' onClick={sendMessage} color='primary' variant='contained'>
                  <SendIcon />
                </IconButton>
                {/* <Button className='app__button' disabled={!input} type='submit' onClick={sendMessage} color='primary' variant='contained'>Send</Button> */}
              </FormControl>
            </form>
            <FlipMove>
              {
                messages.map(({ id, message }) => (<Message key={id} username={user?.displayName} email={user?.email} user={user} message={message} />))
              }
            </FlipMove>
          </div>
          </>
        ):(
          <>
            <div className='app__header'>
              <img src='https://seeklogo.com/images/F/facebook-messenger-logo-36376366E2-seeklogo.com.png?w=100&h=100' alt='logo'/>
              <h1>Messenger Clone 🔥🔥</h1>
              <h1>Sign Up for free or Sign In to Chat 🔥🔥</h1>
            </div>
            <div className='app__button1'>
              <Button color='primary' variant='contained' onClick={()=>setOpenSignIn(true)}>Log In</Button>
              <Button color='primary' variant='contained' onClick={()=>setOpenSignUp(true)}>Sign Up</Button>
            </div>
          </>
        )
      }





      {/* Material Ui Modal */}

      <Modal
        open={openSignUp}
        onClose={() => setOpenSignUp(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app__modalForm'>
            <Input type='text' value={email} onChange={(event) => setEmail(event.target.value)} placeholder='Enter your Email' />
            <Input type='text' value={username} onChange={(event) => setUsername(event.target.value)} placeholder='Enter Username' />
            <Input type='password' value={password} onChange={(event) => setPassword(event.target.value)} placeholder='Enter Password' />
            <Button type='submit' onClick={signUp} color='primary' variant='contained'>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app__modalForm'>
            <Input type='text' value={email} onChange={(event) => setEmail(event.target.value)} placeholder='Enter your Email' />
            <Input type='password' value={password} onChange={(event) => setPassword(event.target.value)} placeholder='Enter Password' />
            <Button type='submit' onClick={signIn} color='primary' variant='contained'>Log In</Button>
          </form>
        </div>
      </Modal>

      {/* ******************** */}

      
    </div>
  )
}

export default App;
