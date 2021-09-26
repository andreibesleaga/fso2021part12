const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  let nrTodos = parseInt( (await redis.getAsync("nrTodos") || 0), 10 )
  redis.setAsync("nrTodos", nrTodos)
  const todos = await Todo.find({})
  res.send(todos);
});


/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  let nrTodos = parseInt( await redis.getAsync("nrTodos"),10 )
  redis.setAsync("nrTodos", nrTodos++)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  // res.sendStatus(405); // Implement this
  if (req.todo) return req.todo
  else return res.sendStatus(404)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  // res.sendStatus(405); // Implement this
  const { id } = req.params
  var query = {'id': id}
  Todo.findOneAndUpdate(query, req.todo.text, {upsert: true}, function(err, doc) {
    if (err) return res.send(500, {error: err})
    return res.send('Succesfully saved.')
  });
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
