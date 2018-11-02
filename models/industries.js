const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IndustrySchema = new Schema ({
    name: { type: String, required: true }
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    feed: { type: Schema.Types.ObjectId, ref: 'Feed' },
    threads: [{ type: Schema.Types.ObjectId, ref: 'Thread' }]
});

module.exports = mongoose.model('Industry', IndustrySchema);
