const JwtStrategy = require('passport-jwt').Strategy;

const ExtractJwt = require('passport-jwt').ExtractJwt;

const {
    secretOrKey
} = require('../config/keys');

const mongoose = require('mongoose');

const User = mongoose.model('users');

let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // console.log(jwt_payload)
        User.findById(jwt_payload.id).then(user => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }).catch(err => console.log(err));
    }));
}