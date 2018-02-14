import mongoose, { Schema, model } from 'mongoose';

mongoose.Promise = global.Promise;

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  full_name: String,
  username: String,
  tel_id: Number,
});

userSchema.pre('save', function (next) {
  if (!this.isModified('first_name') || !this.isModified('last_name')) {
    next(); // skip
    return; // stop
  }
  this.full_name = `${this.first_name} ${this.last_name}`;
  next();
});

export default model('User', userSchema);