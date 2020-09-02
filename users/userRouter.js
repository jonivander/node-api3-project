const express = require('express');

const Users = require('./userDb'); 

const router = express.Router();

router.post('/', (req, res) => {
  Users.insert(req.body)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error creating the user'
        })
    });
});

router.post('/:id/posts', (req, res) => {
  const post = req.body;
    const id = Number(req.params.id);
    post.post_id = id;
    Users.insert(post)
    .then((post) => {
        if (post) {
            res.status(201).json(post);
        } else {
            res.status(400).json({ message: 'Bad Request' })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error adding the post to this user',
        });
      });
});

router.get('/', (req, res) => {
  Users.find(req.query)
  .then(users => [
      res.status(200).json(users)
  ])
  .catch(error => {
      console.log(error);
      res.status(500).json({ 
          message: 'Error fetching the users',
       })
  })});

router.get('/:id', (req, res) => {
  Users.findById(req.params.id)
  .then(user => {
      if (user) {
          res.status(200).json(user);
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  })
  .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the user',
      });
    });
});

router.get('/:id/posts', (req, res) => {
  let posts = req.query
  Users.getUserPosts(req.params.id)
    .then((user) => {
        if (user) {
            res.status(200).json(posts)
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error adding the comment to this user',
        });
      });
});

router.delete('/:id', (req, res) => {
  Users.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: 'The user has been deleted' })
        } else {
            res.status(404).json({ message: 'The user could not be found' })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error deleting this user'
        })
    });
});

router.put('/:id', validateUserId,(req, res) => {
  const changes = req.body;
  Users.update(req.params.id, changes)
  .then(user => {
      if (user) {
          res.status(200).json(user)
      } else {
          res.status(404).json({ message: 'The user could not be found' })
      }
  })
  .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error updating the user',
      });
    });});

//custom middleware

function validateUserId(req, res, next) {
  if (user.id === id) {
    //res.status(201)
  }
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
