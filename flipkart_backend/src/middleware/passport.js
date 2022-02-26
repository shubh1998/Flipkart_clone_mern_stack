const passport = require("passport");
const User = require("../models/User");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;
opts.passReqToCallback = true; //lets you access the http-request in callback
opts.failWithError = true;

passport.use(
  new JwtStrategy(opts, async function (req, jwt_payload, done) {
    //remove Bearer and fetch the naked JWT
    let token = req.headers.authorization.split(" ")[1];
    
    let userObj;

    if (jwt_payload.role) {
      userObj = await User.findOne({
        auth_token: token,
        user_id: jwt_payload._id,
      })
    }
    if (userObj) {
      const user = {
        _id: userObj._id.toString(),
        firstname: userObj.firstname,
        lastname: userObj.lastname,
        username: userObj.username,
        email: userObj.email,
        role: userObj.role
      }
      return done(null, user);
    } else {
      return done(unauthorizedError("Authentication Failure"));
    }
  })
);
