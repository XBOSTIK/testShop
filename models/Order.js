const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: { type: Number, default: 1 }
    }
  ],
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: Number, required: true },
  customerAddress: { type: String, required: true },
  totalAmount: { type: Number, default: 0 }
});



module.exports = mongoose.model('Order', schema);