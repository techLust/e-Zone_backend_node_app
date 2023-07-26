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


//************// ADD ADDRESS SERVICE //***************/

exports.addAddress = async (req, res) => {
  try{
    const userId = req.params.id
    const userAddress = req.body
    console.log(userId, userAddress)

    const userDetails = await UserModel.findById(userId)
    userDetails.address.push(userAddress)
    userDetails.save()
    return res.status(200).json({status: 'Address save successfull', userDetails})
  }catch(e) {
    console.log(e)
    return res.status(500).json({status: 'Failed to save address', error: e.message})

  }
}

exports.getAddress = async (req, res) => {
  try{
    const userId = req.params.id
    const { address } = await UserModel.findById(userId)
    console.log(address)
    return res.status(200).json({status: 'Address fetched successfull', address})

  }catch(e){
    console.log(e)
    return res.status(500).json({status: 'Failed to save address', error: e.message})

  }
}

