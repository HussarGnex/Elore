const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  course: {
    type: [ObjectId],
  },
  ownCourses: [ObjectId],
  admin: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('User', UserSchema);
