const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  totalAmount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'abandoned', 'completed'],
    default: 'active',
  },
});

cartSchema.methods.calculateTotal = function () {
  let total = 0;
  this.products.forEach((item) => {
    total += item.product.price * item.quantity;
  });
  this.totalAmount = total;
  this.updatedAt = Date.now();
};

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;

