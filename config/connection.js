const mongoose = require('mongoose');

try {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetwork');
} catch (error) {
    console.log(error);
    return;
}

module.exports = mongoose.connection;