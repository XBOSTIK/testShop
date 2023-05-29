const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  }
});

module.exports = mongoose.model('Product', productSchema);