const express = require('express');

const router = express.Router();

const bcrypt = require('bcrypt');

const User = require('../../models/User');

const gravatar = require('gravatar');

const jwt = require('jsonwebtoken');

const passport = require('passport');

const {
    secretOrKey
} = require('../../config/keys');

router.get('/test', (req, res, next) => {
    res.json({
        mas: 'login works'
    });
});

router.post('/register', (req, res, next) => {
    User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user) {
                return res.status(400).json({
                    message: '邮箱已被注册',
                    code: 0
                })
            } else {
                const url = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });
                let newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: url,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        throw (err);
                    } else {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) {
                                throw (err);
                            } else {
                                newUser.password = hash;

                                newUser.save()
                                    .then(user => {
                                        const newUser = {
                                            name: user.name,
                                            email: user.email,
                                            avatar: user.avatar
                                        };
                                        return res.json({
                                            user: newUser,
                                            message: '注册成功',
                                            code: 1
                                        })
                                    })
                                    .catch(err => console.log(err));
                            }
                        });
                    }
                });
            }
        })
});

router.post('/login', (req, res, next) => {
    const email = req.body.email,
        password = req.body.password;

    User.findOne({
        email
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                // user:null,
                message: '用户不存在',
                code: 0
            })
        }

        bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {

                    const rule = {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar
                    };

                    jwt.sign(rule, secretOrKey, {
                        expiresIn: 3600
                    }, (err, token) => {
                        if (err) throw err;
                        return res.json({
                            token: `Bearer ${token}`,
                            message: '登录成功',
                            code: 1
                        })
                    })
                } else {
                    return res.status(404).json({
                        // user: null,
                        message: '登录失败，密码错误',
                        code: 0
                    })
                }
            })
            .catch(err => {
                throw err
            })

    })
});

router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    
});

module.exports = router;