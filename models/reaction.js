const mongoose = require('mongoose');


const reactionSchema = new mongoose.Schema({
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    }
});


module.exports = reactionSchema;