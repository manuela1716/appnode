const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const session = require('express-session')
const routeUser=require('./routes/user')
const database=require('./connexion/database')
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
}

app.use('',routeUser)

app.get('/', (req, res) => {
  res.render('pages/index',{nom:'wabo',prenom:'leon'})
})

app.get('*', (req, res) => {
  res.render('pages/error')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})