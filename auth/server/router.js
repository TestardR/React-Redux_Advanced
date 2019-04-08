const Authentication = require('./controllers/authentication');

// Model
const User = require('./models/user');

module.exports = function(app) {
  app.get('/', function(req, res) {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.status(404).json({ nousersfound: 'No users found' }));
  });

  app.post('/signup', Authentication.signUp);
};
