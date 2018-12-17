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
  app.listen(port, () => console.log(`Server listening on port ${port}!`))
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
app.post('/register', (req, res) => {
  const data = req.body
  const project = data.project
  const cpf = data.cpf && data.cpf.trim()
  if (!project) return res.status(402).send('project name not found')
  if (!cpf) return res.status(402).send('cpf not found')
  if (!isCpf(cpf)) return res.status(406).send('cpf not valid')

  db.collection(project).find({ cpf }).toArray((err, result) => {
    if (err) {
      console.log('err find cpf', err)
      return res.status(500)
    }
    console.log('find cpf', JSON.stringify(result))

    if (result.length) {
      res.status(403).send('register already registered')

    } else {
      db.collection(project).insertOne(data, (err, result) => {
        if (err) {
          console.log('err post register', err)
          return res.status(500)
        }
        console.log('register added succesfully', result.ops)
        res.send('register added succesfully')
      })
    }

  })
})
