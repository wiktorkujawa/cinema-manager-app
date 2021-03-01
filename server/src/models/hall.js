const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const hallSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    taken_sessions: [ 
        {
            movie: {
                type: String,
                required: true
            }
            ,
            start: {
                type: Date,
                required: true
            },
            end: {
                type: Date,
                required: true
            } 
        }
    ]
})

module.exports = Hall = mongoose.model('hall', hallSchema);