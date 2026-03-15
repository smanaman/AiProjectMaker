const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to the User model (who created this product)
    },
    name: {
      type: String,
      required: [true, 'Please add a product name'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      default: 0,
    },
    imageUrl: {
      type: String,
      required: false, // Image is not strictly required
      default: 'https://via.placeholder.com/300x200?text=No+Image',
    },
    category: {
      type: String,
      required: false, // Category can be optional or pre-defined list
      default: 'General',
    },
    countInStock: {
      type: Number,
      required: [true, 'Please add stock quantity'],
      default: 0,
    },
    // Optional: Add reviews or ratings later
    // reviews: [
    //   {
    //     name: { type: String, required: true },
    //     rating: { type: Number, required: true },
    //     comment: { type: String, required: true },
    //     user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    //   },
    // ],
    // rating: {
    //   type: Number,
    //   required: true,
    //   default: 0,
    // },
    // numReviews: {
    //   type: Number,
    //   required: true,
    //   default: 0,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
