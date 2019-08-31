const express = require('express');

const router = express.Router();

const User = require('../../models/User');

router.get('/test', (req, res, next) => {
    res.json({
        mas: 'login works'
    });
});

router.post('/register', (req, res, next) => {
    User.findOne({
            email: req.body.emai
        })
        .then((user) => {
            if (user) {
                return res.status(400).json({
                    message: '邮箱已被注册',
                    code: 0
                })
            } else {
                const newUser = new User({
                    name: req.body.uaerName,
                    email: req.body.email,
                    avatr,
                    password: req.body.password
                })
            }
        })
});

module.exports = router;