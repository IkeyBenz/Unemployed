const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//comments go on post... Post contains arr of comments
const CommentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    content: { type: String, required: true},
    postId: { type: Schema.Types.ObjectId, ref: 'Post' }
})



CommentSchema.pre('save', function(next) {
    if(this.content === null) {
        console.log('ERROR, Comment must have content.')
    } else {
        return next();
    }
});


module.exports = mongoose.model('Comment', CommentSchema)
