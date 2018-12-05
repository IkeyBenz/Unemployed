const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, select: false },
    bio: { type: String, required: false },
    profilePicture: { type: String, required: false },
    age: { type: Number, required: false },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    type: { type: String, required: true, default: 'user' }
});

UserSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    if (!this.type) {
        this.type = 'user';
    }
    return next();
});

module.exports = mongoose.model('User', UserSchema);
