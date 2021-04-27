// Jorge

const express = require('express')
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./config/passport")(passport);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));


var path = require('path');
const port = process.env.PORT || 5000;

// Jeff

app.use("/api/users", users);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//setup public folder
app.use(express.static('./public'));

app.get('/',function (req, res) {
    res.render('pages/home', {user: {}})
});

// Devon, Jorge

app.get('/login',function (req, res) {
  res.render('pages/login', {user: {}})
});

app.get('/highscores',function (req, res) {
  res.render('pages/highscores', {user: {}})
});

// Jeff, Mike

app.get('/signup',function (req, res) {
  res.render('pages/signup',{user: {}})
});

app.get('/game',function (req, res) {
  res.render('pages/game',{user: {}})
});

// Group

app.get('/logout', function (req, res)
{ req.logout();
  res.render('pages/home');
});

app.get('/save', function (req, res)
{
  res.render('pages/highScores');
});

app.listen(port, () => console.log(`app Started on port ${port}!`));