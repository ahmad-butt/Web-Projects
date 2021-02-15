import './App.css';
import Post from './Components/Post';
import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { Button, Input, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ImageUpload from './Components/ImageUpload';
import InstagramEmbed from 'react-instagram-embed';
function App() {
  const [modalStyle] = React.useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  //UseEffect runs a piece of code depending upon a specific condition

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, post: doc.data() })))
    })
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //if there is User
        console.log(authUser);
        setUser(authUser);

      } else {
        //if there is no User
        setUser(null);
      }
    })
    return () => {
      unsubscribe();
    }
  }, [user, username]);

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

  const signup = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => { return authUser.user.updateProfile({ displayName: username }) })
      .catch((error) => alert(error.message));
    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error.message));
    setOpenSignIn(false);
  }

  return (
    <div className='app'>

      {/* Material Ui Modal */}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <img className='app__headerImage' src='https://assets.website-files.com/5c75b94c8dd1ae50d3b9294b/5d48831280adb734a5db5620_hukglfkfklk%3B-p-500.png' alt='' />
          <form className='app__form'>
            <Input type='text' value={email} onChange={(event) => setEmail(event.target.value)} placeholder='Enter your Email' />
            <Input type='text' value={username} onChange={(event) => setUsername(event.target.value)} placeholder='Enter Username' />
            <Input type='password' value={password} onChange={(event) => setPassword(event.target.value)} placeholder='Enter Password' />
            <Button type='submit' onClick={signup} color='primary' variant='contained'>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <img className='app__headerImage' src='https://assets.website-files.com/5c75b94c8dd1ae50d3b9294b/5d48831280adb734a5db5620_hukglfkfklk%3B-p-500.png' alt='' />
          <form className='app__form'>
            <Input type='text' value={email} onChange={(event) => setEmail(event.target.value)} placeholder='Enter your Email' />
            <Input type='password' value={password} onChange={(event) => setPassword(event.target.value)} placeholder='Enter Password' />
            <Button type='submit' onClick={signIn} color='primary' variant='contained'>Log In</Button>
          </form>
        </div>
      </Modal>

      {/* ******************** */}

      <div className='app__header'>
        <img className='app__headerImage' src='https://assets.website-files.com/5c75b94c8dd1ae50d3b9294b/5d48831280adb734a5db5620_hukglfkfklk%3B-p-500.png' alt='' />
        {
        user ? (<Button onClick={() => auth.signOut()}>Log Out</Button>)
          : (
            <div>
              <Button onClick={() => setOpen(true)} color='warning' variant='outlined'>Sign Up</Button>
              <Button onClick={() => setOpenSignIn(true)} color='warning' variant='outlined'>Log In</Button>
            </div>
          )
        }
      </div>
      <div className='app__posts'>
      {
        posts.map(({ id, post }) => {
          return (
              <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          )
        })
      }
      </div>
      <InstagramEmbed
        url='https://instagr.am/p/Zw9o4/'
        clientAccessToken='123|456'
        maxWidth={320}
        hideCaption={false}
        containerTagName='div'
        protocol=''
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />
      {user ? <ImageUpload username={user.displayName} /> : <h3>Log In to upload pictures</h3>}
    </div>
  );
}
export default App;
