const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (error, hash) => {
            this.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (password, done) {
    bcrypt.compare(password, this.password, done);
}

module.exports = mongoose.model('User', UserSchema);
