const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.OAUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/v1/users/login/google/redirect',
        },
        (accessToken, refreshToken, profile, done) => {
            console.log({ accessToken, refreshToken, profile, done });
        }
    )
);
