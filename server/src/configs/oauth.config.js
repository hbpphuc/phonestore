const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/userModel');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const res = await User.findOne({ _id: id });
        done(null, res);
    } catch (error) {
        done(error);
    }
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.OAUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/v1/users/login/google/redirect',
            scope: ['email', 'profile'],
        },
        async (accessToken, refreshToken, profile, done) => {
            if (profile.id) {
                const user = await User.findOne({
                    googleId: profile.id,
                    authType: 'google',
                });

                if (user) {
                    done(null, user);
                } else {
                    const newUser = new User({
                        name: profile._json.name,
                        email: profile._json.email,
                        photo: profile._json.picture,
                        googleId: profile._json.sub,
                        authType: 'google',
                    });

                    await newUser.save({ validateBeforeSave: false });

                    done(null, newUser);
                }
            } else done('Oops! Something wrong...');
        }
    )
);
