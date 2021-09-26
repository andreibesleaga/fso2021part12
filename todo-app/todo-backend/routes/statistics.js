const express = require('express');
const router = express.Router();
const redis = require('../redis')

/* GET todos statistics. */
router.get('/', async (_, res) => {
    let nrTodos = parseInt(await redis.getAsync("nrTodos"),10)
    res.json({ "added_todos": nrTodos });
});

module.exports = router;