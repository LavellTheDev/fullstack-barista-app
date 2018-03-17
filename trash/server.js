const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://demo:democoffee@ds161099.mlab.com:61099/coffee-app', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  var messages = db.collection('messages').find();
  messages.toArray((err,result) =>{
        if (err) return console.log(err)
    //     result.forEach(function(element){
    //     element.total = element.thumbUp - element.thumbDown;
    // });
      res.render('index.ejs', {messages: result})
  })
})

app.post('/messages', (req, res) => {
  db.collection('messages').save({name: req.body.name, order: req.body.order, }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/messages', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate({name: req.body.name, order: req.body.order}, {
    $inc: {
      thumbUp: 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/messages2', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate({name: req.body.name, order: req.body.order}, {
    $inc: {
      thumbDown: 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({name: req.body.name, order: req.body.order}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
