const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');

const examplePosts = [
  {
    title: 'Dino Explorer Playset',
    description: 'A fantastic set for aspiring paleontologists, includes various dinosaur figures and a mini excavation kit.',
    author: 'ToyCo',
  },
  {
    title: 'Robot Builder Kit Pro',
    description: 'Learn to code and build your own functional robot with this advanced STEM kit, perfect for ages 10+.',
    author: 'FutureToys',
  },
  {
    title: 'Magical Unicorn Plush',
    description: 'Super soft and cuddly unicorn plush toy with shimmering horn and rainbow mane.',
    author: 'DreamCuddles',
  },
  {
    title: 'Space Adventure Rocket',
    description: 'Launch into imaginary space missions with this sturdy toy rocket, featuring detachable boosters and astronaut figures.',
    author: 'Galaxy Toys',
  },
  {
    title: 'Wooden Block City Set',
    description: 'Classic wooden blocks for building endless structures and fostering creativity in young children.',
    author: 'EcoPlay',
  },
];

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({});

  if (posts.length === 0) {
    // If no posts in DB, return example data
    res.json(examplePosts);
  } else {
    res.json(posts);
  }
});

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  // A post could optionally be linked to a user
  // For simplicity, we'll assign the user's name as author if authenticated
  const author = req.user ? req.user.name : 'Guest Contributor';
  const userId = req.user ? req.user._id : null; 

  const post = new Post({
    title,
    description,
    author,
    user: userId,
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

module.exports = {
  getPosts,
  createPost,
};
