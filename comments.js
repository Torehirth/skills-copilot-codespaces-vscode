// Create web server that listens on port 3000
// Create a POST route on '/comments' that accepts JSON data
// When a POST request is made to '/comments' save the JSON data to a file called comments.json
// When a GET request is made to '/comments' read the file comments.json and send the data back as JSON

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const COMMENTS_FILE = path.resolve(__dirname, 'comments.json');

app.post('/comments', (req, res) => {
  fs.writeFile(COMMENTS_FILE, JSON.stringify(req.body), (err) => {
    if (err) {
      res.status(500).send('Error saving comments');
    } else {
      res.status(201).send('Comments saved');
    }
  });
});

app.get('/comments', (req, res) => {
  fs.readFile(COMMENTS_FILE, (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
