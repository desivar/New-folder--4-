const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
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
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'completed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  shippingDate: {
    type: Date,
  },
  deliveredDate: {
    type: Date,
  },
});

orderSchema.methods.addProductToOrder = function (product, quantity) {
  const orderItem = this.products.find(
    (item) => item.product.toString() === product._id.toString()
  );

  if (orderItem) {
    orderItem.quantity += quantity;
    orderItem.price = product.price * orderItem.quantity;
  } else {
    this.products.push({
      product: product._id,
      quantity: quantity,
      price: product.price * quantity,
    });
  }
  this.totalAmount = this.calculateTotal();
};

orderSchema.methods.calculateTotal = function () {
  let total = 0;
  this.products.forEach((item) => {
    total += item.price;
  });
  return total;
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
