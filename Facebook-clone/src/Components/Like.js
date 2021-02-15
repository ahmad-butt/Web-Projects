import React, { useEffect, useState } from 'react'
// import { auth } from '../firebase';

function Like() {

    const [like, setLike] = useState(0);
    const [likeFlag, setLikeFlag] = useState(false);

    const handleLike = ()=>{
            if(!likeFlag) {
                setLike(like+1);
                setLikeFlag(true);
            } else {
                if(like>0) {
                    setLike(like-1);
                    setLikeFlag(false);
                } else {
                    setLike(0);
                    setLikeFlag(false);
                }
            }
    }

    return (
        <div>
            <button onClick={handleLike}>Like</button><p>{like}</p>
        </div>
    )
}

export default Like
