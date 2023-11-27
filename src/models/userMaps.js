const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

userSchema.pre('save', async function(next) {
  const user = this;
  if(user.isModified('password')) {
    const saltRound = 10;
    user.password = await bcrypt.hash(user.password, saltRound);
  }
  next();
})

const User = mongoose.model('User', userSchema)

module.exports = User;
