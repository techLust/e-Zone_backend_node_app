const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const bodyParser = require('body-parser');


const userRouter = require('./routers/userRouter');
const signInRouter = require('./routers/signInRouer');

const authJWT = require('./middleware/authJWT');
const verifySignUp = require('./middleware/verifySignUp');
const { uploadAvatar } = require('./middleware/uploadImage')

const adminRouter = require('./routers/admin/signUp');

//"express.json()" allows us to accept the data in json format from body.
app.use(express.json());
// app.use(express.urlencoded({extended:true}))
app.use(cors());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: true }));

//SETTING UP ejs
app.set('view engine', 'ejs');
app.use(express.static('uploads'))

//Allow all origin
app.use(cors({
  origin: "*"
}));

//VIDEO CHAT
app.get('/video', (req, res) => {
  //rendering ejs file
  // res.render(path.join(__dirname + '/views/room'))
  res.redirect(`/${uuidv4()}`);
});

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room });
});


app.use('/create/user',
  verifySignUp.chaeckDuplicateUsernameOrEmail,
  uploadAvatar.single("upload_file"),
  userRouter);
app.use('/get/user', userRouter);
app.use('/update/user', userRouter);
app.use('/delete/user', userRouter);
app.use('/signin/user', signInRouter);
app.use('/', signInRouter);
app.use('/forgot/password', signInRouter);

//**********// ADMIN //********** */ */
app.use('/create/admin', adminRouter);
app.use('/',adminRouter);


module.exports = app;