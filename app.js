const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser')

//"express.json()" allows us to accept the data in json format from body.
app.use(express.json());
// Allows restricted resources on a webpage to be requested from another domain outside the domain. 
app.use(cors());
// Parses incoming request with url encoded payloads based on body parser.
app.use(express.urlencoded({ extended: true }));
//SESSION
app.use(session({secret: 'keyboard'})); //take secret form environment variable
//Cookie
app.use(cookieParser());
//STATIC FILES ACCESS
app.use('/uploads', express.static('uploads'));
app.use('/public', express.static('public'))
//SETTING UP EJS
app.set('view engine', 'ejs');


// ROUTER
const adminRouter = require('./routers/admin/adminSignUpRouter');
const vendorRouter = require('./routers/vendor/vendorRouter');
const userRouter = require('./routers/user/userRouter');
const signInRouter = require('./routers/user/signInRouer');

//MIDDLEWARE
const authJWT = require('./middleware/authJWT');
const verifySignUp = require('./middleware/verifySignUp');

//**********// ADMIN ROUTER //********** */
app.use('/create/admin', adminRouter);
app.use('/delete/admin', adminRouter);
app.use('/update/admin', adminRouter);
app.use('/', adminRouter);
app.use('/', adminRouter);

//**********// VENDOR ROUTER //************** */
app.use('/vendor/signup', vendorRouter);
app.use('/', vendorRouter);
app.use('/delete/vendor', vendorRouter);
app.use('/update/vendor', vendorRouter);
app.use('/vendor', vendorRouter);

//**********// USER ROUTER //************ */
app.use('/', signInRouter);
app.use('/', userRouter);
app.use('/create/user', verifySignUp.chaeckDuplicateUsernameOrEmail,userRouter);
app.use('/get/user', userRouter);
app.use('/get/single/', authJWT.verifyToken,userRouter);
app.use('/upload/', authJWT.verifyToken, userRouter)
app.use('/update/user', authJWT.verifyToken, userRouter);
app.use('/delete/user', userRouter);
app.use('/signin/user', signInRouter);
app.use('/send', userRouter)

module.exports = app;