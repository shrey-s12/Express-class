const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');
const User = require('../models/userModel');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('author', "name email");
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/:id", async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newPost = new Post({ title, content, author: user._id });
        const post = await newPost.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Post.findByIdAndDelete(id);
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;