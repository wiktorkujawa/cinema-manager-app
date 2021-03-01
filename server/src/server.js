const path = require('path');
require('dotenv').config();

const movies = require('./routes/api/movies');
const halls = require('./routes/api/halls');
const auth = require('./routes/auth');

const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

const session = require('express-session');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(function(req, res, next) {
  if (!req.user)
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Express session
app.use(
  session({
    secret: process.env.sessionSecret,
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect to mongo database
mongoose 
  .connect(process.env.mongoURI, { 
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false }) // Adding new mongo url parser 
  .then(() => console.log('MongoDB Connected...')) 
  .catch(err => console.log(err)); 


app.use('/api/halls', halls);
app.use('/api/movies', movies);
app.use('/auth', auth);

app.use(express.static(path.join(__dirname, '../../dist')));

app.get('*', (req, res) => { 
    res.sendFile(path.join(__dirname, '../../dist/index.html')) 
}); 

const PORT = process.env.PORT || 4000; 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));