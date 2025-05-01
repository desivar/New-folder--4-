const mongoose = require('mongoose');
const Product = require('./models/productModel');
const User = require('./models/userModel');
const Cart = require('./models/cartModel');
const Order = require('./models/orderModel');
const Category = require('./models/categoryModel');
const connectDB = require('./config/db');

const dotenv = require('dotenv');
dotenv.config();

connectDB();

const seedData = async () => {
  // Clear existing data
  await Product.deleteMany({});
  await User.deleteMany({});
  await Cart.deleteMany({});
  await Order.deleteMany({});
  await Category.deleteMany({});

  // Add categories and products
  const category1 = new Category({ name: 'Art Prints', description: 'Printable artwork' });
  const category2 = new Category({ name: 'Planners', description: 'Printable planners' });
  await category1.save();
  await category2.save();

  const products = [
    { name: 'Abstract Art Print', description: 'Modern abstract art', price: 12.99, category: 'Art Prints', imageUrl: 'https://example.com/art1.jpg' },
    { name: 'Floral Planner', description: 'Floral themed planner', price: 7.99, category: 'Planners', imageUrl: 'https://example.com/planner1.jpg' },
  ];
  await Product.insertMany(products);

  // Add a user
  const user = new User({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    password: 'password123',
  });
  await user.save();

