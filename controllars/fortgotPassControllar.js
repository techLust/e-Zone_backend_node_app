const userModel = require('../models/signUpUserModel');
const bcrypt = require('bcryptjs');


exports.checkEmail = async (req, res) => {
    try{
        const user = await userModel.findOne({email:req.body.email});
        
        if(user.email) res.status(200).json({
            status: 'User exist',
            message: user.email,
        });
        if(!user.email) res.status(500).json({message: 'User not exist'});
    }
    catch(error){
        res.status(500).json({
        status: 'Email not exist',
        message: error.message,
       }) 
    };
};


exports.forgotPassword = async(req, res)=>{
 try{  
    //Fething email and password from body
    const {password, confirmPassword} = await req.body;
    const userID = await req.params.id;

    if(password === confirmPassword){
        let userPassword = confirmPassword;
        //Encrypting password
        const saltRounds = 8;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(userPassword,salt);

        await userModel.findByIdAndUpdate({_id:userID},{password:hashedPassword});

        res.status(200).json({
        status: 'password reset',
        data: hashedPassword,
    });    
    }else{
        res.json({messae: 'Password not match'});
    }
}
 catch(error){
        console.log(error.message)
        res.status(500).json({
            message: error.message
        });
    };
};