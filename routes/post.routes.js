const express = require('express');
const router = express.Router();

const post = require('../models/post.model.js');
const mid = require('../helpers/middlewares.js');

//  All posts
router.get('/', async (req, res) => { 
    await post.getPosts()
    .then(posts => res.json(posts))
    .catch(err => {
        if (err.status) {
            res.statusCode = err.status;
        } else {
            res.statusCode = 500;
        }
        // We shield our clients from internal errors, but log them
        console.error(err);
        return json({ message: 'Failed to retrieve posts!' });
    });
});

//  Insert a new post
router.post('/', mid.checkPostFields, async (req, res) => {
    await post.insertPost(req.body)
    .then(post => {
        // The request created a new resource object
        // The result of CREATE should be the same as GET
        res.status(201).json({
            message: `The post #${post.id} has been created`,
            content: post
        });
    })
    .catch(err => {
    // We shield our clients from internal errors, but log them
    console.error(err);
    return res.status(500).json({ message: 'Failed to create post!'});
    });
});

//  A post by Id
router.get('/:id', mid.mustBeInteger, async (req, res) => { 
    const id = req.params.id;
    await post.getPost(id)
    .then(post => res.json(post))
    .catch(err => {
        if (err.status) {
            res.statusCode = err.status;
        } else {
            res.statusCode = 500;
        }
        // We shield our clients from internal errors, but log them
        console.error(err);
        return json({ message: 'Failed to retrieve post!' });
    });
});

//  Update post by Id
router.patch('/:id', mid.mustBeInteger, mid.checkPostFields, async (req, res) => {
    const id = req.params.id;    
    await post.updatePost(id, req.body)
    .then(post => res.json({
        message: `The post #${id} has been updated`,
        content: post
    }))
    .catch(err => {
        if (err.status) {
            res.statusCode = err.status;
        } else {
            res.statusCode = 500;
        }
        // We shield our clients from internal errors, but log them
        console.error(err);
        return json({ message: 'Failed to delete post!' });
    });
});

//  Delete post by Id
router.delete('/:id', mid.mustBeInteger, async (req, res) => {
    const id = req.params.id; 
    await post.deletePost(id)
    .then((post) => {
        res.json({message: `The post #${id} has been deleted.`});
    })
    .catch(err => {
        if (err.status) {
            res.statusCode = err.status;
        } else {
            res.statusCode = 500;
        }
        // We shield our clients from internal errors, but log them
        console.error(err);
        return json({ message: 'Failed to delete post!' });
    });
});

module.exports = router;
