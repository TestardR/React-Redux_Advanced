const User = require('../models/user');

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
      const saved = await newUser.save();
      res.send(saved);
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
};
