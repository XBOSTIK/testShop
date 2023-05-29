const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    isActive: Boolean,
})

module.exports = model('Shop', schema);