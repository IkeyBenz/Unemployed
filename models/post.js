const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    createdAt: { type: Date, defualt: Date.now() },
    title: { type: String },
    content: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
    postType: { type: String, required: true } // This is necessary so we can use this model for posts on feed (created by admin) and posts on threads (creted by user)
});

module.exports = mongoose.model('Post', PostSchema);
