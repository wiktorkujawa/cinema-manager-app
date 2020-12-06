const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


const register = async (req, res) => {

  const { username, email, password, password2} = req.body;
  let errors = [];
  if (!username || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (undefined !== password && password.length < 8) {
    errors.push({ msg: 'Password must be at least 8 characters' });
  }

  if (errors.length > 0) {
    res.status(400).json(errors);
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });

        res.status(409).json(errors);
      } else {
          const user = new User({
            email: email,
            username: username,
            password: User.hashPassword(password)
          }).save();
          return res.status(201).json({msg: 'Resgistration success'});
        }
      })
    }


 





  
}

const isValidUser = (req,res,next) => {
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorized Request'});
}

router.post('/register', function (req, res, next) {
  register(req, res);
});


router.post('/login', (req,res,next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message:'Login Success'});
    });
  })(req, res, next);
});

router.get('/user',isValidUser, (req,res,next) => {
  return res.status(200).json(req.user);
});

router.get('/logout',isValidUser, (req,res,next) => {
  req.logout();
  return res.status(200).json({message:'Logout Success'});
  // res.redirect('/auth/login');
})



module.exports = router;