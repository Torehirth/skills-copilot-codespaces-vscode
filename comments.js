// create web server 
// create a route for POST /comments
// create a route for GET /comments
// create a route for GET /comments/:id
// create a route for DELETE /comments/:id

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let comments = [
  { id: 1, body: "Hello World", postId: 1 },
  { id: 2, body: "My Second Comment", postId: 1 },
  { id: 3, body: "Another Comment", postId: 2 }
];

let id = 4;

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.get('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) res.status(404).send('The comment with the given ID was not found');
  res.json(comment);
});

app.post('/comments', (req, res) => {
  const comment = {
    id: id++,
    body: req.body.body,
    postId: req.body.postId
  };
  comments.push(comment);
  res.json(comment);
});

app.delete('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) res.status(404).send('The comment with the given ID was not found');
  const index = comments.indexOf(comment);
  comments.splice(index, 1);
  res.json(comment);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});