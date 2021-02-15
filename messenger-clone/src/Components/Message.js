import React, { forwardRef } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import './message.css'
const Message = forwardRef(({ message, email }, ref) => {
    const isUser = email === message.email;
    return (
        <div className={`message ${isUser && 'message__user'}`} ref={ref}>
            <Card id={isUser ? 'message__userCard' : 'message__guestCard'}>
                <CardContent>
                    <Typography
                        color='white'
                        variant='h5'
                        component='h2'
                    >
                        {!isUser && `${message.username}: `} {message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
})

export default Message