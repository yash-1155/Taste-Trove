/* eslint-disable no-undef */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const adminUser = require('../models/admin.js');
const gooUser = require('../models/user.js');
const { compareSync } = require('bcrypt');
require('dotenv').config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user1 = await adminUser.findById(id) || await gooUser.findById(id);
        if (user1) {
            return done(null, user1);
        }
    } catch (err) {
        done(err);
    }
});

passport.use('local-admin', new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, async (email, password, done) => {
    try {
        const user = await adminUser.findOne({ email });
        if (!user || !compareSync(password, user.password)) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

passport.use('google-admin', new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const currentUser = await adminUser.findOne({ googleId: profile.id });
        if (currentUser) {
            console.log('Admin user is: ', currentUser);
            done(null, currentUser);
        } else {
            new adminUser({
                name: profile.displayName,
                googleId: profile.id
            }).save().then((newUser) => {
                console.log('Created new admin user: ', newUser);
                done(null, newUser);
            });
        }
    } catch (err) {
        done(err);
    }
}));

passport.use('local-user', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const originalUrl = req.originalUrl;
        console.log(originalUrl)
        const user = await gooUser.findOne({ email });
        if (!user || !compareSync(password, user.password)) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

passport.use('google-user', new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const currentUser = await gooUser.findOne({ googleId: profile.id });
        if (currentUser) {
            console.log('User is: ', currentUser);
            done(null, currentUser);
        } else {
            new gooUser({
                name: profile.displayName,
                googleId: profile.id
            }).save().then((newUser) => {
                console.log('Created new user: ', newUser);
                done(null, newUser);
            });
        }
    } catch (err) {
        done(err);
    }
}));

module.exports = passport;
