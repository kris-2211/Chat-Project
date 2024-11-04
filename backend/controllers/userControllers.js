const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');
const sendMail = require("../config/NodeMailer");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, picture }  = req.body;

    if (!name || !email || !password) {
        res.sendStatus(400);
        throw new Error("Please Enter all the Fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.send(400);
        throw new Error("User already exists") ;
    } 

    const user = await User.create({
        name, 
        email,
        password,
        picture
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            token: generateToken(user._id)
        });
    } else {
       throw new Error("Failed to Create the User"); 
    }
})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
});

// /api/user?search=sandeep
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ?
        {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } }
            ]
        }
        : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
    
});

const generateOTP = () => {
    return Math.floor(Math.random() * 1000000).toString()
};

const sendOTP = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const otp = generateOTP()
    let mailOptions = {
        from: "forumchatapp@gmail.com",
        to: email,
        subject: "Account Verification",
        html: `<h1 style="color:">Thank you for joining us</h1>
               <p>We are excited to have you on our platform!</p>
               <p>Your OTP for account verification is:</p>
               <h2>${otp}</h2>`,
        text: `Thank you for joining us!
               We are excited to have you on our platform.
               Your OTP for account verification is: ${otp}`,
      };
      await sendMail(mailOptions);  
      res.status(200).json({
        sent: otp,
      });
});


module.exports = { registerUser, authUser, allUsers, sendOTP };