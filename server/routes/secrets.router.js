const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// imputing in rejectAuthenticated as middleware, making sure
// a user is authenticated before going ahead
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('req.user:', req.user);
  pool
    .query(
      `SELECT * FROM "secret" WHERE
        ${req.user.clearance_level} >= secret.secrecy_level;`
    )//Make sure that you test out your query in SQL before implementing it above.
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
});

// The above is the changed version,
// We would use a if & else statement but that has already
// been done for us in modues>authentication-middleware

// router.get('/', (req, res) => {
//         console.log('req.user:', req.user);
//         pool.query('SELECT * FROM "secret";')
//             .then(results => res.send(results.rows))
//             .catch(error => {
//                 console.log('Error making SELECT for secrets:', error);
//                 res.sendStatus(500);
//             });

// });

module.exports = router;
