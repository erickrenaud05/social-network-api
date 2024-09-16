const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        validate: { 
            validator: function(v){
                return v.length > 1 && v.length < 280
            },
            message: props => `${props.value} is not a valid thought!` 
        },
    },
    createdAt: {
        type: Date.new(),
    },
    username: {
        type: String,
        required: true,
    },
    // reactions: [
    //     {
    //         reactionSchema,
    //     }
    // ]
});

const Thoughts = mongoose.model('thought', thoughtSchema);

module.exports = Thoughts;
