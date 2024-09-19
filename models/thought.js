const mongoose = require('mongoose');
const reactionSchema = require('./reaction');

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
        type: Date,
        default: Date.now(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        {
            reactionSchema,
        }
    ]
});

thoughtSchema.virtual('reactionCount', function(){
    return this.reactions.length;
});

const Thoughts = mongoose.model('thought', thoughtSchema);

module.exports = Thoughts;
