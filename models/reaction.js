const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types;


const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: ObjectId,
        default: new ObjectId(),
        unique: true,
    },
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
}, { _id: false })

module.exports = reactionSchema;