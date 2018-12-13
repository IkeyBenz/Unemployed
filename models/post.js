const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    createdAt: { type: String },
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    postType: { type: String, required: false }
});
// Post type is necessary so we can use this model for posts on feed (created by admin) and posts on threads (creted by user)

PostSchema.pre('find', function(next) {
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const now = `${month}/${day}/${year}`
    this.createdAt = now;
    next();

})


module.exports = mongoose.model('Post', PostSchema);
