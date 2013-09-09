var express = require('express'), 
	db = require('./db'),
	plans = require('./routes/plans');

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;


var app = express();

app.configure(function () {
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.session({ secret: 'keyboard cat' }));
	app.use(passport.initialize());
  app.use(passport.session());
});

// configuration data
var FACEBOOK_APP_ID = '368679433263598';
var FACEBOOK_APP_SECRET = '18669d24476ea12c52f10aa56f49cc59';

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      var query = User.findOne({ 'fbId': profile.id });
      query.exec(function (err, oldUser) {
        console.log(oldUser);
        if(oldUser) {
          console.log('User: ' + oldUser.name + ' found and logged in!');
          done(null, oldUser);
        } else {
          var newUser = new User();
          newUser.fbId = profile.id;
          newUser.name = profile.displayName;
          newUser.email = profile.emails[0].value;

          newUser.save(function(err) {
            if(err) {throw err;}
            console.log('New user: ' + newUser.name + ' created and logged in!');
            done(null, newUser);
          }); 
        }
      });
    });
  }
));


app.get('/plans', plans.findAll);
app.get('/plans/:id', plans.findById);

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.listen(3000);
console.log('The best plan is waiting for you on port 3000...');