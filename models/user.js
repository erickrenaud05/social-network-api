const mongoose = require('mongoose');
const { Thought } = require('.');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true, validate: {
        validator:  function(v) {
            return /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
    }},
    thoughts: [{ type: mongoose.Types.ObjectId, ref: Thought }],
    friends: [{ type: mongoose.Types.ObjectId, ref: User }]
});

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = mongoose.model('user', userSchema);

module.exports = User;