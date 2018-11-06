const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: '254797094242-5faff3so2l7n0g09c6tq8edrus2saarr.apps.googleusercontent.com',
            clientSecret: 'i8DofZt9vuSwVRCMzcf-H3yR',
            callbackURL: 'http://149.165.170.230.xip.io:3001/auth/google/callback'
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};
