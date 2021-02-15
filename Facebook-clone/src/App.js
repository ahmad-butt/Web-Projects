import './App.css';
import React, { useState, useEffect } from 'react'
import { db, auth } from './firebase'
import { Button, Input, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Posts from './Components/Posts';
import ImageUploader from './Components/ImageUploader';
function App() {
  const [modalStyle] = React.useState(getModalStyle);
  const [username, setUsername] = useState('');
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, post: doc.data() })));
    })
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(auth.currentUser)
      } else {
        setUser(null)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [user, username])

  const signUp = async (event) => {
    event.preventDefault();
    await auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => { return authUser.user.updateProfile({ displayName: username }) })
      .catch((error) => alert(error.message));
    setOpenSignUp(false);
    setEmail('');
    setUsername('');
    setPassword('');
  }

  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then((authUser) => {
      console.log("authUser: ", authUser);
    }).catch((error) => alert(error.message));
    setOpenSignIn(false);
    setUsername('');
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

  return (
    <div className="App">
      <div className='app__header'>
        <img id='app__headerImage' src='https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-1-1.png' alt='' />
        {
          !user ? (
            <div className='app__headerButton'>
              <Button color='primary' variant='contained' onClick={() => setOpenSignUp(true)}>Sign Up</Button>
              <Button color='primary' variant='contained' onClick={() => setOpenSignIn(true)}>Log In</Button>
            </div>
          ) :
            <div className='app__headerButton'>
              <Button color='primary' variant='contained' onClick={() => auth.signOut()}>Log Out</Button>
            </div>
        }
      </div>
      {
        user?(
          <ImageUploader username={user?.displayName} />
        ):(
          <h3></h3>
        )
      }
      {
        posts.map(({ id, post }) => {
          return (
            <Posts key={id} postID={id} user={user} username={post.username} caption={post.caption} imageURL={post.imageURL} />
          )
        })
      }
      

      {/* *************************************Modal************************************* */}

      <Modal
        open={openSignUp}
        onClose={() => setOpenSignUp(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app__form'>
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
          <form className='app__form'>
            <Input type='text' value={email} onChange={(event) => setEmail(event.target.value)} placeholder='Enter your Email' />
            <Input type='password' value={password} onChange={(event) => setPassword(event.target.value)} placeholder='Enter Password' />
            <Button type='submit' onClick={signIn} color='primary' variant='contained'>Log In</Button>
          </form>
        </div>
      </Modal>

      {/* **************************************************************************************** */}

    </div>
  );
}

export default App;
