const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config/keys');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // sub for subjet, iat for issued at time
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signUp = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      res.status(422).send({ error: 'Email already in use' });
    }

    const newUser = new User({
      email: email,
      password: password
    });

    try {
      const savedUser = await newUser.save();
      // res.send(savedUser);
      res.json({ token: tokenForUser(savedUser) });
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
};
