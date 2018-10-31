const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },
    name: { type: String, required: true },
    googleId: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post'}]

});

module.exports = mongoose.model('User', UserSchema);
