const express = require('express');
const knex = require('knex'); // 01 - install this npm package and sqlite3
const db = require('../data/dbConfig.js');
// database access using knex
// const db = require('../data/db-config.js');

// 02 - configure the connection

const router = express.Router();

// 03 - complete the endpoint
router.get('/', (req, res) => {
  // use knex get the data from the database
  // select * from posts
  // dbConnection.select('*').from('posts')
  db('accounts')
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id })
    .first()
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'not found' });
      }
    })
    .catch(error => res.status(500).json(error));
});

router.post('/', (req, res) => {
    const newacc = req.body
    db('accounts')
    .insert(newacc, "id").then((newact) => {
        return db('accounts')
        .where({ ...req.body })
        .first()
    }).then((newact) => {
        res.status(200).json(newact)
    })

})

router.put('/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} record(s) updated` });
      } else {
        res.status(404).json({ message: 'not found' });
      }
    })
    .catch(error => res.status(500).json(error));
});

router.delete('/:id', (req, res) => {
  // delete from posts where id = 14
  db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json({ message: `${count} record(s) deleted` });
      // res.status(204).end();
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;
