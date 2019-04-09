const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// We want to use jwt and not create a session cookie
const requireAuth = passport.authenticate('jwt', { session: false });

// Model
const User = require('./models/user');

module.exports = function(app) {
  app.get('/', function(req, res) {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(404).json({ nousersfound: 'No users found' }));
  });

  app.get('/auth', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });

  app.post('/signup', Authentication.signUp);
};
