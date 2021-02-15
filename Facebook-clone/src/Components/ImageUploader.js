import { Button, Input } from '@material-ui/core';
import React, { useState } from 'react'
import { db, storage } from '../firebase';
import firebase from 'firebase';

function ImageUploader(props) {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState('');
    const [progress, setProgress] = useState(0);

    const handleImageAsFile = (event) => {
        const image = event.target.files[0]
        setImage(image);
        console.log(image);
    }


    const handleUpload = () => {
        if (image === '') {
            alert(`Please Select an Image ${typeof (image)}`);
        } else {
            const uploadImage = storage.ref(`images/${image.name}`).put(image);
            uploadImage.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                    console.log(snapshot)
                },
                (error) => {
                    alert(error.message)
                },
                () => {
                    storage.ref('images').child(image.name).getDownloadURL().then(URL =>
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageURL: URL,
                            username: props.username,
                        })
                    )
                }
            )
        }
        setCaption('');
    }
    return (
        <div id='app__uploader'>
            <Input value={caption} type='text' onChange={(event) => setCaption(event.target.value)} placeholder='Write Caption' />
            <Input id='file' type='file' onChange={handleImageAsFile} />
            <progress value={progress}></progress>
            <Button Button color='primary' variant='outlined' onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUploader