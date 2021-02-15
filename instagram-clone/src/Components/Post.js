import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import './post.css'
function Post(props) {
    return (
        <div className='post'>
            <div className='post__header'>
                <Avatar />
                <h3 className='post__headerText'>{props.username}</h3>
            </div>
            <img className='post__image' src={props.imageUrl} alt='' />
            <h4 className='post__text'><strong>{props.username}: </strong> {props.caption}</h4>
        </div>
    )
}

export default Post