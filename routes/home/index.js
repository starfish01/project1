var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

router.all('/*', (req, res, next)=>{
  req.app.locals.layout = 'home';
  next();
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home/index', { title: 'Express' });
});

// app login
passport.use(new LocalStrategy({usernameField: 'email'},(email, password, done)=>{
  User.findOne({email: email}).then(user=>{
      if(!user) return done(null, false,{message: 'No user found'});

      bcrypt.compare(password, user.password, (err, match)=>{
          if(err) return err;

          if(match){
              return done(null, user);
          }else{
              return done(null, false, {message: 'incorrect password.'});
          }
      });
  })

}));

// app login

passport.use(new LocalStrategy({usernameField: 'email'},(email, password, done)=>{
  User.findOne({email: email}).then(user=>{
      if(!user) return done(null, false,{message: 'No user found'});
      bcrypt.compare(password, user.password, (err, match)=>{
          if(err) return err;
          if(match){
              return done(null, user);
          }else{
              return done(null, false, {message: 'incorrect password.'});
          }
      });
  })
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login', (req, res, next)=>{
  passport.authenticate('local',{
      successRedirect:'/admin',
      failureRedirect:'/'
  })(req, res, next);
});


router.post('/register', (req, res)=>{
   
  let errors = [];

  if(!req.body.firstName || !req.body.lastName || !req.body.email){
      errors.push({message:'Something went wrong!'})
  }

  if(req.body.password.length <= 5 ){
      errors.push({message:`Passwords must be at least 6 characters`})
  }

  if(req.body.password !== req.body.passwordConfirm){
      errors.push({message: "Password fields don't match"})
  }

  if(errors.length > 0){
      res.render('home/',{
          errors: errors,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email

      
      });
  }else{

      User.findOne({email: req.body.email}).then(user=>{
          if(user){
              // req.flash('error_message', 'That email exists please login');
              res.redirect('/');
          } else {

              const newUser = new User({

                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  email: req.body.email,
                  password: req.body.password
      
              });
      
              bcrypt.genSalt(10, (err, salt)=>{
      
                  bcrypt.hash(newUser.password, salt, (err, hash)=>{
                      if(err) return;

                      
                      newUser.password = hash;
      
                      newUser.save().then(userSaved=>{
      
                          // req.flash('error_message','You are registered now you can login');
      
                          res.render('home/');
                      }).catch(error=>{
                          console.log(error);
                          res.render('home/');
                      });
      
                      
                  })
      
              });

          }
      })
  }
});



module.exports = router;
