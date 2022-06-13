const express = require('express')
const cnf = require('./config')
var session = require('express-session');

const app = express()
var bodyParser = require('body-parser')
const server = require('http').Server(app)
const io = require('socket.io')(server)

const controllers = require("./controllers")(io, session);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', controllers.httpControllers.index)
app.post('/room', controllers.httpControllers.createRoom)
app.get('/:room', controllers.httpControllers.getRoom)


server.listen(cnf.APP.PORT)
io.on('connection', controllers.wsControllers.connection)