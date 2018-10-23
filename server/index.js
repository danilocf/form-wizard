const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
let db

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
  if (err) throw err
  db = client.db('tg')
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})

// * * * * * * * * *
// USER
// * * * * * * * * *
app.post('/user', (req, res) => {
  const user = {
    name: req.body.name,
    cpf: req.body.cpf
  }

  db.collection('user').insertOne(user, (err, result) => {
    if (err) throw err
    console.log('user added succesfully', result.ops)
    res.send('user added succesfully')
  })
})

app.get('/user', (req, res) => {
  db.collection('user').find({}).toArray((err, result) => {
    if (err) throw err
    console.log('user', JSON.stringify(result))
    res.send(result)
  })
})

app.get('/user/:id', (req, res) => {
  const id = req.params.id
  const query = { '_id': ObjectID(id) }

  db.collection('user').find(query).toArray((err, result) => {
    if (err) throw err
    console.log('user', JSON.stringify(result))
    res.send(result)
  })
})

app.put('/user/:id', (req, res) => {
  const id = ObjectID(req.params.id)

  db.collection('user').updateOne({ '_id': id }, { '$set': req.body }, (err, result) => {
    if (err) throw err
    console.log('user updated succesfully')
    res.send('user updated succesfully')
  })
})

app.delete('/user/:id', (req, res) => {
  const id = ObjectID(req.params.id)

  db.collection('user').deleteOne({ '_id': id }, (err, result) => {
    if (err) throw err
    console.log('user deleted succesfully')
    res.send('user deleted succesfully')
  })
})

// * * * * * * * * *
// FORM
// * * * * * * * * *
app.get('/config', (req, res) => {
  db.collection('form').find({}).toArray((err, result) => {
    if (err) throw err
    res.send(result)
  })
})