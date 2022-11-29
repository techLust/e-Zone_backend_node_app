const express = require('express');
const cors = require('cors');
const app = express();

const userRouter = require('./routers/userRouter');
const signInRouter = require('./routers/signInRouer');

const authJWT = require('./middleware/authJWT');
const verifySignUp = require('./middleware/verifySignUp');

const adminRouter = require('./routers/admin/adminSignupRouter');

//"express.json()" allows us to accept the data in json format from body.
app.use(express.json());

app.use(cors());

//Allow all origin
app.use(cors({
    origin: "*"
}));

app.use('/create/user', verifySignUp.chaeckDuplicateUsernameOrEmail,userRouter);
app.use('/get/user', userRouter);
app.use('/update/user', userRouter);
app.use('/delete/user', userRouter);
app.use('/signin/user', signInRouter);
app.use('/', signInRouter);
app.use('/forgot/password', signInRouter);

//**********// ADMIN //********** */ */
app.use('/create/admin',adminRouter );


module.exports = app;