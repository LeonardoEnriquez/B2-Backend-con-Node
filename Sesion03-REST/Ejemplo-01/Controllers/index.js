const fs = require('fs')
const Model = require('../models/index')

let Users = []
// Especificar por que se utilizan:
//   * fs
//   * module.exports
//   * statusCode
//   * setHeader
//   * readFile
//   * writeHead

const renderIndex = (req, res) => {
  fs.readFile('./views/index.html', null, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.write('archivo no encontrado')
      res.end()
      return
    }

    res.writeHead(200, { 'Content-type': 'text/html' })
    res.write(data)
    res.end()
  })
}

const renderModel = (req, res) => {
  res.writeHead(200)
  res.write(JSON.stringify(Users.map(e => e)))
  res.end()
}

const postModel = (req, res) => {
  let newUser = new Model.User(req.headers.name, req.headers.description, req.headers.age)
  Users.push(newUser)
  // console.log(data)

  res.write(JSON.parse(newUser))
  res.end()
}
module.exports = {
  renderIndex,
  renderModel,
  postModel
}
