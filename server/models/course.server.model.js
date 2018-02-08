const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = mongoose.Schema.Types.ObjectId,
  User = require('./user.server.model');

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  lesson: [{
    number: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  }],
  allowedUsers: [ObjectId],
  pendingUsers: [ObjectId],
  author: ObjectId,
});

CourseSchema.post('remove', (error, course, next) => {
  User.findById(course.author, (error, user) => {
    console.log(course.author);
    console.log(user);
    user.ownCourses.splice(user.ownCourses.indexOf(course._id), 1);
    user.save();
    next();
  })
})

module.exports = mongoose.model('Course', CourseSchema);
