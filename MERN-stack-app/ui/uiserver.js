const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.UI_SERVER_PORT || 8000;
app.use(express.static('public'));
app.listen(PORT,(err)=>{
    if(err) {
        console.log(err)
    } else {
        console.log(`server started at PORT: ${PORT}`);
    }
})