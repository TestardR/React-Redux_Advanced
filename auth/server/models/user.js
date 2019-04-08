const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String }
});

// On Save Hook, encrypt password
userSchema.pre('save', async function(next) {
  // get access to the user model
  const user = this;
  try {
    // generate a salt
    const salt = await bcrypt.genSalt(10);
    // hash our password using the salt
    const hash = await bcrypt.hash(user.password, salt);

    // overwrite plain text password
    user.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
