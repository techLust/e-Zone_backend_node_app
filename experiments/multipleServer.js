const express = require('express');
// const app = new Array(3);
const app = express()

const mailService = require('./controllars/user/forgotPassController');


// for(let i = 3000; i < 3005; i++){
//     app[i] = express();
//     app[i].listen(i, ()=>console.log('Server running on ', i));
// };

app.use('/forgot/password',mailService.forgotPassword)

app.listen(4000, () => console.log('Server runnign on port 4000'))