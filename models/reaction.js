const mongoose = require('mongoose');


const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now(),
        get: v => v.toLocaleDateString('en-US'),
    }
}, {_id: false});


module.exports = reactionSchema;