const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },
    name: { type: String, required: true },
    googleId: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);

