require("dotenv").config();
const UserModel = require("../../models/user/signUpUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 8;
const secretKey = process.env.SECRET_ACCESS_KEY;

//************// USER SIGN UP SERVICE //***************/

exports.createUsers = async (req, res) => {
  try {
    //CHECKING DATA
    const { fullName, email, password } = req.body;

    if (!(fullName && email && password))
      return res.status(501).json({ message: "Enter valid details" });

    //ENCRYPTING PASSWORD
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = new UserModel({
      fullName,
      email,
      password: hashedPassword,
    });

    //CREATING JWT TOKEN
    const token = jwt.sign(
      {
        id: userData._id,
      },
      secretKey,
      {
        // expiresIn: '1h', //token expire time.
      }
    );

    //SAVING DATA ON DATABASE
    await userData.save();

    res.status(200).json({
      status: "User sign up successfull",
      data: {
        userData,
      },
      token: token,
    });

    //CATCHING ERROR
  } catch (err) {
    res.status(500).json({
      data: "Failed",
      Message: err.message,
    });
  }
};
