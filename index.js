const express = require('express')
const models = require('./models')

let app = express()

app.get('/rebels', (request, response) => {
  models.Rebels.findAll().then((rebels) => {
    response.send(rebels)
  })
})

app.get('/rebels/:identifier',(request, response) => {
  if (typeof request.params.identifier === 'number') {
    models.Rebels.findAll({ where: { id: request.params.identifier }, }).then((rebel) => {
      response.send(rebel)
    })
  } else {
    models.Rebels.findAll({ where: { callSign: request.params.identifier }, }).then((rebel) => {
      response.send(rebel)
    })
  }
})

app.post('/rebels', (request, response) => {
  const { name, callSign, rank } = request.body

  if (!name || !callSign || !rank) {
    response.status(400).send('The following attributes are required: name, callSign, rank')
  }else
  models.Rebels.create({ name, callSign, rank }).then((newRebel) => {
    response.status(201).send(newRebel)
  
  })
})

const port = process.env.PORT ? process.env.PORT : 1337
app.listen(port, () => { console.log(`Listening on port ${port}`) })

module.exports = app
