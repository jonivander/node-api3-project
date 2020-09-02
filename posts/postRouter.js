const express = require('express');

const Posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  Posts.find(req.query)
    .then(posts => [
      res.status(200).json(posts)
    ])
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error fetching the posts',
      })
    })
});

router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the post',
      });
    });
});

router.delete('/:id', (req, res) => {
  Posts.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The post has been deleted' })
      } else {
        res.status(404).json({ message: 'The post could not be found' })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error deleting this post'
      })
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Posts.update(req.params.id, changes)
    .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({ message: 'The post could not be found' })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error updating the post',
      });
    });
});

// custom middleware

// function validatePostId(req, res, next) {
//   // do your magic!
// }

module.exports = router;
