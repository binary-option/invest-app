const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const index = require("./routes/index");
const users = require("./routes/users");
const authRoutes = require("./routes/auth");

const passport = require("passport");
const User = require("./models/user");
const config = require("./config");
const { Strategy, ExtractJwt } = require("passport-jwt");

mongoose.connect("mongodb://localhost/invest-app");

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:8080"
  })
);

passport.initialize();
// Create the strategy for JWT
const strategy = new Strategy(
  {
    // this is a config we pass to the strategy
    // it needs to secret to decrypt the payload of the
    // token.
    secretOrKey: config.jwtSecret,
    // This options tells the strategy to extract the token
    // from the header of the request
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  (payload, done) => {
    // payload is the object we encrypted at the route /api/token
    // We get the user id, make sure the user exist by looking it up
    console.log("In Strategy");
    User.findById(payload.id).then(user => {
      if (user) {
        // make the user accessible in req.user
        done(null, user);
      } else {
        done(new Error("User not found"));
      }
    });
  }
);
// tell pasport to use it
passport.use(strategy);

// Uncomment this when we start working on the protected parts of the app
// app.use("/api", (req, res, next) => {
//   passport.authenticate("jwt", config.jwtSession, (err, user, fail) => {
//     req.user = user;
//     if (err) {
//       next(err);
//     } else {
//       next();
//     }
//   })(req, res, next);
// });

app.use("/api/me", (req, res) => {
  res.json(req.user);
});

app.use("/", index);
app.use("/api", authRoutes);
app.use("/api/users", users);

// This is an example of protected route
app.get(
  "/api/secret",
  // this is protecting the route and giving us access to
  // req.user
  passport.authenticate("jwt", config.jwtSession),
  (req, res) => {
    // send the user his own information
    res.json(req.user);
  }
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
