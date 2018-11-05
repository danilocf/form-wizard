const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const isCpf = require('./validation').isCpf
let db

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
  if (err) throw err
  db = client.db('tg')
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})

// * * * * * * * * * * * * * * *
// * FORM
// * * * * * * * * * * * * * * *
app.get('/config', (req, res) => {
  db.collection('form').find({}).toArray((err, result) => {
    if (err) {
      console.log('err', err)
      return res.status(500)
    }
    res.send(result)
  })
})

// * * * * * * * * * * * * * * *
// * USER
// * * * * * * * * * * * * * * *
app.post('/user', (req, res) => {
  const data = req.body
  const cpf = data.cpf && data.cpf.trim()
  if (!cpf) return res.status(402).send('cpf not found')
  if (!isCpf(cpf)) return res.status(406).send('cpf not valid')

  db.collection('user').find({ cpf }).toArray((err, result) => {
    if (err) {
      console.log('err find cpf', err)
      return res.status(500)
    }
    console.log('find cpf', JSON.stringify(result))

    if (result.length) {
      res.status(403).send('user already registered')

    } else {
      db.collection('user').insertOne(data, (err, result) => {
        if (err) {
          console.log('err post user', err)
          return res.status(500)
        }
        console.log('user added succesfully', result.ops)
        res.send('user added succesfully')
      })
    }

  })
})

app.get('/user', (req, res) => {
  db.collection('user').find({}).toArray((err, result) => {
    if (err) {
      console.log('err get users', err)
      return res.status(500)
    }
    console.log('user', JSON.stringify(result))
    res.send(result)
  })
})

app.get('/user/:id', (req, res) => {
  const id = req.params.id
  const query = { '_id': ObjectID(id) }

  db.collection('user').find(query).toArray((err, result) => {
    if (err) {
      console.log('err find user by id', err)
      return res.status(500)
    }
    console.log('user', JSON.stringify(result))
    res.send(result)
  })
})

app.put('/user/:id', (req, res) => {
  const data = req.body
  const cpf = data.cpf && data.cpf.trim()
  if (!cpf) return res.status(402).send('cpf not found')
  if (!isCpf(cpf)) return res.status(400).send('cpf not valid')
  const id = ObjectID(req.params.id)

  db.collection('user').updateOne({ '_id': id }, { '$set': data }, (err, result) => {
    if (err) {
      console.log('err put user', err)
      return res.status(500)
    }
    console.log('user updated succesfully')
    res.send('user updated succesfully')
  })
})

app.delete('/user/:id', (req, res) => {
  const id = ObjectID(req.params.id)

  db.collection('user').deleteOne({ '_id': id }, (err, result) => {
    if (err) {
      console.log('err delete user', err)
      return res.status(500)
    }
    console.log('user deleted succesfully')
    res.send('user deleted succesfully')
  })
})
