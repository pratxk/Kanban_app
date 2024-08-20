const express = require('express');
const userModel = require('../models/user.model');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth.middleware');
const blacklistModel = require('../models/blacklist.model');


userRouter.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hash = await bcrypt.hash(password, 5);
        const user = new userModel({
            name,
            email,
            password: hash,
            role
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({
            message: 'Error occurred during User Creation',
            error: error.message
        });
    }
});



userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await userModel.findOne({ email });
        const role = user.role;
        if (!user) {
            return res.status(400).json({
                message: 'Email is not Correct',
            })
        }
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    return res.status(500).json({ message: 'Error during password comparison' });
                }
                if (result) {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SecretKEY1, { expiresIn: '1day' });
                    res.status(200).json({
                        message: "User LoggedIN successfully",
                        token,
                        role
                    });
                } else {
                    res.status(401).json({ message: 'Incorrect Password' });
                }
            });
            
        }

    } catch (error) {
        res.status(500).json({
            message: 'Error occured during login',
            error
        })
    }
});


userRouter.get('/logout', auth, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const BlackListed_Token = new blacklistModel({
        token
    })
    await BlackListed_Token.save();
    res.send('Logout Successfull');
});
// Assuming you have an endpoint like this:
userRouter.get('/me', auth, async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data' });
    }
});

// userRouter.get('/get-accessToken', (req, res) => {
//     const refreshToken = req.headers.authorization.split(' ')[1];
//     jwt.verify(refreshToken, process.env.JWT_SecretKEY2, function (err, decoded) {
//         if (decoded) {
//             const accessToken = jwt.sign({ name: decoded.name, role: decoded.role }, process.env.JWT_SecretKEY1, { expiresIn: '20m' });
//             res.status(200).json({
//                 message: 'Access token generated successfully',
//                 accessToken
//             })
//         }
//     })
// })


module.exports = userRouter;