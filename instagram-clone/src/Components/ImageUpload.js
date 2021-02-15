import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import { db, storage } from '../firebase'
import firebase from 'firebase';
import './imageUpload.css'
function ImageUpload({username}) {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);                                                                                                                                        
    const handleChange = (event)=>{
        if(event.target.files[0]){
            setImage(event.target.files[0])
            console.log(event.target.files[0]);
        }
    }

    const handleUpload = ()=>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            'state_changed',
            (snapshot)=>{
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
                setProgress(progress);
            },
        (error)=>{
            console.log(error.message);
            alert(error.message);
        },
        ()=>{
            storage.ref('images').child(image.name).getDownloadURL().then(url=>{
                db.collection('posts').add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption: caption,
                    username: username,
                    imageUrl: url,
                })
            })
        })
        // setProgress(0);
        // setImage('');
    }
    return (
        <div className='imageUpload'>
            <input type='text' value={caption} placeholder='Write Caption Here' onChange={(event)=>setCaption(event.target.value)}/>
            <input type='file' onChange={handleChange}/>
            <progress value={progress}></progress>
            <Button color='primary' variant='outlined' onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
