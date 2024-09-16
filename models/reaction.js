const {mongoose, ObjectId} = require('mongoose');


const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: ObjectId,
        default: new ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        validate: {
            validator: function(v){
                return v.length > 280
            },
            message: props => `${props} is too long`
        }
    },
    username: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = reactionSchema;