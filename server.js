const path = require('path');
require('dotenv').config();

const movies = require('./routes/api/movies');
const halls = require('./routes/api/halls');
const auth = require('./routes/auth');

const mongoose = require('mongoose');
const cors = require('cors');
require('./modules/auth');
const passport = require('passport');

const session = require('express-session');
const flash = require('connect-flash');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

require('./modules/auth')(passport);

// app.use(express.urlencoded({ extended: true }));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true
  })
);

// Connect to mongo database
mongoose 
  .connect(process.env.mongoURI, { 
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false }) // Adding new mongo url parser 
  .then(() => console.log('MongoDB Connected...')) 
  .catch(err => console.log(err)); 

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());



// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


app.use('/api/halls', halls);
app.use('/api/movies', movies);
app.use('/auth', auth);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => { 
    res.sendFile(path.join(__dirname, 'dist/index.html')) 
}); 

const PORT = process.env.PORT || 4000; 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));