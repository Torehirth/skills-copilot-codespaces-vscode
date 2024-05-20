// create web server
const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
const PORT = 3000
// connect to the database
const mongoose = require('mongoose')
const Comment = require('./models/comment')
const DB_URL = 'mongodb://localhost:27017/comment'
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Connected to MongoDB')
})
// configure the template engine
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.urlencoded({ extended: true }))
// set up the routes
app.get('/', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      console.error(err)
      return
    }
    res.render('index', { comments })
  })
})
app.post('/', (req, res) => {
  const comment = new Comment(req.body)
  comment.save((err, comment) => {
    if (err) {
      console.error(err)
      return
    }
    res.redirect('/')
  })
})
// start the server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})