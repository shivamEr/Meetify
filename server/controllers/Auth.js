const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

require('dotenv').config();

exports.signup = async(req, res)=>{
    try {
        const existingUser = await User.findOne({email:req.body.email})
        
        // if user already exists
        if(existingUser){
            return res.status(400).json({success:false,"message":"User already exists"})
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt)
        
        
        const user = await User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({ success: true, message: "You registered" });

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Error occured during signup, please try again later"})
    }
}

exports.login = async(req, res)=>{
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({success:false, message:"Please enter valid email or password"})
        }

        const password = req.body.password;
        const isMatch =  await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                error: "Please enter a valid email or password"
            });
        }
        

        const data = {
            user: {
                id: user._id
            }
        }
        // generating token using jwt
        const authtoken = jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.json({success:true, authtoken: authtoken, username:user.name });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

exports.getuser = async (req,res)=>{
    res.send("Token verified");
}