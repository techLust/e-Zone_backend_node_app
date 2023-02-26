const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require("body-parser");

//"express.json()" allows us to accept the data in json format from body.
app.use(express.json());
// Allows restricted resources on a webpage to be requested from another domain outside the domain. 
app.use(cors());
// Parses incoming request with url encoded payloads based on body parser.
app.use(express.urlencoded({ extended: true }));

//SESSION
app.use(session({secret: 'keyboard'})); //take secret form environment variable
app.use(passport.initialize());
app.use(passport.session());

//STATIC FILES ACCESS
app.use('/uploads', express.static('uploads'));

//ADMIN ROUTER
const adminRouter = require('./routers/admin/adminSignUpRouter');

//VENDOR ROUTER
const vendorRouter = require('./routers/vendor/vendorRouter');

//USER ROUTER
const userRouter = require('./routers/user/userRouter');
const signInRouter = require('./routers/user/signInRouer');

//MIDDLEWARE
const authJWT = require('./middleware/authJWT');
const verifySignUp = require('./middleware/verifySignUp');

//AUDIO CHAT
//setting up ejs
app.set('view engine', 'ejs');

// app.get('/:room', (req, res) => {
//   res.render('room', { roomId: req.params.room });
// });

//Allow all origin
// app.use(cors({
//   origin: "*"
// }));

//VIDEO CHAT
app.get('/video', (req, res) => {
  //rendering ejs file
  // res.render(path.join(__dirname + '/views/room'))
  res.redirect(`/${uuidv4()}`);
});

// Test route for google login 
const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.send(401);
}

app.get('/', (req, res) => {
  res.send('<a href=""auth/google>Authenticate user</a>')
})

app.get('/google/authenticate', 
  passport.authenticate('google', 
    {
      successRedirect: '/login/success',
      failureRedirect: '/login/failure',
  }
  )
)

app.get('/login/failure', (req, res) => {
  res.send('Something went wrong')
})

app.get('/login/success', isLoggedIn, (req, res) => {
  res.send('Hello')
})

app.get('/logout', (req, res) => {
  res.send('Goodbye');
})

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
app.use('/', vendorRouter);
app.use('/update/vendor', vendorRouter);
app.use('/vendor', vendorRouter);

//**********// USER ROUTER //************ */
app.use('/create/user',
  verifySignUp.chaeckDuplicateUsernameOrEmail,
  userRouter);
app.use('/get/user', userRouter);
app.use('/update/user', userRouter);
app.use('/delete/user', userRouter);
app.use('/signin/user', signInRouter);
app.use('/', signInRouter);
app.use('/', userRouter);

module.exports = app;