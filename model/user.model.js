const dynamoose = require("dynamoose");
const Schema = dynamoose.Schema;
const User = new Schema({
  id: {
    type: Number,
    default: new Date().getTime(),
  },
  userName: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
  },

}, {
  throughput: {
    read: 15,
    write: 5
  },
  timestamps: true
});
module.exports = User;
