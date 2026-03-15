const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

/**
 * @desc    Create a product
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  // req.user will be available from protect middleware
  // Ensure only admin can create products
  if (!req.user || !req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized as an admin to create products');
  }

  const { name, description, price, imageUrl, category, countInStock } = req.body;

  if (!name || !description || !price || !countInStock) {
    res.status(400);
    throw new Error('Please enter all required product fields');
  }

  const product = new Product({
    user: req.user._id, // Assign the product to the admin user who created it
    name,
    description,
    price,
    imageUrl,
    category,
    countInStock,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  // Ensure only admin can update products
  if (!req.user || !req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized as an admin to update products');
  }

  const { name, description, price, imageUrl, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.imageUrl = imageUrl || product.imageUrl;
    product.category = category || product.category;
    product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  // Ensure only admin can delete products
  if (!req.user || !req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized as an admin to delete products');
  }

  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id }); // Use deleteOne with query object
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
