const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  poster: {
    type: String
  },
  description: {
    type: String,
    },
  duration: {
    type: Number,
    required: true
  }
})

module.exports = Movie = mongoose.model('movie', movieSchema);