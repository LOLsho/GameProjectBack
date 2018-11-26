const bcrypt = require('bcryptjs');
const User = require('../models/User');
const authValidator = require('../validators/auth.validator');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');



module.exports.signUp = (req, res) => {
    let userData = req.body;
    let isUserDataCorrect = authValidator.signUp(userData);

    if (!isUserDataCorrect) {
        res.status(400).json({
            message: "The incorrect data received"
        });
    } else {

        User.findOne({
            email: userData.email
        }, (error, user) => {
            if (error) {
                res.status(500).json({
                    message: 'Internal error in finding user'
                });
                console.log(error);
            } else {

                if (user) {
                    res.status(409).json({
                        message: 'This email already exists, try another'
                    });
                } else {

                    const saltForHashingPassword = bcrypt.genSaltSync(10);
                    const hashedPassword = bcrypt.hashSync(userData.password, saltForHashingPassword);

                    let user = new User({
                        email: userData.email,
                        password: hashedPassword
                    });

                    user.save((error, registeredUser) => {
                        if (error) {
                            res.status(500).json({
                                message: 'Error saving user in data base'
                            });
                            console.log(error);
                        } else {

                            console.log('New user has been registered - \n', registeredUser);
                            let payload = {
                                email: registeredUser.email,
                                id: registeredUser._id
                            };
                            const token = jwt.sign(payload, keys.secretKey, {expiresIn: 3600});

                            res.status(200).json({
                                token: `Bearer ${token}`
                            });
                        }
                    });
                }
            }
        });
    }
};



module.exports.signIn = (req, res) => {
    let userData = req.body;
    let isUserDataCorrect = authValidator.signIn(userData);

    if (!isUserDataCorrect) {
        res.status(400).json({
            message: "The incorrect data received"
        });
    } else {

        User.findOne({
            email: userData.email
        }, (error, userFromDb) => {
            if (error) {
                res.status(500).json({
                    message: 'Internal error in finding user'
                });
            } else {

                if (!userFromDb) {
                    res.status(404).json({
                        message: 'There is no specified email'
                    });
                } else {

                    let isPasswordsMatch = bcrypt.compareSync(userData.password, userFromDb.password);
                    if (isPasswordsMatch) {
                        let payload = {
                            email: userFromDb.email,
                            id: userFromDb._id
                        };
                        const token = jwt.sign(payload, keys.secretKey, {expiresIn: 3600});

                        res.status(200).json({
                            token: `Bearer ${token}`
                        });
                    } else {

                        res.status(401).json({
                            message: 'Wrong password. Try again'
                        });
                    }
                }
            }
        });
    }
};