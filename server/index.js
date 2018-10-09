const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({ extended: true }))

let db

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) return console.log(err)

  db = client.db('test')

  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})

app.get('/', (req, res) => {
  db.collection('form').find().toArray(function (err, result) {
    if (err) throw err
    res.send(JSON.stringify(result))
  })
})
