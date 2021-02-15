import { Avatar, Button, Input } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import firebase from 'firebase';
import './Post.css'
import './Like'
import Like from './Like';
function Posts({postID, username, user, imageURL, caption}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');


    useEffect(() => {
        const unsubscribe = db.collection('posts').doc(postID).collection('comments').orderBy('timestamp','asc').onSnapshot(snapshot=>{
            setComments(snapshot.docs.map(doc=>({id: doc.id, comment: doc.data()})));
        })
        return ()=>{
            unsubscribe();
        }
    }, [postID])


    const postComment = ()=>{
        db.collection('posts').doc(postID).collection('comments').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            comment: comment,
            username: user.displayName,
        })
        setComment('');
    }


    return (
        <div className='post'>
            <div className='post__header'>
                <Avatar />
                <h3 className='post__headerText'>{username}</h3>
            </div>
            <div className='post__caption'>{caption}</div>
            <img className='post__image' src={imageURL} alt='' />
            {/* <Like userLiked={user?user.uid:0}/> */}
            {
                comments.map(({id, comment})=>{
                    return(
                        <div className='post__comment'>
                            <div className='post__commentAvatar'>
                                <Avatar />
                            </div>
                            <div className='post__commentText'>
                                <strong>{comment.username}</strong>
                                <p key={id}>{comment.comment}</p> 
                            </div>  
                        </div>
                    )
                })
            }
            <Input value={comment} placeholder='Write Comment' onChange={(event)=>setComment(event.target.value)}/>
            <Button disabled={!comment} color='primary' variant='contained' onClick={postComment}>Post</Button>
        </div>
    )
}

export default Posts
