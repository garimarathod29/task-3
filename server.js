const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Todo = require('./models/todoSchema');
const port = 3001;

const app = express();

mongoose.connect('mongodb+srv://garimarathod05:Todoapp@cluster0.3pxj4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });


const Todoapp = mongoose.model('Todoapp', {
  accomplish: String
});


app.use(cors())
app.use(bodyParser.json())




app.post('/tasks', (req, res) => {
  const todo = new Todo({ accomplish: req.body.accomplish });
  todo.save()
    .then((todo) => {
      res.json(todo);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Unable to create task' });
    });
});


app.get('/tasks', (req, res) => {
  Todo.find()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Unable to get tasks' });
    });
});


app.put('/tasks/:id', (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, { accomplish: req.body.accomplish }, { new: true })
    .then((todo) => {
      res.json(todo);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Unable to update task' });
    });
});

app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params
    const { accomplish } = req.body
    const deletedTask = Todo.findByIdAndDelete(id, 
        { accomplish },
        { value: true })
        .then((deletedTask) => {
            res.json({ message: 'Task was successfully DELETED' })
        })
        .catch((error) => {
            res.json({ message: 'Unable to delete task:', error })
        })
})


app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
