import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import logger from 'morgan';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// Set up the express app and middleware
const app = express();

// set morgan to log info about our requests for development use.
app.use(logger('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access
// the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us
// track the logged-in user across sessions.
app.use(session({
  key: 'user_sid',
  resave: false,
  saveUninitialized: false,
  secret: process.env.MY_SUPER_SECRET,
  cookie: { maxAge: 600000 }
}));

// If user's cookie is still saved in browser but user is not set,
// log the user out.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

// Require our routes
require('./routes')(app);

export default app;
