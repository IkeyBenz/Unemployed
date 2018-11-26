const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },
    name: { type: String, required: true },
    googleId: { type: String, required: true },
    bio: { type: String, required: false },
    profilePicture: { type: String, required: false },
    age: { type: Number, required: false },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post'}],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
    
    type: { type: String, required: true, default: 'user' }
});

module.exports = mongoose.model('User', UserSchema);
